import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import EditProfile from './EditProfile';



const Stack = createStackNavigator();




const ProfileStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen name="Profile"
            options={{title: "My Profile",
                    headerTitleAlign : "center",
                    animationEnabled : true
        }}
            >
               {props =>  <Profile {...props} /> }
            </Stack.Screen>

            <Stack.Screen name="EditProfile"
            options={{title: "Edit My Profile",
                    headerTitleAlign : "center",
        }}
            >
               {props =>  <EditProfile {...props} /> }
            </Stack.Screen>

        </Stack.Navigator>
     );
}
 
export default ProfileStack;