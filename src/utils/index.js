import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const baseURL = 'https://hopeaccelerated-backend.herokuapp.com';
const chatURL = 'https://hopeaccelerated-chat.herokuapp.com';
const mediaURL = `${baseURL}/uploaded_data/`;
let Instance = Axios.create({
  baseURL,
});
Instance.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
export default Instance;
export {baseURL, chatURL, mediaURL};
