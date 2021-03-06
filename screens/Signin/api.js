const back = "http://192.168.1.71:8000/api";




export const patientSignin = async (first_name,last_name,username,phone_number,password) => {

    const response = await fetch(`${back}/patient/register`,
    {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
            "X-Requested-With" : "XMLHttpRequest"
        },
        body : JSON.stringify({
            first_name,
            last_name,
            username,
            phone_number,
            password
        })
    });

    const data = await response.json();

    return data;
}