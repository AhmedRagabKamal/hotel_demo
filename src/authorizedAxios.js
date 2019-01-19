import axios from 'axios';
import NProgress from 'nprogress';

const authorizedAxios = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});


// before a request is made start the nprogress
authorizedAxios.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

// before a response is returned stop nprogress
authorizedAxios.interceptors.response.use((response) => {
  NProgress.done();
  return response;
}, error => Promise.reject(error));

export default authorizedAxios;
