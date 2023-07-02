// export default defineEventHandler(async (event) => {
    
//     const config = {
//         space: 'gtch6w6darsf',
//         environment: 'master', // defaults to 'master' if not set
//         accessToken: 'CRWQWaVfuYO7GFoepi_x8EJlCPEKc8gRXx9-u9kE_ds'
//       };
    
//     // const createClient = contentful.createClient(config);

//     const send = client.getEntries()
//         .then(entries => {
//           return {
//             posts: entries.items
//           }
//         })

//     console.log(send)
//     return send;
    
//   });

import {useAsyncData, useNuxtApp} from "nuxt/app";
//import contentful from 'contentful';
export default defineEventHandler(async (event) => {


	//const route = useRoute()
	// const id = "4J3u7b0DkC26yQGjn0DuS0";
  const {$hello} = useNuxtApp
  console.log($hello)
  const id = "4cc9JW3vkGlnH8B97ofmn9"
  const {$client}=useNuxtApp()
  console.log($client)
  //const data2 = await useAsyncData($client.getEntry(id));
  const {data} = await useFetch(id,()=> $client.getEntry(id));

  const back = {
    name: "perusona5",
  }
  return data;
});
  