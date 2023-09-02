import { getUserTodo } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { TypeTodo, TypeTodoState, TypeUser } from "@/types";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getCurrentUser();
  if (!session) {
    return <p> Please login first</p>;
  }
  const result = (await getUserTodo(session.user.id)) as { user: TypeUser };
  return (
    <main className="w-full h-full flex items-center justify-start flex-col lg:px-7 my-6 px-5 pb-16 relative">
      <div className="fixed bottom-0 left-7 h-[74.4%] border-l-1 border-black"></div>
      <div className="fixed bottom-0 right-7 h-[80.5%] border-r-1 border-black"></div>
      <section className="w-full h-fit px-16 pb-64 border-b-1 border-black uppercase">
        <h1> Remaining Todos: {result.user.todos.edges.length} </h1>
        {result.user.todos.edges.map((v: any, i: number) => {
          return <p key={i}>{v.node.title}</p>;
        })}
      </section>
    </main>
  );
}
