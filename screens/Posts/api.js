
export const getBlogs = async (token) => {
    
    const response = await fetch("http://192.168.1.13:8000/api/posts",{
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
    
    const response = await fetch(`http://192.168.1.13:8000/api/posts/${id}`,{
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
// http://192.168.1.68:8000/api