import GitHubProviderModule from "next-auth/providers/github";
import CredentialsProviderModule from "next-auth/providers/credentials";
import type { User } from "next-auth";
import type { Provider } from "next-auth/providers";

import { NuxtAuthHandler } from "#auth";
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";
import { callNextAuthProvider } from "../../utils/nextAuthProvider";

type LoginCredentials = {
  email?: string;
  password?: string;
};

const providers: Provider[] = [
  callNextAuthProvider(GitHubProviderModule, {
    clientId: process.env.GITHUB_CLIENT_ID ?? "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
  }) as Provider,
  callNextAuthProvider(CredentialsProviderModule, {
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials: LoginCredentials | undefined): Promise<User | null> {
      const email = credentials?.email?.trim() ?? "";
      const password = credentials?.password ?? "";

      if (email === "" || password === "") {
        console.log("メールアドレスとパスワードどちらも未入力");
        return null;
      }

      const dbUserId = await getEmailUser(email);
      if (dbUserId === "No acount") {
        console.log("アカウントが存在しません");
        return null;
      }

      const correctPassword = await checkPassword(dbUserId, password);
      if (correctPassword) {
        return { id: dbUserId, email };
      }

      console.error("Warning: Malicious login attempt registered, bad credentials provided");
      return null;
    },
  }) as Provider,
];

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers,
});

const getEmailUser = async (email: string): Promise<string> => {
  const { rows } = await sql`SELECT user_id FROM users WHERE email = ${email}`;
  return rows[0]?.user_id ?? "No acount";
};

const checkPassword = async (dbUserId: string, password: string): Promise<boolean> => {
  const { rows } = await sql`SELECT * FROM password_security_info where user_id = ${dbUserId}`;
  const hash: string = rows[0]?.password_hash ?? "no";

  return bcrypt.compareSync(password, hash);
};
