import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tests from "./Tests";
import LocationForm from './LocationForm';
import Bookings from './Bookings';



const Stack = createStackNavigator();




const TestStack = () => {
    return ( 
        <Stack.Navigator>
            <Stack.Screen name="Tests"
            options={{title: "Tests",headerTitleAlign:"center"}}
            >
                {props => <Tests {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Location"
            options={{title: "Location Form",headerTitleAlign:"center"}}
            >
                {props => <LocationForm {...props} />}
            </Stack.Screen>

            <Stack.Screen name="Bookings"
            options={{title: "My Bookings",headerTitleAlign:"center"}}
            >
                {props => <Bookings {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
     );
}
 
export default TestStack;