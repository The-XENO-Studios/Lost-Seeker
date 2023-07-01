import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import { FC, useEffect, useState } from "react";
import LoginButtonNav from "../pages/landing/components/LoginButtonNav";
import RegisterButtonNav from "../pages/landing/components/RegisterButtonNav";
import SignOutButton from "./SignOutButton";
import { auth } from "../../App";
import { FaGripLines, FaGripLinesVertical } from "react-icons/fa";
function NavBar({
  links,
  onTop,
}: {
  onTop: boolean | undefined;
  links: string[];
}) {
  const [showMobileNav, setShowMobileNav] = useState(false);
  function SignOut() {
    signOut(auth);
  }

  return (
    <div
      className={`fixed h-20 w-full  shadow-md flex flex-row justify-between   md:gap-0 items-center px-2 sm:px-10 md:px-10 lg:px-14 xl:px-16 z-20 bg-white ${
        onTop ? "md:bg-transparent" : ""
      }`}
    >
      <div className="flex flex-row justify-start gap-4">
        {!showMobileNav ? (
          <FaGripLines
            className="md:hidden ml-2"
            size={25}
            onClick={() => setShowMobileNav((_prev) => !_prev)}
          />
        ) : (
          <FaGripLinesVertical
            className="md:hidden ml-2"
            size={25}
            onClick={() => setShowMobileNav((_prev) => !_prev)}
          />
        )}
        <div className="flex flex-row items-center">
          <h1 className="font-extrabold text-xl  md:text-2xl lg:text-3xl text-black">
            <Link to="/">LostSeeker</Link>
          </h1>
        </div>
      </div>

      <div className="flex flex-row items-center gap-3 sm:gap-6 lg:gap-8 ">
        <div className="md:flex hidden flex-row items-center gap-4 md:text-base xl:text-lg font-medium ">
          {links.map((link) => (
            <Link
              className="transition-transform hover:scale-95"
              to={`/${link.replace(/\s/g, "").toLowerCase()}`}
            >
              {link}
            </Link>
          ))}
        </div>

        {auth.currentUser ? (
          <SignOutButton signOut={SignOut} />
        ) : (
          <div className="flex flex-row items-center gap-1 md:gap-3 lg:gap-4">
            <LoginButtonNav />
            <RegisterButtonNav />
          </div>
        )}
      </div>

      {showMobileNav && (
        <div className="fixed md:hidden z-10 left-0 w-44 h-full bg-white flex flex-col top-16 px-4 pt-4 gap-2">
          {links.map((link) => (
            <Link
              className="transition-transform hover:scale-95 text-lg"
              to={`/${link.replace(/\s/g, "").toLowerCase()}`}
            >
              {link}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavBar;
