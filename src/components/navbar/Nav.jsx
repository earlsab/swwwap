"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProfileClient from "./ProfileClient";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Nav() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <nav className="flex justify-between p-5">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image src="/swwwap.svg" alt="swwwap logo" width={100} height={50} />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ProfileClient user={user} error={error} isLoading={isLoading} />

        <p className="text-default-text"></p>
      </div>
    </nav>
  );
}

// TODO: Make buttons cleaner
// TODO: Make buttons show on condition
