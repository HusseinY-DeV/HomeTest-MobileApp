import React , {useEffect,useState} from 'react';
import { useContext } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import styled from "styled-components";
import { UserContext } from '../../components/UserContext';
import { getTests , bookTest , getBookings } from "./api";


const TestsContainer = styled.View`

    flex: 1;
    justify-content: center;
    align-items: center;

`;


const Test = styled.View`

    flex: 1;
    margin: 10px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    width: 280px;
    border-radius: 5px;
    background-color: #fff;
`;

const TestContent = styled.Text`

    text-align:center;
    font-size: 16px;
    color: #5b5b5b;
    font-weight: bold;
    margin: 10px;

`;


const Add = styled.TouchableOpacity`

    width: 75px;
    margin: 0px;
    padding: 10px;
    flex:1;
    justify-content:center;
    align-items:center;

`;

const Cart = styled.TouchableOpacity`

    width: 75px;
    margin: 0px;
    padding: 10px;
    align-self: flex-start;
    flex: 1;
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;
`;

const Count = styled.Text`

    background-color: aqua;
    align-self:center;
    text-align:center;
    padding-top:7px;
    height:35px;
    width:35px;
    color: #fafafa;
    margin: 0px 10px;
    border-radius: 200px;

`;


const Tests = ({navigation}) => {

    const context = useContext(UserContext);

    const [tests,setTests] = useState([]);
    const [count,setCount] = useState(0)


    const handleAddPress = async (tid) => {
        const response = await bookTest(context.authorization,context.ID,tid);
        if(response.status == "redirect")
        {
            navigation.navigate("Location");
            return;
        }

        context.setRender(!context.render);
    }

    const handleCartPress = () => {

        if(!context.location)
        {
            navigation.navigate("Location");
            return;
        }

        navigation.navigate("Bookings");
    }

    useEffect(() => {

        (async () => {
            const response = await getTests(context.authorization);
            const bookings = await getBookings(context.authorization,context.ID);
            if(bookings.response[""][0])
            {
                if(bookings.response[""][0].test[bookings.response[""][0].test.length - 1]){
                    if(bookings.response[""][0].test[bookings.response[""][0].test.length - 1].pivot.checked_out == "false")
                    {
                        let data = bookings.response[""][0].test.filter(t => {
                            return t.pivot.checked_out != "true";
                        })
                        setCount(data.length);
                    }else {
                        setCount(0);
                    }
                }
            }
            setTests([...response.response]);
        })()
    }, [context.render]);

    return ( 
        <ScrollView>
            <TestsContainer>
                <Cart
                onPress = {handleCartPress}
                >
                    <FontAwesome name="cart-plus" size={28} color="#5b5b5b" />
                    <Count>{count}</Count>
                </Cart>
                {tests.map(test => (
                    <Test key={test.id}>
                        <TestContent>Test/Vaccine : {test.name}</TestContent>
                            <TestContent>
                                Price : {test.price} L.L
                            </TestContent>
                            <TestContent>
                                Quantity : {test.quantity}
                            </TestContent>
                {test.quantity == 0 ? 
                            <Add
                            onPress = {async () => {
                                await handleAddPress(test.id);
                    }}
                    disabled
                    >
                    <AntDesign name="plussquare" size={28} color="#bbbb" />
                    </Add>
                    :
                    <Add
                    onPress = {async () => {
                        await handleAddPress(test.id);
                    }}
                    >
                    <AntDesign name="plussquare" size={28} color="#0065ff" />
                    </Add>      
                        }
                    </Test>
                ))}
            </TestsContainer>
        </ScrollView>
     );
}
 
export default Tests;