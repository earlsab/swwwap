<<<<<<< Updated upstream
export default function Listing() {
  return <div>Listing</div>;
=======
"use client";
import { users } from "@/lib/data";
import Item from "@/components/item/Item";
import FeaturedBar from "@/components/FeaturedBar/FeaturedBar"
import "./listings.css";

export default function Listing() {
  console.log(users);
  return (
  <div className="container">
    Listing
    <FeaturedBar/>
  </div>
  );
>>>>>>> Stashed changes
}
