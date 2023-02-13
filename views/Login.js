import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import SwitchSelector from 'react-native-switch-selector';
import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import {useUser} from '../hooks/ApiHooks';
import {useHeaderHeight} from '@react-navigation/elements';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleForm, setToggleForm] = useState(true);
  const options = [
    {label: 'Log in', value: 'login'},
    {label: 'Register', value: 'register'},
  ];
  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken === null) return;
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      console.log('checkToken', error);
    }
  };

  const height = useHeaderHeight();

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={height + 47}
          style={{flex: 1}}
          enabled
        >
          <View>
            <Image
              source={require('../assets/logo.png')}
              style={styles.imageContainer}
            />
          </View>
          <View>
            <SwitchSelector
              style={styles.switchButton}
              options={options}
              initial={0}
              buttonColor={'#A5C132'}
              backgroundColor={'#D4EB7A'}
              onPress={() => {
                setToggleForm(!toggleForm);
              }}
            />
          </View>
          {toggleForm ? <LoginForm /> : <RegisterForm />}
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    margin: 50,
    width: 140,
    height: 190,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  switchButton: {
    marginHorizontal: 60,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
