import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import { useState } from "react";
import LoginButtonNav from "../pages/landing/components/LoginButtonNav";
import RegisterButtonNav from "../pages/landing/components/RegisterButtonNav";
import SignOutButton from "./SignOutButton";
import { auth } from "../../App";

import { Spin as Hamburger } from "hamburger-react";
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
      className={`fixed h-20 w-full  shadow-md flex flex-row justify-between md:gap-0 items-center px-2 sm:px-10 md:px-10 lg:px-14 xl:px-16 z-40 bg-white ${
        onTop ? "md:bg-transparent" : ""
      }`}
    >
      <div className="flex flex-row justify-start gap-4">
        <div className="md:hidden h-fit w-fit ml-2">
          <Hamburger
            size={30}
            toggled={showMobileNav}
            toggle={setShowMobileNav}
          />
        </div>

        <div className="flex flex-row items-center">
          <h1 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-black transition-all hover:scale-110">
            <Link to="/">LostSeeker</Link>
          </h1>
        </div>
      </div>

      <div className="flex flex-row items-center gap-3 sm:gap-6 lg:gap-8 ">
        <div className="md:flex hidden flex-row items-center gap-4 md:text-base xl:text-lg font-medium ">
          {links.map((link) => (
            <Link
              className="transition-transform hover:scale-95"
              key={`/${link.replace(/\s/g, "").toLowerCase()}`}
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

      <div
        className={`fixed md:hidden z-10 left-0 w-44 h-full bg-white flex flex-col top-16 px-4 pt-4 gap-2 ${
          showMobileNav ? "fade-in-nav" : "fade-out-nav"
        } `}
      >
        {links.map((link) => (
          <Link
            className="transition-transform hover:scale-95 text-lg"
            key={`/${link.replace(/\s/g, "").toLowerCase()}`}
            to={`/${link.replace(/\s/g, "").toLowerCase()}`}
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
