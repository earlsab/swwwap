import { useState } from "react";
import Image from "next/image";

export default function ProfileClient({ user, error, isLoading }) {
  const [showDetails, setShowDetails] = useState(false);

  let component = (
    <button
      className="btl"
      onClick={() => (window.location.href = "/api/auth/login")}
    >
      Login
    </button>
  );

  if (user) {
    component = (
      <div style={{ position: "relative" }}>
        <button
          className="btl"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setShowDetails(!showDetails)}
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
        </button>
        {showDetails && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0, // Set right to 0 to prevent overflow to the right side
              background: "white",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)", // Increased shadow value
              borderRadius: "4px",
              padding: "10px",
              zIndex: 9999,
            }}
          >
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button
              className="btl"
              onClick={() => (window.location.href = "/api/auth/logout")}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return component;
}
