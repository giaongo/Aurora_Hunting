import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import Home from '../views/Home';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useContext} from 'react';
// import {MainContext} from '../contexts/MainContext';
import Login from '../views/Login';
import Single from '../views/Single';
// import Single from '../views/Single';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

// const Stack = createNativeStackNavigator();

// const StackScreen = () => {
//   const {isLoggedIn} = useContext(MainContext);
//   return (
//     <Stack.Navigator>
//       {isLoggedIn ? (
//         <>{<Stack.Screen name="Single" component={Single} />}</>
//       ) : (
//         <Stack.Screen name="Login" component={Login}></Stack.Screen>
//       )}
//     </Stack.Navigator>
//   );
// };

// const Navigator = () => {
//   return (
//     <NavigationContainer>
//       <StackScreen />
//     </NavigationContainer>
//   );
// };

export default Navigator;
