"use client"
import { signOut } from "next-auth/react";

export default function MenuLogOut() {

  return (
    <div className="p-4 bg-slate-900">
      <h2 className="text-lg font-medium text-white">LogOut</h2>
      <button
        type="submit"
        className="bg-slate-500 text-white w-full p-2 rounded-md"
        onClick={() => signOut()}
      >Logout
      </button>
    </div>
  );
}