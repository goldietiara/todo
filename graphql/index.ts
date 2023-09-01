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
      name
      email
      avatarUrl
      id
    }
  }
`;
// export const getTodoByIdQuery = ``;
export const getTodoByUserQuery = ``;
export const getTodoByStatusQuery = ``;
export const getTodoByCategoryQuery = ``;
