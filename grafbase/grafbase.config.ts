import { g, auth, config } from "@grafbase/sdk";

const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  todos: g
    .relation(() => Todo)
    .list()
    .optional(),
});
// .auth((rules) => {
//   rules.public().read();
// });

const Todo = g.model("Todo", {
  title: g.string(),
  category: g.string().unique(),
  status: g.string().optional(),
  createdBy: g.relation(() => User),
});
// .auth((rules) => {
//   rules.public().read(), rules.private().create().delete().update();
// });

export default config({
  schema: g,
});

// test
