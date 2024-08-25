import axios from 'axios';
import React from 'react';


 const axiosPublic=axios.create({
    baseURL:'https://story-telling-platfrom-backend.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;