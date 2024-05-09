"use client";
import { users } from "@/lib/data";
import SellItemForm from "./add/page";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Listing() {
  const [data, setData] = useState();
  async function fetchData() {
    const response = await axios.get("/api/data/item", {});
    // const data = await response.json();
    console.log(response);
    setData(response.data);
    console.log(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SellItemForm />
      <pre>{data}</pre>
    </div>
  );
}
