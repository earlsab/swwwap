import Image from "next/image";

export default function ProfileClient({ user, error, isLoading }) {
  let component = (
    <button
      className="btl"
      onClick={() => (window.location.href = "/api/auth/login")}
    >
      Login
    </button>
  );
  if (user)
    component = (
      <>
        <div
          style={{
            position: "relative",
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
            <button
              className="btl"
              onClick={() => (window.location.href = "/api/auth/logout")}
            >
              Logout
            </button>
          </div>
        </div>
      </>
    );
  return component;
}
