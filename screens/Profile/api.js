//  http://192.168.1.68:8000/api;

export const getPatient = async (id,token) => {

        const response = await fetch(`http://192.168.1.68:8000/api/patient/${id}`,{
            method : "GET",
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
    
        const data = await response.json();
 
        return data;
}

export const updateNumber = async (id,number,token) => {
    
    const response = await fetch(`http://192.168.1.68:8000/api/patient/phone/${id}`,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-type" : "application/json",
            "X-Requested-With" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({
            phone_number : number
        })
    });

    const data = await response.json();
    return data;
}

export const updatePassword = async (id,password,token) => {
    
    const response = await fetch(`http://192.168.1.68:8000/api/patient/password/${id}`,{
        method : "PUT",
        headers : {
            "Accept" : "application/json",
            "Content-type" : "application/json",
            "X-Requested-With" : "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({
            password
        })
    });

    const data = await response.json();
    return data;
}