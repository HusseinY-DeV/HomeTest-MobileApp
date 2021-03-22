import React , {useEffect,useState} from 'react';
import { useContext } from 'react';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from "styled-components";
import { UserContext } from '../../components/UserContext';
import { getBlog } from "./api";



const EachPostContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items:center;
    padding: 10px;
`;

const Content = styled.Text`
    font-size: 18px;
    margin: 10px 0px;;
    line-height: 30px;
    font-weight: bold;
    color: #3a3a3a;
    background-color: #dddd;
    padding: 10px;
    border-radius: 6px;
`;

const Date = styled.Text`
    font-size: 15px;
    color: #bbb;
    padding: 10px;
`;

const Loader = styled.Text`
    flex: 1;
    text-align:center;
    font-size: 30px;
    margin-top: 200px;
    align-items:center;
    justify-content: center;
    color : #bbbb;
`;



const EachPost = ({route}) => {


    const context = useContext(UserContext);
    const src = "http://192.168.1.71:8000/storage";

    const [loading,setLoading] = useState(true);
    const [post,setPost] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await getBlog(context.authorization,route.params.id);
            setPost({...response.response});
            setLoading(false);
        };
        fetchData();
    }, []);

    return ( 
        <ScrollView>
            {loading ? (
                <Loader> Loading... </Loader>
            ) : (     <EachPostContainer>
                <Image source={{uri: `${src}/${post.image}`, height: 350,width: 350}} />
                <Content>{post.description}</Content>
                <Date>Date posted : {post.posted_date}</Date>
            </EachPostContainer>)
            }
        </ScrollView>
     );
}
 
export default EachPost;