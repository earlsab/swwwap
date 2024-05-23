"use client";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

export default withPageAuthRequired(
  function EditItem({ params }) {
    const { data, error } = useSWR(
      `/api/protected/data/fetchItem?id=${params.slug}`,
      fetcher
    );
    const { user, errorUser, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (errorUser) return <div>{error.message}</div>;
    if (error)
      return (
        <div>
          oops... {error.message} {data}
        </div>
      );
    if (data === undefined) return <div>Loading...</div>;
    let EDITSTATE = "CANNOT EDIT";
    // console.log("LOOK HERE!");
    // console.log(data.protected.owner);
    // console.log(user.email);
    if (data.protected.owner == user.email) {
      EDITSTATE = "CAN EDIT!";
    }
    return (
      <>
        {/* {Object.entries(user).map(([key, value]) => (
          <div key={key}>
            {key}:{value}
          </div>
        ))} */}
        {EDITSTATE}
      </>
    );
  },
  {
    // FIXME: allow to return properly
    returnTo({ params }) {
      `return /listings/edit/${params.slug}`;
    },
  }
);
