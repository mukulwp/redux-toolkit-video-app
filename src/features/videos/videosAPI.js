import {axiosInstance} from "../../utils/axios";
export const getVideos = async(page, tags, searchText)=>{
    let queryString = `&_page=${page}&_limit=8&`;
    if(tags?.length > 0){
        queryString += tags.map((tag)=> `tags_like=${tag}`).join("&");
    }
    if(searchText !== ""){
        queryString += `&q=${searchText}`;
    }

    const response = await axiosInstance.get(`/videos/?${queryString}`);

    return response.data;
}