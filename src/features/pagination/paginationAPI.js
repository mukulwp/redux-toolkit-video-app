import {axiosInstance} from "../../utils/axios";
export const getAllVideos = async()=>{

    const response = await axiosInstance.get('/videos/');

    return response.data;
}