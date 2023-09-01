import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/lib/env";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// });

// export { handler as GET, handler as POST };

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   // passing the user.id to session.user.id
  //   session({ session, user }) {
  //     session.user.id = user.id;
  //     return session;
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// change git user
