import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {MainContext} from '../contexts/MainContext';
import {useAuthentication} from '../hooks/ApiHooks';

const LoginForm = () => {
  const {setIsLoggedIn, setUser, setUserPassword, userPassword} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', password: ''},
  });


  const LogIn = async (loginData) => {
    console.log('Login button pressed', loginData);
    setUserPassword(loginData.password);
    try {
      const loginResult = await postLogin(loginData);
      console.log('logIn', loginResult);
      await AsyncStorage.setItem('userToken', loginResult.token);
      setUser(loginResult.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('logIn failed', error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{required: {value: true, message: 'is required'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.form}
              placeholder="Username"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.username && errors.username.message}
            />
            {errors.username && errors.username.message ? (
              <HelperText type="error" visible={true} style={styles.errorText}>
                {errors.username.message}
              </HelperText>
            ) : null}
          </>
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{required: {value: true, message: 'is required'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.form}
              placeholder="Password"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              errorMessage={errors.password && errors.password.message}
            />
            {errors.password && errors.password.message ? (
              <HelperText type="error" visible={true} style={styles.errorText}>
                {errors.password.message}
              </HelperText>
            ) : null}
          </>
        )}
        name="password"
      />
      <Button
        style={styles.button}
        icon="login"
        mode="contained"
        buttonColor="#A5C132"
        onPress={handleSubmit(LogIn)}
      >
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 60,
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    marginHorizontal: 60,
    marginVertical: 80,
  },
  errorText: {
    textAlign: 'center',
  },
});

export default LoginForm;
