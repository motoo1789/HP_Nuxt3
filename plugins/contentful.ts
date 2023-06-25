// import * as createContentful from 'contentful';


// export default defineNuxtPlugin((nuxtApp) => {
//   const config = { 
//     // space: process.env?.CTF_SPACE_ID, 
//     // accessToken:process.env?.CTF_CDA_ACCESS_TOKEN 
//     space: 'gtch6w6darsf',
//     environment: 'master', // defaults to 'master' if not set
//     accessToken: 'CRWQWaVfuYO7GFoepi_x8EJlCPEKc8gRXx9-u9kE_ds'
//   } 

//   const contentful = createContentful.createClient(config);

//   nuxtApp.vueApp.use(createContentful,config);
// });

import contentful from 'contentful';

const config = {
  space: 'gtch6w6darsf',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'CRWQWaVfuYO7GFoepi_x8EJlCPEKc8gRXx9-u9kE_ds'
};

//const createClient = contentful.createClient(config);
export default contentful;