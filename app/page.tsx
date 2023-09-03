import { deleteTodo, fetchToken, getUserTodo, updateTodo } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { TypeTodo, TypeTodoForm, TypeUser } from "@/types";
import { PiTrashLight } from "react-icons/pi";
import Button from "@/components/Button";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const session = await getCurrentUser();

  if (!session) {
    return <p> Please login first</p>;
  } else if (!session.user) {
    return <p> Please login first</p>;
  }

  const todo = (await getUserTodo(session.user.id)) as { user: TypeUser };
  const result = todo.user.todos.edges;
  const { token } = await fetchToken();

  const updatingTodo = async (node: TypeTodo) => {
    "use server";

    const title = node.title;
    const category = node.category;
    const status = true;
    const form = { title, category, status };

    if (!title || !category) {
      throw Error("Missing required fields");
    }

    await updateTodo(form as TypeTodoForm, node.id, token);
    console.log("todo updated");
    revalidatePath("/");
  };

  const deletingTodo = async (node: TypeTodo) => {
    "use server";

    await deleteTodo(node.id, token);
    console.log("todo deleted");

    revalidatePath("/");
  };

  return (
    <main className="w-full h-full flex items-center justify-start flex-col lg:px-7 my-6 px-5 pb-16 relative">
      <div className="fixed bottom-0 left-7 h-[74.4%] border-l-1 border-black"></div>
      <div className="fixed bottom-0 right-7 h-[80.5%] border-r-1 border-black"></div>
      <section className="w-full h-96 uppercase grid grid-cols-2">
        <div className="px-10">
          <h1 className=" mb-8 text-3xl text-center">weekly progress</h1>
          <div className=" border-t-1 border-black"></div>
        </div>
        <div className="px-10 border-l-1 border-black">
          <h1 className=" mb-8 text-3xl text-center">
            Remaining Todos: {result.length}
          </h1>
          <div className=" border-t-1 border-black">
            {result.map((v: any, i: number) => {
              return (
                <div className=" flex border-x-1 border-b-1 border-black">
                  <p className=" self-center px-3 w-32">{v.node.category}</p>
                  <p
                    key={i}
                    className=" border-l-1 border-black px-3 py-5 justify-between w-full"
                  >
                    {v.node.title}
                  </p>
                  <Button
                    className="border-x-1 border-black hover:bg-black hover:text-Ivory"
                    buttonType="update"
                    buttonAction={updatingTodo}
                    node={v.node}
                  />
                  <Button
                    className="hover:bg-rose-800 hover:text-Ivory"
                    buttonType="delete"
                    buttonAction={deletingTodo}
                    node={v.node}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
