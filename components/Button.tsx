"use client";
import { TypeTodo } from "@/types";
import React, { MouseEvent } from "react";
import { PiCheckLight, PiTrashLight } from "react-icons/pi";

type ButtonProps = {
  className: string;
  buttonType: string;
  node: TypeTodo;
  buttonAction: (node: TypeTodo) => Promise<void>;
};

const Button = async ({
  className,
  buttonType,
  buttonAction,
  node,
}: ButtonProps) => {
  return (
    <button
      className={`px-5 hover:text-Ivory transition-all ease-in-out duration-300
    ${className}`}
      onClick={() => buttonAction(node)}
    >
      {buttonType === "update" ? <PiCheckLight /> : <PiTrashLight />}
    </button>
  );
};

export default Button;
