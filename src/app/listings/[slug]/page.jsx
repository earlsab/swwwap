"use client";
// export default function List({ id, item }) {
//   if (!item) return <div>List</div>;
// }
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

// https://auth0.github.io/nextjs-auth0/types/helpers_with_page_auth_required.WithPageAuthRequiredAppRouter.html
export default withPageAuthRequired(
  function Item({ params }) {
    // console.log({ params });
    const { data, error } = useSWR(
      `/api/protected/data/list/fetchItem?id=${params.slug}`,
      fetcher
    );
    if (error)
      return (
        <div>
          oops... {error.message} {data}
        </div>
      );
    if (data === undefined) return <div>Loading...</div>;
    console.log("DATA:", data);

    return (
      <>
        <Link href={`/listings/edit/${params.slug}`}>edit</Link>
        {/* <button onClick=>Edit</button> */}
        {Object.entries(data.protected).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
      </>
    );
  },
  {
    // FIXME: allow to return properly
    returnTo({ params }) {
      `return /listings/${params.slug}`;
    },
  }
);
