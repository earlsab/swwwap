"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

import useSWR from "swr";
import ItemForm from "@/components/ItemForm/ItemForm"; // Import the ItemForm component
import { useState } from "react";
import axios from "axios";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

export default withPageAuthRequired(
  function Item({ params }) {
    const [isEditing, setIsEditing] = useState(false); // Add state for editing

    const { data, error } = useSWR(
      `/api/protected/data/fetchItem?id=${params.slug}`,
      fetcher
    );
    if (error)
      return (
        <div>
          oops... {error.message} {data}
        </div>
      );
    if (data === undefined) return <div>Loading...</div>;

    function handleEdit() {
      if (!isEditing) setIsEditing(true); // Set isEditing to true when edit button is clicked
    }

    async function handleDelete() {
      await axios.delete(`/api/protected/data/deleteItem?id=${params.slug}`);
      router.push("/listings"); // Redirect to the listings page after deleting the item
    }

    return (
      <>
        {Object.entries(data.protected).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
        {data.protected && data.isEditable && (
          <>
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
        {isEditing && (
          <ItemForm
            data={data}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
          />
        )}
      </>
    );
  },
  {
    returnTo({ params }) {
      return `/listings/${params.slug}`; // Fix the returnTo function to return the correct URL
    },
  }
);
