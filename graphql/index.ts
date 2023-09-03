// MUTATION
export const createUserMutation = `
  mutation CreateUser($input: UserCreateInput!) {
    userCreate(input: $input) {
      user {
        name
        email
        avatarUrl
        id
      }
    }
  }
`;

export const addTodoMutation = `
  mutation TodoCreate($input: TodoCreateInput!) {
    todoCreate(input: $input) {
      todo {
        title
        category
        status
        id
        createdBy {
          email
          name
        }
      }
    }
  }
`;

export const updateTodoMutation = `
  mutation TodoUpdate($id: ID!, $input: TodoUpdateInput!) {
    todoUpdate(by: { id: $id }, input: $input) {
      todo {
        id
        title
        category
        status
        createdBy {
          email
          name
        }
      }
    }
  }
`;

export const deleteTodoMutation = `
  mutation TodoDelete($id: ID!) {
    todoDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

// QUERY
export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
    }
  }
`;
export const getUserTodoQuery = `
  query GetUser($id: ID!, $last: Int = 10) {
    user(by: { id: $id }) {
      name
      email
      avatarUrl
      todos(last: $last) {
        edges {
          node {
            title
            category
            status
            id
          }
        }
      }
    }
  }
`;
export const getTodoByIdQuery = `
query GetUser($id: ID!) {
  todo(by: { id: $id }) {
    title
    category
    status
    id
    createdBy {
      name
      email
      avatarUrl
      id
    }
  }
}
`;
export const getTodoByCategoryQuery = ``;
