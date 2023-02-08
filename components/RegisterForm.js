import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
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
        rules={{minLength: {value: 3, message: 'must be at least 3 chars'}}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.form}
            mode="outlined"
            placeholder="Full name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            autoCapitalize="words"
            errorMessage={errors.full_name && errors.full_name.message}
          />
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
          <TextInput
            style={styles.form}
            mode="outlined"
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'email is required'},
          pattern: {
            value: /^[a-z0-9.-]{1,64}@[a-z0-9.-]{3,64}/u,
            message: 'Must be a valid email',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.form}
            mode="outlined"
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'min 5 characters, needs one number, one uppercase letter',
          },
          pattern: {
            value: /(?=.*\p{Lu})(?=.*[0-9]).{5,}/u,
            message: 'min 5 characters, needs one number, one uppercase letter',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.form}
            mode="outlined"
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={errors.password && errors.password.message}
          />
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
          <TextInput
            style={styles.form}
            mode="outlined"
            placeholder="Confirm password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            errorMessage={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
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
  },
  card: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RegisterForm;
