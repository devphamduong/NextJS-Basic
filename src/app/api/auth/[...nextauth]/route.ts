import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "signIn" && account?.provider === "github") {
        token.address = "abc";
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.address = token.address;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
