"use client";
import { users } from "@/lib/data";
import SellItemForm from "./add/page";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Item from "@/components/item/Item";
import FeaturedBar from "@/components/FeaturedBar/FeaturedBar";
import "./listings.css";
import SellItemBar from "@/components/SellItemBar/SellItemBar";
import NewListBar from "@/components/NewListBar/NewListBar";
// DONE: Secure page behind auth

// app/products/page.jsx
// ("use client");
// import useSWR from "swr";

// const fetcher = async (uri) => {
//   const response = await fetch(uri);
//   return response.json();
// };

// export default withPageAuthRequired(function Products() {
//   const { data, error } = useSWR("/api/protected", fetcher);
//   if (error) return <div>oops... {error.message}</div>;
//   if (data === undefined) return <div>Loading...</div>;
//   return <div>{data.protected}</div>;
// });

// https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#protect-an-api-route
const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

// https://auth0.github.io/nextjs-auth0/types/helpers_with_page_auth_required.WithPageAuthRequiredAppRouter.html
export default withPageAuthRequired(
  function Listing() {
    const { data, error } = useSWR("/api/protected/data/fetchList", fetcher);
    if (error) return <div>oops... {error.message}</div>;
    if (data === undefined) return <div>Loading...</div>;

    return (
      <>
        <SellItemBar />
        <br />
        <br />
        <br />
        <br />
        <div className="container2">
          <FeaturedBar />
          <br />
          <br />
          <br />
          <br />
          <NewListBar />
        </div>
      </>
    );
    // const [data, setData] = useState();
    // async function fetchData() {
    //   const response = await axios.get("/api/data/item/fetchItems", {});
    //   // const data = await response.json();
    //   setData(response.data);
    //   console.log(response);
    // }

    // useEffect(() => {
    //   fetchData();
    // }, []);
  },
  { returnTo: "/listings" } // TODO: Double check if it works
);
