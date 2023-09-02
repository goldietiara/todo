import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/lib/env";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { createUser, getUser } from "@/lib/actions";
import { TypeSession, TypeUser } from "@/types";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/chiyo-chichi-fliped.PNG",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      try {
        const data = (await getUser(email)) as { user?: TypeUser };
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };
        return newSession;
      } catch (error: any) {
        console.error("Error retrieving user data: ", error.message);
        return session;
      }
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        const userExists = (await getUser(user?.email as string)) as {
          user?: TypeUser;
        };
        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }
        console.log(createUser);
        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as TypeSession;

  return session;
}

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
