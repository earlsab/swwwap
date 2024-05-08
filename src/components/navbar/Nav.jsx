"use client";
import Link from "next/link";
import ProfileClient from "./ProfileClient";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Nav() {
  const { user, error, isLoading } = useUser();
  let links = [
    { link: "about", text: "About" },
    { link: "learn", text: "Learn More" },
  ];

  if (user) {
    links = [
      { link: "about", text: "About" },
      { link: "listings", text: "Listings" },
      { link: "dashboard", text: "Dashboard" },
    ];
  }

  return (
    <div>
      <nav className="flex justify-between p-5">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/swwwap.svg"
              alt="swwwap logo"
              width={100}
              height={50}
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.link}
              href={link.link}
              className="text-default-text"
            >
              <span className="bg-white rounded-full text-black p-2">
                <span style={{ whiteSpace: "nowrap" }}>{link.text}</span>
              </span>
            </Link>
          ))}
          <ProfileClient user={user} error={error} isLoading={isLoading} />
          <p className="text-default-text"></p>
        </div>
      </nav>
    </div>
  );
}
