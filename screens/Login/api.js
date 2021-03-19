//  "http://192.168.1.68:8000/api";


export const patientLogin = async (username,password) => {

    const response = await fetch(`http://192.168.1.68:8000/api/patient/login`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
            "X-Requested-With" : "XMLHttpRequest"
        },
        body : JSON.stringify(
            {
                username,password
            }
        )
    });

    const data = await response.json();
    return data;
}