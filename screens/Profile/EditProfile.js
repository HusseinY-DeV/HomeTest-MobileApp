import React , {useState} from "react";
import styled from "styled-components";
import {Button} from "react-native";
import { updateNumber,updatePassword } from "./api";
import { useContext } from "react";
import { UserContext } from "../../components/UserContext";
import { ScrollView } from "react-native-gesture-handler";
import Logo from "../../Logo";


const EditProfileContainer = styled.View`

    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 18px;

`;

const SuccessText = styled.Text`
    color: whitesmoke;
    margin-top: 10px;
    background-color: green;
    opacity : ${({show}) => show ? "1" : "0"};
    font-weight: bold;
    font-size: 16px;
    padding: 10px;
    text-align: center;
`;

const ErrText = styled.Text`
    color: crimson;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
    font-size: 15px;
    text-align: center;
`;


const UpdateInput = styled.TextInput`  

    background-color: #eee;
    color: #3a3a3a;
    width: 75%;
    font-size: 16px;
    padding: 12px;
    border-radius: 5px;
    margin: 10px auto 35px auto;
    border-bottom-color: #43f92f;
    border-bottom-width: 2px;

`;




const EditProfile = ({navigation}) => {

    const context = useContext(UserContext);

    const [success,setSuccess] = useState("");
    const [show,setShow] = useState(false);

    const [newPassword,setNewPassword] = useState("");
    const [newPasswordErr,setNewPasswordErr] = useState("");

    const [number,setNumber] = useState("");
    const [numberErr,setNumberErr] = useState("");

    const [render,setRender] = useState(false);

    const handleUpdateNumber = async () => {

        const response = await updateNumber(context.ID,number,context.authorization);

        if(response.status == "fail")
        {
            setNumberErr(response.response);
            return;
        }

        if(response.status == "success")
        {
            setShow(true);
            setRender(!render);
            setSuccess(response.response);
            context.setRender(!context.render);
            setNumber("");
            setTimeout(() => {
                setSuccess("");
                setShow(false);
                navigation.navigate("Profile");
            },2500);
        }
    }

    const handleUpdatePassword = async () => {

        const response = await updatePassword(context.ID,newPassword,context.authorization);

        if(response.errors)
        {
            if(response.errors.password)
            {
                setNewPasswordErr(response.errors.password[0]);
            }

            return;
        }

        if(response.status == "success")
        {
            setShow(true);
            setSuccess(response.response);
            context.setRender(!context.render);
            setTimeout(() => {
                setSuccess("");
                setNewPassword("");
                setShow(false)
            },2500)
        }
    }

    return (
        <ScrollView keyboardDismissMode="interactive"> 
            <EditProfileContainer>
            <Logo />
            <SuccessText show={show}>{success}</SuccessText>
            <ErrText>{numberErr}</ErrText>
            <UpdateInput  placeholder="New phone number"
                onChangeText = { value => {
                    setNumber(value);
                    setNumberErr("");
                }}
                keyboardType="phone-pad"
                value={number}
                />


            <Button title="Update Phone number" 
               onPress={handleUpdateNumber} 
            />

            <ErrText>{newPasswordErr}</ErrText>
            <UpdateInput secureTextEntry={true} placeholder="New Password"
                onChangeText = { value => {
                    setNewPassword(value);
                    setNewPasswordErr("");
                }}
                value={newPassword}
                />

            <Button title="Change password" 
            onPress={handleUpdatePassword}
            />

        </EditProfileContainer>
    </ScrollView>
     );
}
 
export default EditProfile;