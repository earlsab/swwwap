"use client";
import SellItemForm from "@/components/SellItemForm";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastSettings from "@/components/toastySettings";

function handleToast({ type, message }) {
  switch (type) {
    case "success":
      toast.success(message, toastSettings);
      break;
    case "error":
      toast.error(message, toastSettings);
      break;
    default:
      toast(message, toastSettings);
  }
}

export default withPageAuthRequired(function AddPage() {
  return (
    <div>
      <SellItemForm toast={handleToast} />
      <ToastContainer />
    </div>
  );
});
