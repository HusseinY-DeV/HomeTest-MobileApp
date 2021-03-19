import React , {createContext,useState} from 'react';

export const UserContext = createContext();


const UserContextProvider = (props) => {

    const [authorization,setAuthorization] = useState("");
    const [ID,setID] = useState("");
    const [token,setToken] = useState(false);
    const [render,setRender] = useState(false);
    const [location,setLocation] = useState(null);
    
    return (
        <UserContext.Provider value={{authorization,setAuthorization, token,setToken,ID,setID,render,setRender,location,setLocation}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
