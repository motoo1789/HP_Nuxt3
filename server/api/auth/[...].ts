import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'

import { NuxtAuthHandler } from "#auth";
import { sql } from '@vercel/postgres';

export default NuxtAuthHandler({
    providers: [
        //@ts-expect-error
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialsProvider.default({
             async authorize(credentials: { email: string, password: string }) {

              console.log(credentials.email);
              console.log(`SELECT user_id FROM users WHERE email = '${credentials.email}'`)
              const { rows, fields } = await sql`SELECT user_id FROM users WHERE email = ${credentials.email}`;
              console.log("user id get")
              const db_user_id = rows[0].user_id;
              
              console.log(db_user_id);

              if(credentials.email === "motoo1789@gmail.com")
              {
                return {
                    email: credentials.email,
                    password: credentials.password,
                }
              }
              else {
                console.error('Warning: Malicious login attempt registered, bad credentials provided');
                return null;
              }
            }
          })
    ]
})

