import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from 'next-auth/providers/credentials'

import { NuxtAuthHandler } from "#auth";
import bcrypt from "bcrypt";
import { sql } from '@vercel/postgres';

export default NuxtAuthHandler({
	secret: process.env.AUTH_SECRET,
	pages: {
		signIn: "/login", // 用意したログインページに設定
	},
    providers: [
        //@ts-expect-error
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialsProvider.default({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: '(hint: jsmith)' },
				password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
			},
			async authorize(credentials: { email: string, password: string }) {

				const dbUserId:string = await getEmailUser(credentials.email);
				console.log(dbUserId);
				if(dbUserId === "No acount")
				{
					console.log("アカウントが存在しません");
					
					return null;
				}

				const correctPassword:boolean = await checkPassword(dbUserId, credentials.password);

				if(correctPassword)
				{
					console.log("存在確認")
					return true
				}
				else {
					//console.error('Warning: Malicious login attempt registered, bad credentials provided');
					return null
					
				}
        	}
        })
    ],

})

const getEmailUser = async ( email:string ): Promise<string> => 
{
	const { rows, fields } = await sql`SELECT user_id FROM users WHERE email = ${email}`;
	return rows[0]?.user_id ?? "No acount";
}

const checkPassword = async ( dbUserId:string, password:string ): Promise<boolean> => 
{
	const { rows, fields } = await sql`SELECT * FROM password_security_info where user_id = ${dbUserId}`;
	const hash:string = rows[0]?.password_hash ?? "no";
	
	return bcrypt.compareSync(password, hash);
}