"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import ItemForm from "@/components/ItemForm/ItemForm"; // Import the ItemForm component
import { useEffect, useState } from "react";
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
    const [sellingState, setSellingState] = useState(); // Add state for editing

    const router = useRouter();

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
      router.push(`/listings/edit/${params.slug}`); // Redirect to the listings page after deleting the item
      // if (!isEditing) setIsEditing(true); // Set isEditing to true when edit button is clicked
    }

    async function handleDelete() {
      await axios.delete(`/api/protected/data/deleteItem?id=${params.slug}`);
      router.push("/listings"); // Redirect to the listings page after deleting the item
    }

    async function handleToggleStatus() {
      await axios.put(`/api/protected/data/toggleSold?id=${params.slug}`);
      console.log(sellingState);

      if (
        data.protected.itemSellingStatus == 1 ||
        sellingState == null ||
        sellingState == 1
      ) {
        setSellingState(0);
      } else {
        setSellingState(1);
      }
    }

    let sellToggleTerm;
    if (sellingState == 0) {
      sellToggleTerm = "Selling";
    } else if (sellingState == 1) {
      sellToggleTerm = "Sold";
    } else {
      setSellingState(data.protected.itemSellingStatus);
    }

    return (
      <>
        <div className="containerForEachItem">
          <Button
            variant="outlined"
            onClick={() => router.back()}
            text="Back"
          />
          <div className="headerForEachItem">
            <div className="headerTitlesForEachItem">
              <p className="ownerForEachItem">{data.protected.owner}</p>
              <p className="titleForEachItem">{data.protected.title}</p>
              { data.protected.priceDetail === "Market Price" ? 
                  (<p className="priceForEachItem">PHP {data.protected.price}</p>)
                : 
                (
                  (<p className="priceForEachItemBad">PHP {data.protected.price}</p>)
                )
              }
              
              <div className="headerButtonHolderForEachItem">
                {data.protected && data.isEditable ? (
                  <>
                    <Button
                      onClick={handleToggleStatus}
                      variant="longCongtainedBlue"
                      text={`Mark as ${sellToggleTerm}`}
                    />
                  </>
                ) : (
                  <Button
                    variant="longContained"
                    onClick={() => {
                      const subject = `Inquiry about ${data.protected.title}`;
                      const body = `Hello,\n\nI am interested in your listing for ${data.protected.title} priced at PHP ${data.protected.price}. Please provide more details.\n\nThank you.`;
                      window.location.href = `mailto:${
                        data.protected.owner
                      }?subject=${encodeURIComponent(
                        subject
                      )}&body=${encodeURIComponent(body)}`;
                    }}
                    text="Contact Seller"
                  />
                )}
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
            <p>
              <span>Brand:</span> {data.protected.brand}
            </p>
            <br />
            <p>
              <span>
                Device Description: <br />
              </span>
              {data.protected.description}
            </p>
            <br />
            <h1>Condition</h1>
            <p>
              <span>Years of Ownership: </span>
              {data.protected.yearsOfOwnership}
            </p>
            <br />
            <h1>Other Details</h1>
            <p>
              <span>Reason for Selling: </span>
              {data.protected.rfs}
            </p>
            <br />
            <br />
            <br />
          </div>

          {data.protected && data.isEditable && (
            <>
              <div className="editAndDeleteButtonsForEachItem">
                <Button
                  variant="containedYellow"
                  onClick={handleEdit}
                  text="Edit Item"
                />
                <Button
                  variant="containedRed"
                  onClick={handleDelete}
                  text="Delete"
                />
              </div>
            </>
          )}
          {/* {isEditing && (
            <ItemForm
              data={data}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          )} */}

          <div className="Recommendation">
            <br />
            <br />
            <br />
            <br />
            <br />
            <span className="reccomendationText">
              Recommended items based on price:{" "}
            </span>
            <div className="FilterViewerForEachItem">
              <FilterBar
                sortBy="filterByPrice"
                spec={data.protected.price}
                selfId={data.protected._id}
              />
            </div>
          </div>

          <div className="Recommendation">
            <span className="reccomendationText">
              Recommended items based on brand:{" "}
            </span>
            <div className="brandFilterViewerForEachItem">
              <FilterBar
                sortBy="filterByBrand"
                spec={data.protected.brand}
                selfId={data.protected._id}
              />
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
