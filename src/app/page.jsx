import Image from "next/image";
import Button from "@/components/utilities/button/Button";
import "./LandingPage.css";
export default function Home() {
  return (
  <div className="landingContainer">
    <div className="landingTitles">
      <h1 className="landingHeading">
        We make buying second hand devices easier!
      </h1>
      <p className="landingSubHeading">
      <span>
        Bought a new phone? Sell your old one.
      </span>
      <span>
      <br/>Looking for a “new” phone? Buy one second hand.
      </span>
      <span>
        <br/>It’ll do your wallet and our planet a favor.
      </span>
      </p>
    </div>

    <div className="landingImage">
      <Image
        src="/LandingImage.svg"
        alt="swwwap photo"
        width={700}
        height={700}
        className="landingLogo"
       />
    </div>
    
    {/* <div className="landingButtons">
        {/* <Button variant="outlined" text="Log in" />
        <Button variant="contained" text="Sign up" /> 
    </div> */}
  </div>
);
}
