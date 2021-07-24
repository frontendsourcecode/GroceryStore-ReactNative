import axios from 'axios';
//const URL = 'http://192.168.1.101/grocerystore/';
 const URL = 'https://megagrocerystore.000webhostapp.com/';
export const BASE_URL = URL;

const API = async config => {
  //   const token = await getApiKey();
  //   console.log(token);
  //   if (token) {
  //     config.headers = {
  //       authorization: token,
  //     };
  //   }
  //interceptors handle network error
  axios.interceptors.response.use(
    response => {
      return response;
    },
    function(error) {
      if (!error.response) {
        error.response = {
          data: 'net work error',
          status: 500,
        };
      }
      if (error.response.status === 401) {
        console.log('Unauthorised');
      }
      return Promise.reject(error);
    },
  );
  config.baseURL = URL;
  return axios(config);
};
export default API;
