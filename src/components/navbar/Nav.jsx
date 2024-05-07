import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProfileClient from "./ProfileClient";
export default function Nav() {
  const isProfileRendered = true; // Replace with your logic to determine if profile is rendered

  return (
    <nav className="flex justify-between bg-nav p-4 text-default-text">
      <div className="flex items-center space-x-4">
        <Link href="/">
          {/* <FontAwesomeIcon icon={}/> */}
          Swwwap
        </Link>
      </div>
      <div>
        {isProfileRendered && <ProfileClient />}
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>

        <p className="text-default-text"></p>
      </div>
    </nav>
  );
}
