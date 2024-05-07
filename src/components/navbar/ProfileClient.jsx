"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div
        style={{
          position: "relative", // Change position to relative
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "50px",
            height: "50px",
            marginRight: "10px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src={user.picture}
            alt={user.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
    )
  );
}
