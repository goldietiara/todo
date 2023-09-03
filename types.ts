import { Session, User } from "next-auth";

// export type TypeTodoState = {
//   title: string;
//   category: string;
//   status: boolean;
// };

export type TypeTodo = {
  title: string;
  category: string;
  status: boolean;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
};

export type TypeUser = {
  name: string;
  email: string;
  avatarUrl: string;
  id: string;
  todos: {
    edges: { node: TypeTodo }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export type TypeSession = Session & {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
};

export type TypeTodoForm = {
  title: string;
  category: string;
  status: boolean;
};

export type TypeUpdateTodo = {
  title: string;
  category: string;
};
