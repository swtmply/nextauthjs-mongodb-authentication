import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "@/lib/mongodb";
import dbConnect from "@/lib/dbConnect";
import Users from "@/models/Users";

import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // database call
        await dbConnect();

        const username = credentials.username;
        const password = credentials.password;

        const user = await Users.findOne({ username });

        if (user) {
          if (!user.password) {
            throw new Error("User does not exist");
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new Error("Password Incorrect");
          }

          return user;
        } else {
          throw new Error("No user found with this username");
        }
      },
    }),
  ],

  // JWT
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },

  // pages
  pages: {
    signIn: "/login",
    error: "/login", // Changing the error redirect page to our custom login page
  },

  // database adapter
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  // callback
  callbacks: {
    jwt: ({ token, user }) => {
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.sub;
      }

      return session;
    },
  },
});
