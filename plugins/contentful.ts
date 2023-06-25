import * as contentful from 'contentful';


const config = { 
  // space: process.env?.CTF_SPACE_ID, 
  // accessToken:process.env?.CTF_CDA_ACCESS_TOKEN 
  space: 'gtch6w6darsf',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'CRWQWaVfuYO7GFoepi_x8EJlCPEKc8gRXx9-u9kE_ds'
} 

export  function createClient() {
  return contentful.createClient(config);
}

// export default createCMSClient({
//   createClient () {
//     return contentful.createClient(config);
//   }
// })
// export `createClient` to use it in pagecomponents 
// module.exports = {
//   createClient () {
//     return contentful.createClient(config)
//   }
// }