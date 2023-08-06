

export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：addUser")
    
    if (event.node.req.method === 'POST') {
        
        const body = await readBody(event);

        console.log(body)

        return "success";
    }


    return "Bodyがないよ"
})