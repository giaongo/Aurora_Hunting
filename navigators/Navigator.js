import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Avatar} from 'react-native-paper';
import Home from '../views/Home';
import Upload from '../views/Upload';
import Profile from '../views/Profile';
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
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Avatar.Icon
              size={40}
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
          tabBarIcon: () => (
            <Avatar.Image
              style={{
                position: 'relative',
                bottom: 20,
                borderRadius: 68,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../assets/aurora_bottom.png')}
              backgroundColor="transparent"
              size={90}
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
              size={40}
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
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {backgroundColor: 'tomato'},
      }}
    >
      <Stack.Screen name="Aurora Hunting" component={TabScreen} />
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
