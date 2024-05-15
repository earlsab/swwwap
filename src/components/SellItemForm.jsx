import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SellItemForm({ toast }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log("Form submitted:", { title, description, price });
    e.preventDefault();
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
      }, 5000);
    } catch (error) {
      toast({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
      console.error("Error:", error);
      // toast.error("An error occurred. Please try again later.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Sell Item</button>
    </form>
  );
}

export default SellItemForm;
