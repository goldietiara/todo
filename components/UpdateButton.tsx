import { fetchToken, updateTodo } from "@/lib/actions";
import { TypeTodo, TypeTodoForm } from "@/types";
import { redirect } from "next/navigation";
import React from "react";
import { PiCheckLight } from "react-icons/pi";
import Button from "./Button";

type UpdateButtonProps = {
  todo: TypeTodo;
};

const UpdateButton = ({ todo }: UpdateButtonProps) => {
  const updateTodos = async () => {
    "use server";

    const { token } = await fetchToken();
    const title = todo.title;
    const category = todo.category;
    const status = true;
    const form = { title, category, status };

    if (!title || !category) {
      throw Error("Missing required fields");
    }

    console.log(form);
    await updateTodo(form as TypeTodoForm, todo.id, token);

    redirect("/");
  };

  return (
    // <button className="border-x-1 border-black px-5 hover:bg-black hover:text-Ivory transition-all ease-in-out duration-300">
    //   <PiCheckLight />
    // </button>
    <Button
      className="border-x-1 border-black hover:bg-black hover:text-Ivory"
      buttonType="update"
      buttonAction={updateTodos}
    />
  );
};

export default UpdateButton;
