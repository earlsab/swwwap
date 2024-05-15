"use client";
import SellItemForm from "@/components/SellItemForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastSettings from "@/components/toastySettings";
const handleSubmit = async ({ title, description, price }) => {
  console.log("Form submitted:", { title, description, price });

  try {
    const response = await axios.post("/api/protected/data/addItem", {
      title,
      description,
      price,
    });
    console.log(response);
    toast.success("Item added successfully!", toastSettings);
  } catch (error) {
    toast.error("Item added successfully!", toastSettings);
    console.error("Error:", error);
    toast.error("An error occurred. Please try again later.");
  }
};
export default withPageAuthRequired(function AddPage() {
  return (
    <div>
      <SellItemForm handleSubmit={handleSubmit} />
      <ToastContainer />
    </div>
  );
});
