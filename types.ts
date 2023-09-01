export type TypeTodo = {
  title: string;
  category: string;
  status: string;
  id: string;
  createdBy: {
    email: string;
    name: string;
    id: string;
  };
};
