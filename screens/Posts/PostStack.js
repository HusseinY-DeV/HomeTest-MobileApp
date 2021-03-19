import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from "./Posts";
import EachPost from './EachPost';


const Stack = createStackNavigator();


const PostStack = () => {
    return ( 
        <Stack.Navigator
        screenOptions={{
            headerTitleAlign : "center",
        }}
        >
            <Stack.Screen name="Posts"
            options={{title : "Health Posts"}}
            >
                {props => <Posts {...props} /> }
            </Stack.Screen>
            <Stack.Screen name="EachPost"
                    options={({ route }) => ({ title: route.params.title })}
            >
                {props => <EachPost {...props} /> }
            </Stack.Screen>
        </Stack.Navigator>
     );
}
 
export default PostStack;