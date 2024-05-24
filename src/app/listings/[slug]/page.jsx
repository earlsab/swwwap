"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

import useSWR from "swr";
import ItemForm from "@/components/ItemForm/ItemForm"; // Import the ItemForm component
import { useState } from "react";
import axios from "axios";
import "./itemSlug.css";
import { CldImage } from "next-cloudinary";
import Button from "@/components/utilities/button/Button";
import FilterBar from "@/components/FilterComponent/FilterBar";

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

    if (error) return (<div>oops... {error.message} {data}</div>);
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
      <div className="containerForEachItem">
        <div className="headerForEachItem">
        
        <div className="headerTitlesForEachItem">
          <p className="ownerForEachItem">{data.protected.owner}</p>
          <p className="titleForEachItem">{data.protected.title}</p>
          <p className="priceForEachItem">PHP {data.protected.price}</p>
          <div className="headerButtonHolderForEachItem">
            <Button variant="longContained" 
            onClick={() => {
              const subject = `Inquiry about ${data.protected.title}`;
              const body = `Hello,\n\nI am interested in your listing for ${data.protected.title} priced at PHP ${data.protected.price}. Please provide more details.\n\nThank you.`;
              window.location.href = `mailto:${data.protected.owner}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }} 
            text="Contact Seller" />
          </div>
        </div>

        <div className="imageContainerForEachItem">
          <CldImage
            src={data.protected.imageUrl}
            alt={data.protected.title}
            width={500}
            height={500}
          />
        </div>
        </div>

        <div className="detailsContainerForEachItem">
          <h1>Basic Details</h1>
          <p><span>Brand:</span> {data.protected.brand}</p>
          <p><span>Device Description: <br/></span>{data.protected.description}</p>
          <br/>
          <h1>Condition</h1>
          <p><span>Years of Ownership: </span>{data.protected.yearsOfOwnership}</p>
          <br/>
          <h1>Other Details</h1>
          <p><span>Reason for Selling: </span>{data.protected.rfs}</p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
        
        

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
        <div className="Recommendation">
        <span className="reccomendationText">Recommended items based on price: </span>
          <div className="FilterViewerForEachItem">
          
          <FilterBar sortBy='filterByPrice' spec={data.protected.price} />
          </div>
        </div>
        
        <div className="Recommendation">
        <span className="reccomendationText">Recommended items based on brand: </span>
          <div className="brandFilterViewerForEachItem">
          <FilterBar sortBy='filterByBrand' spec={data.protected.brand} />
          </div>
        </div>

        
      </div>
        
      </>
    );
  },
  {
    returnTo({ params }) {
      return `/listings/${params.slug}`; // Fix the returnTo function to return the correct URL
    },
  }
);
