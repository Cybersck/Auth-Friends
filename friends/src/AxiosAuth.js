import axios from 'axios';

export const axiosWithAuth = (url) => {
    const token = window.localStorage.getItem('user-auth');
        return axios.create({
            headers:{
                'Content-Type': 'application/json',
                'authorization': `${token}`,

            },
            baseURL: 'http://localhost:5000/'
        })
}