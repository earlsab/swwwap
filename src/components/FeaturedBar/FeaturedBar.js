import React from "react";
import Item from "../item/Item";
import HeaderBar from "../utilities/header/HeaderBar";
import useSWR from "swr";
import Link from "next/link";
import "./FeaturedBar.css";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

const FeaturedBar = () => {
  const { data, error } = useSWR(
    "/api/protected/data/fetchList?sortBy=createdDesc",
    fetcher
  );
  //   const { data, error } = useSWR(
  //     "/api/protected/data/fetchList?filterByPrice=500",
  //     fetcher
  //   );
  //   const { data, error } = useSWR(
  //     "/api/protected/data/fetchList?filterByBrand=Apple",
  //     fetcher
  //   );
  if (error) return <div>oops... {error.message}</div>;
  if (data === undefined) return <div>Loading...</div>;

  return (
    <div className="container3">
      <HeaderBar />
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
  );
};

export default FeaturedBar;
