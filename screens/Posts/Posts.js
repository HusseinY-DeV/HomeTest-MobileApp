import React , {useEffect,useState} from 'react';
import { useContext } from 'react';
import { Image, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { UserContext } from '../../components/UserContext';
import { getBlogs } from "./api";


const PostsContainer = styled.View`
    flex: 1;
    align-items:center;
    justify-content: center;
    margin: auto;
    padding: 10px;
    width: 100%;
`;

const Post = styled.View`
  min-height: 250px;
`;

const Title = styled.Text`
    
    font-size: 18px;
    color: whitesmoke;
    padding: 10px;
    background-color: #4c73ff;
    margin: 20px;
    border-radius: 5px;
    text-align: center;

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



const Posts = ({navigation,route}) => {

    const context = useContext(UserContext);
    const src = "http://192.168.1.68:8000/storage"
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(true);

    const handleTitlePress = (id,title) => {
        navigation.navigate("EachPost",{
            id,title
        });
    }

    useEffect(() => {
        
        (async () => {
            const response = await getBlogs(context.authorization);
            setPosts([...response.response]);
            setLoading(false);
        })();

        
    }, []);

    return ( 
            <PostsContainer>
                {loading ? <Loader> Loading... </Loader> : 
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={posts}
                    renderItem={({ item }) =>
                        (
                        <Post>
                            <Title
                            onPress={() => {
                                handleTitlePress(item.id,item.title);
                            }}
                            >Title : {item.title}</Title>
                            <Image source={{ 
                                uri: `${src}/${item.image}`,
                                height : 340,
                                width : 340
                             }} /> 
                        </Post>
               )
        }
        />}
            </PostsContainer>
     );
}
 
export default Posts;