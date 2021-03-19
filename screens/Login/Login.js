import React, {useState,useEffect,useContext} from "react";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { UserContext } from "../../components/UserContext";
import Logo from '../../Logo';
import {patientLogin} from "./api";



const LoginContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 100px;
`;

const LoginInput = styled.TextInput`  
    background-color: #eee;
    color: #3a3a3a;
    width: 75%;
    font-size: 16px;
    padding: 15px;
    z-index: 2;
    border-radius: 5px;
    margin: 15px;
    border-bottom-color: #43f92f;
    border-bottom-width: 2px;
`;

const SignUpLink = styled.Text`
font-size: 17px;
font-weight: bold;
color: #bbb;
padding: 10px;
width: 200px;
text-align:center;
margin-top: 30px;
`;

const LoginButton = styled.TouchableOpacity`
    margin-top: 20px;
    background-color : #43f92f;
    width: 30%;
    padding: 10px;
    border-radius: 5px;
`;

const LoginButtonText = styled.Text`
    color : whitesmoke;
    font-weight: bold;
    font-size: 18px;
    text-align:center;
`;

const ErrText = styled.Text`
    color: crimson;
    margin-top: 10px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
`;


const Login = ({navigation}) => {

    const context = useContext(UserContext);

    const [username,setUsername] = useState("Huzzdev");
    const [password,setPassword] = useState("123456789");

    const [err,setErr] = useState("");
    
    const handleLogin = async () => {
        const response = await patientLogin(username,password);
        if(response.status == "fail")
        {
            setErr(response.response);  
            return; 
        }

        context.setID(response.response.original.id);
        context.setAuthorization(response.response.original.access_token);
        context.setToken(true);
    }

    const handleLinkClick = () => {
        navigation.navigate("signup")
    }

    return ( 
    <ScrollView keyboardDismissMode="interactive">
        <LoginContainer>
            <Logo />
            <ErrText>{err}</ErrText>
            <LoginInput placeholder="Username" editable autoCompleteType="username"
            onChangeText={ value => {
                setUsername(value);
                setErr("");
            } }
            value={username}
            />
            <LoginInput secureTextEntry={true} placeholder="Password"
            onChangeText = { value => {
                setPassword(value);
                setErr("");
            }}
            value={password}
            />
            <LoginButton onPress= {handleLogin}>
                <LoginButtonText
                >Log In</LoginButtonText>
            </LoginButton>
            <SignUpLink
            onPress={handleLinkClick}
            >Create an account</SignUpLink>
        </LoginContainer>
    </ScrollView>
     );
}
 
export default Login;