import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {Button, Divider, IconButton, TextInput} from 'react-native-paper';
import AvatarImage from '../components/Avatar';
import Imagebackground from '../components/Imagebackground';

const EditProfile = () => {
  return (
    <ScrollView style={styles.container}>
      <Imagebackground />
      <AvatarImage />
      <View style={styles.buttonCancelContainer}>
        <Button
          mode="contained"
          onPress={() => console.log('Cancel')}
          dark={true}
          buttonColor={'#6adc99'}
        >
          Cancel
        </Button>
      </View>
      <View style={styles.buttonDoneContainer}>
        <Button
          mode="contained"
          onPress={() => console.log('Done')}
          dark={true}
          buttonColor={'#6adc99'}
        >
          Done
        </Button>
      </View>
      <View style={styles.buttonEditProfileContainer}>
        <Button
          mode="contained"
          onPress={() => console.log('pick avatar')}
          dark={true}
          buttonColor={'#6adc99'}
        >
          Pick avatar
        </Button>
        <Button
          mode="contained"
          onPress={() => console.log('pick wall paper')}
          dark={true}
          buttonColor={'#6adc99'}
        >
          Pick WallPaper
        </Button>
      </View>
      <Divider />
      <TouchableOpacity
        style={{flex: 1}}
        onPress={Keyboard.dismiss}
        activeOpacity={1}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.inputContainer}>
            <IconButton icon={'account'} size={50} />
            <TextInput
              mode="flat"
              label={'username'}
              placeholder={'username'}
              style={{width: '100%'}}
              numberOfLines={1}
            />
          </View>
          <Divider />
          <View style={styles.inputContainer}>
            <IconButton icon={'email'} size={50} />
            <TextInput
              mode="flat"
              label={'email'}
              placeholder={'email'}
              style={{width: '100%'}}
              numberOfLines={1}
            />
          </View>
          <Divider />
          <View style={styles.inputContainer}>
            <IconButton icon={'phone'} size={50} />
            <TextInput
              mode="flat"
              label={'phone number'}
              placeholder={'phone number'}
              style={{width: '100%'}}
              numberOfLines={1}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  buttonDoneContainer: {
    position: 'absolute',
    left: 0,
    right: 10,
    alignItems: 'flex-end',
    top: 50,
  },
  buttonCancelContainer: {
    position: 'absolute',
    left: 10,
    right: 0,
    alignItems: 'flex-start',
    top: 50,
  },
  buttonEditProfileContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 275,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputContainer: {
    flexDirection: 'row',
  },
});
export default EditProfile;
