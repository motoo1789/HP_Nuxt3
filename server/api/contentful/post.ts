export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：addUser")
    
    const postBody = await readBody(event);
    console.log(postBody);

    if (event.node.req.method === 'POST') {
        
        console.log()
        return "success";
    }

})