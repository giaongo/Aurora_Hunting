import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Home = () => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  return (
    <View>
      <Text>Home</Text>
      <Button
        icon="logout"
        mode="contained"
        buttonColor="#A5C132"
        onPress={async () => {
          console.log('Loggin out!');
          setUser({});
          setIsLoggedIn(false);
          try {
            await AsyncStorage.clear();
          } catch (error) {
            console.error('clearing asyncstorage failed', error);
          }
        }}
      >
        Log out!
      </Button>
    </View>
  );
};

export default Home;
