import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function Nav() {
  return (
    <nav className="flex justify-between bg-nav p-4 text-default-text">
      <div className="flex items-center space-x-4">
        <Link href="/">
          {/* <FontAwesomeIcon icon={}/> */}
          Swwwap
        </Link>
      </div>
      <div>
        <Link href="/login">Login</Link>
        <p className="text-default-text"></p>
      </div>
    </nav>
  );
}
