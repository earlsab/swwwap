import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./ItemForm.css";
import Button from "../utilities/button/Button";

function ItemForm({
  toast = null,
  data = null,
  setIsEditing = null,
  isEditing = null,
}) {
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  // if (data != null) {
  //   setTitle(data.protected.title);
  //   setDescription(data.protected.description);
  //   setPrice(data.protected.price);
  // }

  const handleSubmit = async (e) => {
    // console.log("Form submitted:", { title, description, price });
    e.preventDefault();

    // ADD MODE
    if (!isEditing) {
      try {
        const response = await axios.post("/api/protected/data/addItem", {
          title,
          description,
          price,
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
          price,
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
      setPrice(data.protected.price);
      setId(data.protected._id);
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
          <label>
            Title:
            <br/>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <br/>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          <label>
            Price:
            <br/>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <br />
          <br />
          <Button variant="longContained" onClick={handleSubmit} text="List for Sale" />
        </form>
        
      </div>
      <div className="ImagecatalgueforItemForm">

      </div>
    </div>
    </div>
  );
}

export default ItemForm;
