import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'

export default class DiaryService {

    getEntities(page) {
        const url = `${API_URL}/entities/?page=${page}`;
        return axios.get(url).then(response => response.data);
    }
}
