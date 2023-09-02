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

export const createTodoMutation = `
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
  query GetUser($id: ID!, $first: Int = 10) {
    user(by: { id: $id }) {
      name
      email
      avatarUrl
      todos(first: $first) {
        edges {
          node {
            title
            category
            status
          }
        }
      }
    }
  }
`;
export const getTodoByStatusQuery = ``;
export const getTodoByCategoryQuery = ``;
