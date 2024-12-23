import "./FilterBar.css";
import useSWR from "swr";
import Link from "next/link";
import React from "react";
import Item from "../item/Item";

const fetcher = async (uri) => {
  const response = await fetch(uri);
  return response.json();
};

const FilterBar = ({ sortBy, spec, selfId }) => {
  const { data, error } = useSWR(
    `/api/protected/data/fetchList?${sortBy}=${spec}${
      selfId ? `&filterOutSelf=${selfId}` : ""
    }`,
    fetcher
  );
  if (error) return <div>oops... {error.message}</div>;
  if (data === undefined) return <div>Loading...</div>;
  return (
    <div className="containerForFilter">
      <div className="itemsContainerForFilter">
        {data.protected.map((item) => (
          <Link key={item._id} href={`/listings/${item._id}`}>
            <Item
              key={item.id}
              imageUrl={item.imageUrl}
              ownerName={item.owner}
              title={item.title}
              price={item.price}
              priceDetail={item.priceStatus}
              quality={item.rfs}
              content={item.description}
              sellingStatus={item.itemSellingStatus}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
