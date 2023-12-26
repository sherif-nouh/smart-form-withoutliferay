import axios from "axios";

axios.defaults.baseURL = 'https://soa-prod.pai.gov.kw/PAI/';
axios.defaults.timeout = 7000;

axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })
  
  axios.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
  })
