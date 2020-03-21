import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://10.0.2.2:3333', //android
  baseURL: 'http://192.168.0.15:3333', //usb ipconfig
});

export default api;
