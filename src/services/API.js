import axios from 'axios';

class API {
    constructor() {
        axios.defaults.withCredentials = true;
        axios.defaults.baseURL = process.env.VUE_APP_API_URL;
    }

    setToken(token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
}

class PublicAPI extends API {

    post(path, data) {
        return axios.post(path, data)
    }

}

class PrivateAPI extends API {

    constructor (){
        super();
        this.setToken(localStorage.getItem('token'))
    }

    post(path, data) {
        return axios.post(path, data)
    }

    get(path) {
        this.setToken(localStorage.getItem('token'))
        return axios.get(path)
    }

    delete(path) {
        return axios.delete(path)
    }

    put(path,data) {
        return axios.put(path,data)
    }

    patch(path,data) {
        return axios.patch(path,data)
    }
}

const publicAPI = new PublicAPI();
const privateAPI = new PrivateAPI();
export {
    publicAPI,
    privateAPI,
}