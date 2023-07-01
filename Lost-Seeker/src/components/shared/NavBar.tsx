import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import { FC, useEffect } from "react";
import LoginButtonNav from "../pages/landing/components/LoginButtonNav";
import RegisterButtonNav from "../pages/landing/components/RegisterButtonNav";
import SignOutButton from "./SignOutButton";
import { auth } from "../../App";

function NavBar({
  links,
  onTop,
}: {
  onTop: boolean | undefined;
  links: string[];
}) {
  function SignOut() {
    signOut(auth);
  }

  return (
    <div
      className={`fixed h-20 w-full  shadow-md flex flex-row justify-between items-center px-4 sm:px-10 md:px-10 lg:px-14 xl:px-16 z-20 ${
        onTop ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="flex flex-row items-center">
        <h1 className="font-extrabold text-xl  md:text-2xl lg:text-3xl text-black">
          <Link to="/">LostSeeker</Link>
        </h1>
      </div>
      <div className="flex flex-row items-center gap-3 sm:gap-6 lg:gap-8">
        <div className="flex flex-row items-center gap-4 md:text-base xl:text-lg font-medium ">
          {links.map((link) => (
            <Link
              className="hidden md:block transition-transform hover:scale-95"
              to={`/${link.replace(/\s/g, "").toLowerCase()}`}
            >
              {link}
            </Link>
          ))}
        </div>
        {auth.currentUser ? (
          <SignOutButton signOut={SignOut} />
        ) : (
          <div className="flex flex-row items-center gap-3 lg:gap-4">
            <LoginButtonNav />
            <RegisterButtonNav />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
