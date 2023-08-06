import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：addUser")
    
    if (event.node.req.method === 'POST') {
        
        const body = await readBody(event);

        console.log(body)

        const password = body.password;
        const saltRounds = 10

        const salt = bcrypt.genSaltSync(saltRounds)
        console.log('salt: ', salt)
        
        const hash = bcrypt.hashSync(password, salt)
        console.log('hash: ', hash)
        
        console.log('data1: ', bcrypt.compareSync(password, hash))
        console.log('data2: ', bcrypt.compareSync("dte", hash))

        return "success";
    }


    return "Bodyがないよ"
})