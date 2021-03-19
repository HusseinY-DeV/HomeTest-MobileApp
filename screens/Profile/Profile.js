import React , {useEffect,useState} from 'react';
import styled from "styled-components";
import { getPatient } from "./api";
import Logo from '../../Logo';
import { useContext } from 'react';
import { UserContext } from '../../components/UserContext';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    padding: 5px;
`;

const Content = styled.Text`

    font-size: 18px;
    padding: 10px;
    background-color: lightgreen;
    border-radius: 5px;
    margin: 15px;
    color: black;
    text-align: center;
    width : 300px;
`;

const Greeting = styled.Text`

    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    margin: 15px;
    background-color: #3f3f3f;
    color: whitesmoke;
    text-align: center;
    width : 300px;

`;

const EditProfileBtn = styled.TouchableOpacity`

    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
    background-color: green;
    width : 150px;
    
`;

const EditProfileTxt = styled.Text`
    color: whitesmoke;
    text-align: center;
    font-size: 18px;
`;

const Loader = styled.Text`
    flex: 1;
    text-align:center;
    font-size: 30px;
    align-items:center;
    margin-top: 200px;
    justify-content: center;
    color : #bbbb;
`;

const LogoutBtn = styled.TouchableOpacity`

    font-weight: bold;
    padding: 15px;
    border-radius: 5px;
    margin: 10px;
    background-color: #3f3f3f;
    width : 150px;
    
`;

const LogoutTxt = styled.Text`

    color: white;
    text-align: center;
    font-size: 18px;

`;



const Profile = ({navigation}) => {

    const context = useContext(UserContext);

    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(true);

    
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await getPatient(context.ID,context.authorization);
            console.log(response);
            context.setLocation(response.response[0].location_id);
            setUser([...response.response]);
            setLoading(false);
        })();
    }, [context.render]);


    return ( 
        <ScrollView>
            {!loading ? ( <ProfileContainer>
            <Logo />
            <Greeting>
                Welcome back {user[0].username} !
            </Greeting>
            <Content>
                Name : {user[0].first_name} {user[0].last_name}
            </Content>     
            <Content>
                Tel number : {user[0].phone_number}
            </Content> 
            <Content>
            Location : {context.location ? user[0].location.city + " " + user[0].location.street + " " + user[0].location.building : " Not specified yet!"}    
            </Content>
            <EditProfileBtn
            onPress = {() => {
            navigation.navigate("EditProfile");
            }}
            >
                <EditProfileTxt>
                    Edit Profile
                </EditProfileTxt>
            </EditProfileBtn>  
            <LogoutBtn
            onPress = {() => {
                context.setToken(false);
            }}
            >
                <LogoutTxt>
                    Logout
                </LogoutTxt>
            </LogoutBtn>   
            </ProfileContainer>) : <Loader> Loading... </Loader>}
        </ScrollView>
     );
}
 
export default Profile;