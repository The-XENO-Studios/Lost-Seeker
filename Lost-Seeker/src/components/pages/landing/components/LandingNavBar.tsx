import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../../App";
import { useEffect } from "react";

function LandingNavBar({ onTop }: { onTop: boolean }) {
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
          <Link
            className="hidden md:block transition-transform hover:scale-95"
            to="/list"
          >
            Items
          </Link>
          <Link
            className="hidden md:block transition-transform hover:scale-95"
            to="/about"
          >
            Contribute
          </Link>
          <Link className="transition-transform hover:scale-95" to="/samples">
            About
          </Link>
          <Link
            className="hidden sm:block transition-transform hover:scale-95"
            to="/pricing"
          >
            Q and A
          </Link>
        </div>
        {auth.currentUser ? (
          <div
            className="bg-black text-white rounded-full w-28 lg:w-32 hidden md:flex items-center justify-center py-1 md:py-2 text-lg font-bold transition-transform hover:scale-95"
            onClick={SignOut}
          >
            Sign Out
          </div>
        ) : (
          <div className="flex flex-row items-center gap-3 lg:gap-4">
            <Link
              className="bg-black text-white rounded-full w-28 lg:w-32 hidden md:flex items-center justify-center py-1 md:py-2 text-lg font-bold transition-transform hover:scale-95"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="bg-white text-text_primary border-2 border-text_primary rounded-full w-28 lg:w-32 flex items-center justify-center py-1 md:py-2 text-lg font-bold transition-transform hover:scale-95"
              to={"/register"}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingNavBar;
