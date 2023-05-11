import axios from 'axios';
export const baseUrl1="https://645cf12ee01ac6105897ef87.mockapi.io/user"

const client = axios.create({
    baseUrl1,
})

export default client;