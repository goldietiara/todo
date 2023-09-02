import React from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/constants";
import UserMenuButton from "./UserMenuButton";

import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";

const NavBar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flex m-7">
      <div className=" w-fit pr-10">
        <Link href={"/"}>
          <Image
            src="/chiyo-chichi-fliped.PNG"
            width={100}
            height={100}
            alt="logo"
          />
        </Link>
      </div>
      <div className="grid grid-cols-5 items-center justify-start border-1 border-black w-full uppercase ">
        <p className=" col-span-4 pl-10">Hi, {session?.user?.name}!</p>
        <div className="  w-full h-full flex justify-center items-center px-5 gap-10 border-l-1 border-black">
          {session?.user ? (
            <UserMenuButton session={session} />
          ) : (
            <AuthProviders />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
