import axios from 'axios';
export const baseUrl1="https://6491eda92f2c7ee6c2c92aea.mockapi.io/data"
export const baseUrl2="https://6491eda92f2c7ee6c2c92aea.mockapi.io/user"

const client = axios.create({
    baseUrl1,
})

export default client;