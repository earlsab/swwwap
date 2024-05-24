"use client";
import ItemForm from "@/components/ItemForm/ItemForm";
import toastSettings from "@/components/toastySettings";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ToastContainer, toast } from "react-toastify";
import useSWR from "swr";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

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
    // console.log(data);
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
        <ItemForm data={data} isEditing={true} toast={handleToast} />
        {/* <ToastContainer></ToastContainer> */}
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
