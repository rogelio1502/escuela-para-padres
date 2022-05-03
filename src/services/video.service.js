import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://u8d8rt.deta.dev/';
class VideoService {

    getAll() {
        return axios.get(API_URL + "videos/");

    }

}
export default new VideoService();
