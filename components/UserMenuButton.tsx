"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

type UserMenuButtonProps = {
  session: Session | null;
};

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className=" flex">
      <p
        className=" uppercase hover:underline cursor-pointer"
        onClick={() => signOut()}
      >
        Sign Out
      </p>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          width={40}
          height={40}
          className="rounded-full"
          alt="user profile image"
        />
      )}
    </div>
  );
}
