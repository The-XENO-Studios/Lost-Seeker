import React from "react";
import { Link } from "react-router-dom";

export default function LoginButtonNav() {
  return (
    <Link
      className="bg-black text-white rounded-full w-28 lg:w-32 hidden md:flex items-center justify-center py-1 md:py-2 text-lg font-bold transition-transform hover:scale-95"
      to={"/login"}
    >
      Login
    </Link>
  );
}
