const back = "http://192.168.1.71:8000/api";


export const patientLogin = async (username,password) => {

    const response = await fetch(`${back}/patient/login`,{
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