import { g, auth, config } from "@grafbase/sdk";

//@ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 20 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    todos: g
      .relation(() => Todo)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read(), rules.private().delete();
  });

//@ts-ignore
const Todo = g
  .model("Todo", {
    title: g.string(),
    category: g.string(),
    status: g.boolean(),
    createdBy: g.relation(() => User),
  })
  .search()
  .auth((rules) => {
    rules.public().read(), rules.private().create().delete().update();
  });

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
