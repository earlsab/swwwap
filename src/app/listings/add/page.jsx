"use client";
// Copilot Code
import axios from "axios";
import React, { useState } from "react";

function SellItemForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic here to handle form submission
    // For example, you can send the form data to an API or update the state
    console.log("Form submitted:", { title, description, price });

    try {
      const response = await axios.post("/api/protected/data/list/addItem", {
        title,
        description,
        price,
      });
      console.log(response);
    } catch (error) {
      console.log(response);
      console.error("Error:", error);
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
