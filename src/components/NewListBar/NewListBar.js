import React from "react";
import Item from "../item/Item";
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

    <div className="container3">
      <HeaderBar texts={"Newly Listed"} imageSrc={'fire'}/>
      <div className="itemsContainer">
        {data.protected.map((item) => (
          <Link key={item._id} href={`listings/${item._id}`}>
            <Item
              key={item.id}
              imageUrl={item.imageUrl}
              ownerName={item.owner}
              title={item.title}
              price={item.price}
              priceDetail={item.priceStatus}
              quality={item.quality}
              content={item.description}
            />
          </Link>
        ))}
      </div>
    </div>
};

export default NewListBar;