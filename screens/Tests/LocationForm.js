import React , {useState,useEffect} from 'react';
import { useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styled from "styled-components";
import { UserContext } from '../../components/UserContext';
import {addLocation} from "./api";


const LocationFormContainer = styled.View`

    flex: 1;
    justify-content: center;
    align-items: center;

`;

const LocationFormTitle = styled.Text`

    color: #3a3a3a;
    text-align: center;
    font-size: 18px;
    background-color: gold;
    padding: 15px;

`;

const ErrText = styled.Text`
    color: crimson;
    margin-top: 10px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
`;

const SubmitButton = styled.TouchableOpacity`
    margin-top: 20px;
    background-color : green;
    width: 30%;
    padding: 10px;
    border-radius: 5px;
`;

const SubmitButtonText = styled.Text`
    color : whitesmoke;
    font-weight: bold;
    font-size: 18px;
    text-align:center;
`;


const LocationInput = styled.TextInput`  
    background-color: #dddd;
    color: #3a3a3a;
    width: 75%;
    font-size: 16px;
    padding: 15px;
    z-index: 2;
    border-radius: 5px;
    margin: 20px;
    border-bottom-color: #43f92f;
    border-bottom-width: 2px;
`;

const LocationForm = ({navigation}) => {


    const context = useContext(UserContext);

    const [city,setCity] = useState("");
    const [cityErr,setCityErr] = useState("");

    const [building,setBuilding] = useState("");
    const [buildingErr,setBuildingErr] = useState("");

    const [street,setStreet] = useState("");
    const [streetErr,setStreetErr] = useState("");

    const handleSubmitPress = async () => {

        const response = await addLocation(context.authorization,context.ID,street,building,city);

        if(response.errors)
        {
            if(response.errors.street)
            {
                setStreetErr(response.errors.street[0]);
            }

            if(response.errors.city)
            {
                setCityErr(response.errors.city[0]);
            }

            if(response.errors.building)
            {
                setBuildingErr(response.errors.building[0]);
            }

            return;
        }

        setBuilding("");
        setStreetErr("");
        setCity("");
        context.setRender(!context.render);
        navigation.navigate("Tests");
        

    }

    useEffect(() => {
        
    }, []);

    return ( 
        <ScrollView keyboardDismissMode="interactive">
            <LocationFormContainer>
                <LocationFormTitle>
                    Make sure to fill out this form correctly so you can get your tests delivered to you ! ~HomeTest Team~
                </LocationFormTitle>

                <ErrText>{cityErr}</ErrText>
                <LocationInput placeholder="City"
                onChangeText={value => {
                    setCity(value);
                    setCityErr("");
                }}
                value={city}
                />
                <ErrText>{streetErr}</ErrText>
                <LocationInput placeholder="Street"
                onChangeText={value => {
                    setStreet(value);
                    setStreetErr("");
                }}
                value={street}
                />
                <ErrText>{buildingErr}</ErrText>
                <LocationInput placeholder="Building"
                onChangeText={value => {
                    setBuilding(value);
                    setBuildingErr("");
                }}
                value={building}                
                />

                <SubmitButton
                    onPress={handleSubmitPress}
                >
                    <SubmitButtonText>
                        Submit
                    </SubmitButtonText>
                </SubmitButton>

            </LocationFormContainer>
        </ScrollView>
     );
}
 
export default LocationForm;
