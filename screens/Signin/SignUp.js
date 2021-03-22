import React, {useState,useEffect,useContext} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import styled from "styled-components";
import { UserContext } from '../../components/UserContext';
import Logo from '../../Logo';
import {patientSignin} from "./api";


const SignUpContainer = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 7px;
`;

const SignUpInput = styled.TextInput`  
    background-color: #eee;
    color: #3a3a3a;
    width: 75%;
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    margin: 5px
    border-bottom-color: #43f92f;
    border-bottom-width: 2px;
`;

const SignUpButton = styled.TouchableOpacity`
    margin-top: 15px;
    background-color : green;
    width: 30%;
    padding:10px;
    border-radius: 5px;
`;

const SignUpButtonText = styled.Text`
    color : whitesmoke;
    font-weight: bold;
    font-size: 18px;
    text-align:center;
`;


const ErrText = styled.Text`
    color : crimson;
    font-size: 14px;
    margin: 5px;
    font-weight: bold;
    text-align: center;
`;


const SignUp = ({navigation}) => {


    const [fname,setFname] = useState(""); 
    const [fnameErr,setFnameErr] = useState(""); 

    const [lname,setLname] = useState("");
    const [lnameErr,setLnameErr] = useState("");
    
    const [number,setNumber] = useState(""); 
    const [numberErr,setNumberErr] = useState("");
    
    const [username,setUsername] = useState(""); 
    const [usernameErr,setUsernameErr] = useState(""); 

    const [password,setPassword] = useState(""); 
    const [passwordErr,setPasswordErr] = useState(""); 

    const context = useContext(UserContext);

    
    const handleSignIn = async () => {

        const response = await patientSignin(fname,lname,username,number,password);

        if(response.errors)
        {
            if(response.errors.first_name)
            {
                setFnameErr(response.errors.first_name[0]);
            }

            if(response.errors.last_name)
            {
                setLnameErr(response.errors.last_name[0]);
            }

            if(response.errors.username)
            {
                setUsernameErr(response.errors.username[0]);
            }

            if(response.errors.password)
            {
                setPasswordErr(response.errors.password[0]);
            }

            if(response.errors.phone_number)
            {
                setNumberErr(response.errors.phone_number[0]);
            }
            return;
        }
        
        context.setAuthorization(response.response.original.access_token);
        context.setID(response.response.original.id);
        context.setToken(true);
    }

    return ( 
    <ScrollView keyboardDismissMode="interactive">
        <SignUpContainer>
            <Logo />
            <ErrText>{fnameErr}</ErrText>
            <SignUpInput inputAccessoryViewId placeholder="First name" 
            onChangeText = { value => {
                setFname(value);
                setFnameErr("");
            }}
            value={fname}
            />
            <ErrText>{lnameErr}</ErrText>
            <SignUpInput inputAccessoryViewId placeholder="Last name"
            onChangeText = { value => {
                setLname(value);
                setLnameErr("");
            }}
            value={lname}
            />            
            <ErrText>{usernameErr}</ErrText>
            <SignUpInput inputAccessoryViewId placeholder="Username"
            onChangeText = { value => {
                setUsername(value);
                setUsernameErr(""); 
               }}
               value = {username}
            />
            <ErrText>{numberErr}</ErrText>
            <SignUpInput
            inputAccessoryViewId
            keyboardType="phone-pad"
            placeholder="Phone number"
            value={number}
            onChangeText = { value => {
                setNumber(value);
                setNumberErr("");
            }}
            />
            <ErrText>{passwordErr}</ErrText>
            <SignUpInput secureTextEntry={true} placeholder="Password"
            inputAccessoryViewId
            value={password}
            onChangeText = { value => {
                setPassword(value);
                setPasswordErr("");
            }}
            />
            <SignUpButton
            onPress={handleSignIn}
            >
                <SignUpButtonText>
                    Sign Up
                </SignUpButtonText>
            </SignUpButton>
        </SignUpContainer>
    </ScrollView>
     );
}
 
export default SignUp;