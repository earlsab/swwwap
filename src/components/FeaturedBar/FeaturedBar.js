import React from "react";
import Item from "../item/Item";
import HeaderBar from "../utilities/header/HeaderBar";
import MockData from "@/utils/mockData/MockData";

import "./FeaturedBar.css";

const FeaturedBar = () => {
    return (
        <div className="container">
            <HeaderBar/>
            <div className="itemsContainer">
            
                {MockData.map(item => (
                    <Item
                    key={item.id}
                    imageUrl={item.imageUrl}
                    ownerName={item.ownerName}
                    title={item.title}
                    price={item.price}
                    priceDetail={item.priceDetail}
                    quality={item.quality}
                    content={item.content}
                    />
                ))}
            
            </div>
            
        </div>
    );
};

export default FeaturedBar;