import React from "react";
import { Link } from "react-router-dom";

export default function RegisterButtonNav() {
  return (
    <Link
      className="bg-white text-text_primary border-2 border-text_primary rounded-full w-28 lg:w-32 flex items-center justify-center py-1 md:py-2 text-lg font-bold transition-transform hover:scale-95"
      to={"/register"}
    >
      Register
    </Link>
  );
}
