//  http://192.168.1.68:8000/api;



export const getTests = async (token) => {


    const response = await fetch("http://192.168.1.68:8000/api/tests/patient", {
        method : "GET",
        headers : {
            Authorization : `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}


export const bookTest = async (token,id,tid) => {

    const response = await fetch(`http://192.168.1.68:8000/api/patient/bookings/${id}/${tid}`,{
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
}

export const addLocation = async (token,id,street,building,city) => {

    const response = await fetch(`http://192.168.1.68:8000/api/location/patient/${id}`,{
        method : "POST",
        headers : {
            "Accept" : "application/json",
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`,
            "X-Requested-With" : "XMLHttpRequest"
        },
        body : JSON.stringify({
            street,
            building,
            city
        })
    });

    const data = await response.json();
    return data;
}


export const getBookings = async (token,id) => {

    const response = await fetch(`http://192.168.1.68:8000/api/my/${id}`,{
        method : "GET",
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data;
};