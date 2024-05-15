"use client";
import { users } from "@/lib/data";
import SellItemForm from "./add/page";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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
        <Link href="/listings/add">Add</Link>
        {data.protected.map((item) => (
          // <pre key={item._id}>{item.title}</pre>
          <Link key={item._id} href={`listings/${item._id}`}>
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px",
                margin: "5px",
              }}
            >
              {item.title}
            </button>
          </Link>
        ))}
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
