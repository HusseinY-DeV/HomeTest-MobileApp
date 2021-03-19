import React, {useEffect,useState} from 'react';
import { useContext } from 'react';
import styled from "styled-components";
import { UserContext } from '../../components/UserContext';
import { getBookings } from "./api";



const BookingsContainer = styled.View`

`;

const Bookings = () => {


    const context = useContext(UserContext);
    const [tests,setTests] = useState([]);
    const [price,setPrice] = useState(0);

    useEffect(() => {
        
        (async () => {
            const response = await getBookings(context.authorization,context.ID);
            console.log(response);            
        })();

    }, []);

    return ( 
        <BookingsContainer>

        </BookingsContainer>
     );
}
 
export default Bookings;