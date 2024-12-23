import Nav from "@/components/navbar/Nav.jsx";
import Footer from "@/components/footer/Footer.jsx";

import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });
config.autoAddCss = false;

export const metadata = {
  title: "SWWWAP",
  description: "e-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <div className="flex flex-col h-screen max-h-screen">
            <Nav />
            <div className="flex-grow overflow-y-auto bg-page text-default-text">
              {children}
            </div>
          </div>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
