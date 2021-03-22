import React, {useEffect,useState} from 'react';
import { useContext } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styled from "styled-components";
import { UserContext } from '../../components/UserContext';
import { Entypo } from '@expo/vector-icons';
import { getBookings,getTests,deleteBook , buy} from "./api";

const Loader = styled.Text`
    flex: 1;
    text-align:center;
    font-size: 30px;
    align-items:center;
    margin-top: 200px;
    justify-content: center;
    color : #bbbb;
`;


const BookingsContainer = styled.View`

    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 10px;

`;

const EachBooking = styled.View`
    
    flex: 1;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: #eeee;
    height: 50px;
    padding: 10px;
    margin: 20px 0px;

`;


const EachBookingText = styled.Text`

    color: #3a3a3a;
    font-size: 13px;
    font-weight: bold;
    width: 40%;
    text-align: center;

`;

const EachBookingTextPrice = styled.Text`

    color: whitesmoke;
    padding: 10px;
    font-size: 13px;
    background-color: #0065ff;
    border-radius: 5px;

`;

const Status = styled.Text`

    color: #aaaa;
    font-weight: bold;
    text-align: center;
    margin: 150px;
    width: 100%;
    font-size: 30px;

`;

const Price = styled.Text`

    color: whitesmoke;
    padding: 10px;
    border-radius: 10px;
    background-color: #3a3a3a;
    letter-spacing: 2px;
    font-weight: bold;
    text-align: center;
    margin: 40px 0px 0px 0px;
    width: 95%;
    font-size: 18px;

`;

const Buy = styled.TouchableOpacity`

    background-color: #0065ff;
    text-align: center;
    border-radius: 5px;
    width: 30%;
    margin: 10px 0px 0px 0px;
`;

const BuyText = styled.Text`

    color: white;
    letter-spacing: 2px;
    font-weight: bold;
    text-align: center;
    margin: 10px;
    font-size: 18px;

`;

const SuccessText = styled.Text`

    color: whitesmoke;
    margin-top: 10px;
    background-color: green;
    font-weight: bold;
    font-size: 16px;
    padding: 10px;
    text-align: center;

`;


const Bookings = ({navigation}) => {


    const context = useContext(UserContext);
    const [bookings,setBookings] = useState([]);
    const [tests,setTests] = useState([]);
    const [status,setStatus] = useState(false);
    const [price,setPrice] = useState(0);
    const [loading,setLoading] = useState(true);

    let prices = [];


    const handleRemovePress = async (id,tid) => {
        const response = await deleteBook(context.authorization,id,tid);
        if(response)
        {
            context.setRender(!context.render);
        }
    }

    const handleBuyPress = async () => {
        const response = await buy(context.authorization,context.ID);
        context.setRender(!context.render);
        setStatus(true);
        setTimeout(() => {
            setStatus(false);
            navigation.navigate("Tests");

        },3000)
    }

    useEffect(() => {
        
        (async () => {
            setLoading(true);
            const response = await getBookings(context.authorization,context.ID);
            const tests = await getTests(context.authorization);
            setTests([...tests.response]);
            if(response.response[""][0])
            {
                if(response.response[""][0].test[response.response[""][0].test.length - 1]){
                    if(response.response[""][0].test[response.response[""][0].test.length - 1].pivot.checked_out == "false")
                    {
                        let data = response.response[""][0].test.filter(t => {
                            return t.pivot.checked_out != "true";
                        })
                        setBookings([...data]);
                    }else {
                        setBookings([]);
                    }
                }
            }
            response.response[""][0].test.forEach(t => {
                prices.push(t.price);
            });
            let total = prices.reduce((i,p) => {
                return i + p;
            },0);
            setPrice(total);
            setLoading(false);
        })();

    }, [context.render]);

    return ( 
        <ScrollView>
        {status ? <SuccessText>Your delivery request was submitted successfully!</SuccessText> : null}
        {!loading ? (
            <BookingsContainer>
            {bookings.length ? (
                <>
               {bookings.map((book,i) => {
                    return (
                        <EachBooking key={i}>
                            <EachBookingText>{i+1}-  Test : {book.name}</EachBookingText>
                            <EachBookingTextPrice>Price : {book.price} L.L</EachBookingTextPrice>
                            <TouchableOpacity
                            onPress={() => {
                                handleRemovePress(book.pivot.id,book.id);
                            }}
                            >
                                 <Entypo name="squared-minus" size={26} color="crimson" />
                            </TouchableOpacity>
                        </EachBooking>
                    )
                })
                   }

               <Price>Total price : {price} L.L</Price> 
                                <Buy
               onPress={handleBuyPress}
                >
                   <BuyText>Buy</BuyText>
               </Buy>

               </>
            ) : <Status>Your cart is empty !</Status>}
                  

        </BookingsContainer>) : <Loader> Loading... </Loader>}
    </ScrollView>
     );
}
 
export default Bookings;