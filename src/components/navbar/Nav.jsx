"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProfileClient from "./ProfileClient";
import Image from "next/image";
export default function Nav() {
  return (
    <nav className="flex justify-between p-5">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image src="/swwwap.svg" alt="swwwap logo" width={100} height={50} />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ProfileClient />

        <p className="text-default-text"></p>
      </div>
    </nav>
  );
}

// TODO: Make buttons cleaner
// TODO: Make buttons show on condition
