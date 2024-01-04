import bcrypt from "bcrypt";
import { sql } from '@vercel/postgres';
 
function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

export default defineEventHandler(async (event) => {
    
    if (event.node.req.method === 'POST') {
        
        const body = await readBody(event);

        const name = body.name
        const password = body.password;
        const email = body.email;

        const saltRounds = getRandomInt(10) + 1

        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        const { rows, fields } = await sql`SELECT COUNT(*) FROM users`;
        const lines:number = Number(rows[0].count) + 1;

        await sql`INSERT INTO users (user_id,username,password,email,is_active) 
                                    VALUES ( ${lines}, ${name},${hash},${email},false);`;
        
        await sql`INSERT INTO password_security_info (user_id,password_hash,password_salt) 
                VALUES (${lines},${hash},${salt});`;
	

        

        return "success";
    }


    return "Bodyがないよ"
})