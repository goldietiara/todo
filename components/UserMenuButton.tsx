"use client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { VscMenu } from "react-icons/vsc";

type UserMenuButtonProps = {
  session: Session | null;
};

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <div className="p-10">
      <div className="dropdown inline-block relative">
        <button className="bg-gray-300 uppercase py-2 px-4 inline-flex items-center">
          <VscMenu className=" shrink-0 text-xl" />
        </button>
        <ul className=" dropdown-menu absolute hidden text-gray-700 bg-Ivory min-w-fit w-64 -right-[200%] z-50 text-center border-x-1 border-t-1 border-black">
          <li className="py-3 px-5 pt-5 items-center w-full border-b-1 border-black flex-col flex">
            <Image
              src={`${user?.image}`}
              alt={`${user?.name}`}
              className="rounded-full mb-3"
              width={70}
              height={70}
            />
            <p className=" font-normal">{user?.name}</p>
            <p className=" text-sm">{user?.email}</p>
          </li>
          <li className=" cursor-pointer hover:bg-black hover:text-Ivory transition-all ease-in-out duration-300 py-3 px-2 border-b-1 border-black">
            <a href="/add-todo">Add Todo</a>
          </li>
          <li className=" cursor-pointer hover:bg-black hover:text-Ivory transition-all ease-in-out duration-300 py-3 px-2 border-b-1 border-black">
            <a onClick={() => signOut()}>Sign Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
