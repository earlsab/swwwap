import React from "react";
import "./SellItemBar.css";
import Image from "next/image";
import HeaderPhoto from "@/utils/images/HeaderPhoto.png";
import Button from "../utilities/button/Button";
import { useRouter } from "next/navigation";

const SellItemBar = () => {
  const router = useRouter();
  const handleClickforSell = () => {
    router.push("/listings/add");
  };
  return (
    <div className="container1234">
      <div className="textsSellItemBar">
        <h1>
          <br />
          Earn Money From Old Devices.
        </h1>
        <div className="ButtonHolderSellItemBar">
          <Button
            variant="longContained"
            onClick={handleClickforSell}
            text="Sell an Item."
          />
        </div>
      </div>

      <div className="photoForSellItemBar">
        <Image
          src="./headerIcon.svg"
          alt="swwwap logo"
          width={250}
          height={50}
        />
      </div>
    </div>
  );
};

export default SellItemBar;
