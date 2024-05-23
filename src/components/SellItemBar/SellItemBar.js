import React from "react";
import "./SellItemBar.css";
import Image from "next/image";
import HeaderPhoto from "@/utils/images/HeaderPhoto.png";
import Button from "../utilities/button/Button";
import { useRouter } from 'next/navigation';

const SellItemBar = () => {
    const router = useRouter();
    const handleClickforSell = () => {
        router.push('/listings/add');
    };
    return (
        <div className="container">
            <div className="textsSellItemBar">
                <h1>Earn Money From Old Devices.</h1>
            </div>
            <div className="photo">
                {/* <Image
                src={HeaderPhoto}
                alt="swwwap logo"
                width={100}
                height={50}
                /> */}
            </div>
            <div className="ButtonHolderSellItemBar">
            <Button variant="longContained" onClick={handleClickforSell} text="Sell an Item." />
            </div>
        </div>
        
    );

};

export default SellItemBar;