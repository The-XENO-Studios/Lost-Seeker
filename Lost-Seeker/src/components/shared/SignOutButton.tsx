import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../App";

export default function SignOutButton({ signOut }: { signOut: () => void }) {
  return (
    <button
      className="bg-black text-white rounded-full w-28 lg:w-32 flex items-center justify-center py-1 md:py-2 text-lg font-bold transition-transform hover:scale-95"
      onClick={signOut}
    >
      Sign Out
    </button>
  );
}
