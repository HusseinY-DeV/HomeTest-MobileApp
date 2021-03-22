// In App.js in a new project
import React , {useContext} from 'react';
import { Feather } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login/Login';
import SignUp from './screens/Signin/SignUp';
import UserContextContainer, { UserContext } from "./components/UserContext";
import PostStack from './screens/Posts/PostStack';
import ProfileStack from './screens/Profile/ProfileStack';
import TestStack from './screens/Tests/TestStack';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AuthStack = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen name="login"
                options={{
                  headerTitleAlign : 'center',
                  title: 'HomeTest Login',
                  headerStyle: {
                    backgroundColor: 'green',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
        >
          {props => <Login  {...props} />}
        </Stack.Screen>
        <Stack.Screen name="signup"
                options={{
                  headerTitleAlign : 'center',
                  title: 'HomeTest Sign Up',
                  headerStyle: {
                    backgroundColor: 'green',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
        >
          {props => <SignUp {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
  )

}


const Tabs = () => {
  
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {

        if (route.name === 'Posts') {
          return(
            <>
            {focused ? <MaterialCommunityIcons name="post" size={24} color="green" /> :  <MaterialCommunityIcons name="post" size={20} color="black" /> }
            </>
          )

        } else if (route.name === 'Profile') {
          return(
            <>
            {focused ? <Feather name="user" size={24} color='green'/> :  <Feather name="user" size={20} color='black'/>  }
            </>
          )
        } else if (route.name === 'Tests') {
          return(
            <>
            {focused ? <Fontisto name="blood-test" size={22} color='green'/> :  <Fontisto name="blood-test" size={18} color='black'/>  }
            </>
          )
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'green',
      inactiveTintColor: '#3a3a3a',
    }}
    >
      <Tab.Screen name="Profile"
          options ={{title : "My Profile"}}
      >
        {props => <ProfileStack {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Posts">
        {props => <PostStack {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Tests">
        {props => <TestStack {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}



const App = () => {
  

 const context = useContext(UserContext);

  return (
      <NavigationContainer>
        {context.token ?  <Tabs /> : <AuthStack />}
      </NavigationContainer>
  )

}


const Entry = () => {
  return (
    <UserContextContainer>
      <App />
    </UserContextContainer>
  )
}

export default Entry;
 
