import React from "react";
import SmallItem from "../SmallItem/SmallItem";
import HeaderBar from "../utilities/header/HeaderBar";
import useSWR from "swr";
import Link from "next/link";
import "./NewListBar.css";

const fetcher = async (uri) => {
    const response = await fetch(uri);
    return response.json();
  };

const NewListBar = () => {
    const { data, error } = useSWR("/api/protected/data/fetchList", fetcher);
    if (error) return <div>oops... {error.message}</div>;
    if (data === undefined) return <div>Loading...</div>;
  return (
    <div className="container3">
      <HeaderBar texts={"Newly Listed"} imageSrc={'fire'}/>
      <div className="itemsContainer">
        {data.protected.map((item) => (
          <Link key={item._id} href={`listings/${item._id}`}>
            <SmallItem
              key={item.id}
              ownerName={item.owner}
              title={item.title}
              price={item.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );

    
};

export default NewListBar;