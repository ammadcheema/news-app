import axios from "axios";

export const axiosGetRequest =async(url,token)=>{
    console.log(process.env.REACT_APP_SERVER_URL);
    const response =  await axios.get(`${process.env.REACT_APP_SERVER_URL}${url}`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    return response
    
}


export const axiosPutRequest =async(url,token)=>{
    const response =  await axios.put(`${process.env.REACT_APP_SERVER_URL}${url}`,{}, {
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    return response
    
}