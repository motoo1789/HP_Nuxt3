

export default defineEventHandler(async (event) => {
    console.log("サーバー側処理：アニメを取得")
     

    if (event.node.req.method === 'GET') 
    {
        // repository 問い合わせ
        

        // 返却値をそのまま返す
        return {};
    }
})