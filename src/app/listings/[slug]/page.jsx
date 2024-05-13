"use client";
// export default function List({ id, item }) {
//   if (!item) return <div>List</div>;
// }
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

// https://auth0.github.io/nextjs-auth0/types/helpers_with_page_auth_required.WithPageAuthRequiredAppRouter.html
export default withPageAuthRequired(
  function List({ params }) {
    const { data, error } = useSWR(
      `/api/protected/data/list/fetchItem?id=${params.slug}`,
      fetcher
    );
    if (error) return <div>oops... {error.message} </div>;
    if (data === undefined) return <div>Loading...</div>;
    console.log("DATA:", data);
    return (
      <>
        {Object.entries(data.protected).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
      </>
    );
  },
  {
    returnTo({ params }) {
      return `/listings/${params.slug}`;
    },
  }
);
