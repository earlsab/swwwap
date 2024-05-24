import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./ItemForm.css";
import Button from "../utilities/button/Button";
import { CldUploadButton } from "next-cloudinary";

function ItemForm({
  toast = null,
  data = null,
  setIsEditing = null,
  isEditing = null,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState(""); // Add brand state
  const [yearsOfOwnership, setYearsOfOwnership] = useState(0); // Add yearsOfOwnership state
  const [rfs, setRfs] = useState(""); // Add rfs state
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [itemStatus, setItemStatus] = useState(""); // Add status state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ADD MODE
    if (!isEditing) {
      try {
        const response = await axios.post("/api/protected/data/addItem", {
          title,
          description,
          brand,
          yearsOfOwnership,
          rfs,
          price,
          imageUrl,
          itemStatus: itemStatus,
        });
        console.log(response);
        const itemId = response.data.protected._id;
        toast({
          type: "success",
          message:
            "Item added successfully! You will be redirected to the created page.",
        });
        setTimeout(() => {
          router.push(`/listings/${itemId}`);
        }, 1000);
      } catch (error) {
        toast({
          type: "error",
          message: "An error occurred. Please try again later.",
        });
        console.error("Error:", error);
      }
    } else {
      // EDIT MODE
      try {
        const response = await axios.put("/api/protected/data/editItem", {
          id,
          title,
          description,
          brand,
          yearsOfOwnership,
          rfs,
          price,
          imageUrl,
          itemStatus,
        });
        setIsEditing(false);
        toast({
          type: "success",
          message:
            "Item added successfully! You will be redirected to the created page.",
        });
        setTimeout(() => {
          router.push(`/listings/${itemId}`);
        }, 1000);
      } catch {
        toast({
          type: "error",
          message: "An error occurred. Please try again later.",
        });
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (data != null) {
      console.log(data.protected);
      setTitle(data.protected.title);
      setDescription(data.protected.description);
      setBrand(data.protected.brand);
      setYearsOfOwnership(data.protected.yearsOfOwnership);
      setRfs(data.protected.rfs);
      setPrice(data.protected.price);
      setImageUrl(data.protected.imageUrl);
      setItemStatus(data.protected.status);
    }
  }, []);

  return (
    <div className="containerForItemForm">
      <div className="HeaderForItemForm">
        <h1>Selling your phone?</h1>
      </div>
      <div className="BodyForItemForm">
        <div className="FormsCatalogueForItemForm">
          <form onSubmit={handleSubmit}>
            <br />
            <label>
              Title:
              <br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Description:
              <br />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Brand:
              <br />
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </label>
            <br />
            <label>
              Years of Ownership:
              <br />
              <input
                type="number"
                value={yearsOfOwnership}
                onChange={(e) => setYearsOfOwnership(e.target.value)}
              />
            </label>
            <br />
            <label>
              RFS (Reason for Selling):
              <br />
              <input
                type="text"
                value={rfs}
                onChange={(e) => setRfs(e.target.value)}
              />
            </label>
            <br />
            <label>
              Price:
              <br />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <br />
            <CldUploadButton
              uploadPreset="gos2dtki"
              onSuccess={(results) => {
                setImageUrl(results.info.public_id);
                console.log("Public ID", results.info.public_id);
              }}
            />
            <br />
            <label>
              Status:
              <br />
              <input
                type="text"
                value={itemStatus}
                onChange={(e) => setItemStatus(e.target.value)}
              />
            </label>
            <br />
            <br />
            <Button
              variant="longContained"
              type="submit"
              text="List for Sale"
            />
          </form>
        </div>
        <div className="ImagecatalgueforItemForm"></div>
      </div>
    </div>
  );
}

export default ItemForm;
