import {
  addTodoMutation,
  createUserMutation,
  deleteTodoMutation,
  getTodoByIdQuery,
  getUserQuery,
  getUserTodoQuery,
  updateTodoMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";
import { env } from "@/lib/env";
import { TypeTodoForm } from "@/types";

const isProduction = process.env.NODE_ENV === "production";

// npx grafbase@0.24 dev
// GRAFBASE

const apiUrl = isProduction
  ? env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction ? env.NEXT_PUBLIC_GRAFBASE_API_KEY || "" : "henlo";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL || ""
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

//client request, a connection to grafbase database
const makeGraphQLRequest = async (query: string, variables: {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: { name, email, avatarUrl },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const addTodo = async (
  form: TypeTodoForm,
  creatorId: string,
  token: string
) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    input: {
      ...form,
      createdBy: {
        link: creatorId,
      },
    },
  };
  return makeGraphQLRequest(addTodoMutation, variables);
};

export const getUserTodo = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserTodoQuery, { id });
};

export const updateTodo = (
  form: TypeTodoForm,
  projectId: string,
  token: string
) => {
  let updatedForm = { ...form };

  const variables = {
    id: projectId,
    input: updatedForm,
  };
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(updateTodoMutation, variables);
};

export const deleteTodo = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);

  return makeGraphQLRequest(deleteTodoMutation, { id });
};

export const getTodobyId = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getTodoByIdQuery, { id });
};
