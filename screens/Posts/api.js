const back = "http://192.168.1.71:8000/api";



export const getBlogs = async (token) => {
    
    const response = await fetch(`${back}/posts`,{
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-type" : "application/json",
            "Accept" : "application/json"
        }
    });
    
    const data = await response.json();
    return data;
}


export const getBlog = async (token,id) => {
    
    const response = await fetch(`${back}/posts/${id}`,{
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`,
            "Content-type" : "application/json",
            "Accept" : "application/json"
        }
    });
    
    const data = await response.json();
    return data;
}
