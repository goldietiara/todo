"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import React from "react";

type UserMenuButtonProps = {
  session: Session | null;
};

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div>
      {user ? (
        <p
          className=" uppercase hover:underline cursor-pointer"
          onClick={() => signOut()}
        >
          Sign Out
        </p>
      ) : (
        <p
          className=" uppercase hover:underline cursor-pointer"
          onClick={() => signIn()}
        >
          Sign In
        </p>
      )}
    </div>
  );
}
