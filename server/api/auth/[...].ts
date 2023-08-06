import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'

import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    providers: [
        //@ts-expect-error
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialsProvider.default({
            authorize(credentials: { email: string, password: string }) {
              if(credentials.email === "motoo1798@gmail.com")
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

