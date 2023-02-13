import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {useUser} from '../hooks/ApiHooks';

const RegisterForm = (props) => {
  const {postUser, checkUsername} = useUser();
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const register = async (registerData) => {
    delete registerData.confirmPassword;
    console.log('Registering', registerData);
    try {
      if (!checkUser) return;
      const registerResult = await postUser(registerData);
      console.log('registration result', registerResult);
    } catch (error) {
      console.error('register', error);
    }
  };

  const checkUser = async (username) => {
    try {
      const userAvailable = await checkUsername(username);
      console.log('checkUser', userAvailable);
      return userAvailable || 'Username is already taken';
    } catch (error) {
      console.error('checkUser', error.message);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {value: 3, message: 'Must be at least 3 chars'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.form}
              mode="outlined"
              placeholder="Full name"
              placeholderTextColor={'grey'}
              textColor="Black"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              autoCapitalize="words"
              errorMessage={errors.full_name && errors.full_name.message}
            />
            {errors.full_name && errors.full_name.message ? (
              <HelperText type="error" visible={true} style={styles.errorText}>
                {errors.full_name.message}
              </HelperText>
            ) : null}
          </>
        )}
        name="full_name"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 3,
            message: 'Username min length is 3 characters.',
          },
          validate: checkUser,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.form}
              mode="outlined"
              placeholder="Username"
              placeholderTextColor={'grey'}
              textColor="Black"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
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
        rules={{
          required: {value: true, message: 'Email is required.'},
          pattern: {
            value: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/u,
            message: 'Must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.form}
              mode="outlined"
              placeholder="Email"
              placeholderTextColor={'grey'}
              textColor="Black"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              errorMessage={errors.email && errors.email.message}
            />
            {errors.email && errors.email.message ? (
              <HelperText type="error" visible={true} style={styles.errorText}>
                {errors.email.message}
              </HelperText>
            ) : null}
          </>
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Min 5 characters, needs 1 number, 1 uppercase letter.',
          },
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message:
              'Min 5 characters, needs one number, one uppercase letter.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.form}
              mode="outlined"
              placeholder="Password"
              placeholderTextColor={'grey'}
              textColor="Black"
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

      <Controller
        control={control}
        rules={{
          validate: (value) => {
            if (value === getValues('password')) {
              return true;
            } else {
              return 'password must match';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={styles.form}
              mode="outlined"
              placeholder="Confirm password"
              placeholderTextColor={'grey'}
              textColor="Black"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              errorMessage={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
            {errors.confirmPassword && errors.confirmPassword.message ? (
              <HelperText type="error" visible={true} style={styles.errorText}>
                {errors.confirmPassword.message}
              </HelperText>
            ) : null}
          </>
        )}
        name="confirmPassword"
      />

      <Button
        icon="account-plus"
        mode="contained"
        buttonColor="#A5C132"
        style={styles.button}
        onPress={handleSubmit(register)}
      >
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 8,
    marginHorizontal: 60,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 60,
    margin: 10,
    marginVertical: 18,
    cursor: 'pointer',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
});

export default RegisterForm;
