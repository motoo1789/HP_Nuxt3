

export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：アニメを取得")
     

    if (event.node.req.method === 'GET') 
    {

        
        return {};
    }
})