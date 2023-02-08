import axios from 'axios';

export const axiosIns = axios.create({
  baseURL:
    'https://shopping-list-a3511-default-rtdb.europe-west1.firebasedatabase.app/',
});
