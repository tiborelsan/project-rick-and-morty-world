import axios from './axios';

export default {
    getCharacters: (page: number, search: string) => axios.get(`character/?page=${page}&name=${search}`),
    getCharacterDetail : (id: number) => axios.get(`character/${id}`)
}