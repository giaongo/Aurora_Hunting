import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Avatar} from 'react-native-paper';
import Upload from '../views/Upload';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Comment from '../views/Comment';
import HomeScreen from '../views/Home';
import Login from '../views/Login';
import {MainContext} from '../contexts/MainContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1c211e',
          borderTopColor: '#8aac73',
          borderTopWidth: 3,
        },
        tabBarActiveTintColor: '#b3d56c',
        headerShown: false,
        tabBarLabelStyle: {
          marginBottom: 3,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Avatar.Icon
              size={35}
              icon="home"
              color={color}
              backgroundColor="transparent"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: () => (
            <Avatar.Image
              style={{
                position: 'relative',
                bottom: 25,
                borderRadius: 68,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../assets/aurora_bottom.png')}
              backgroundColor="transparent"
              size={100}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Avatar.Icon
              size={35}
              icon="account"
              color={color}
              backgroundColor="transparent"
            />
          ),
        }}
      />
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
          <Stack.Screen name="Aurora Hunting" component={TabScreen} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Single" component={Single} />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        ></Stack.Screen>
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

export default Navigator;
