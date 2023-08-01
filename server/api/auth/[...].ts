import GithubProvider from "next-auth/providers/github"

import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    providers: [
        //@ts-expect-error
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        })
    ]
})

