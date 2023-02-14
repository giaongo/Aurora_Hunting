import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Avatar, Button, Divider, IconButton, TextInput} from 'react-native-paper';
import Imagebackground from '../components/Imagebackground';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useMedia, useTag, useUser } from '../hooks/ApiHooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { uploadsUrl } from '../utils/variables';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';

const EditProfile = ({route}) => {
  const {user, userPassword, setUserPassword, update, setUpdate} = useContext(MainContext);
  const {control, formState:{errors}, handleSubmit, reset, trigger} = useForm({mode:'onBlur'});
  const {getFilesByTag} = useTag();
  const {getUserByToken, putUser, checkUsername} = useUser();
  const {postMedia} = useMedia();

  const userInfo = route.params;
  const [userAvatar, setUserAvatar] = useState('');
  const [userNewUsername, setUserNewUsername] = useState(user.username);
  const [userNewEmail, setUserNewEmail] = useState(user.email);
  const navigation = useNavigation();

  const loadAvatar = async() => {
    try {
      const tag = 'avatar_' + user.user_id;
      const files = await getFilesByTag(tag);
      setUserAvatar(files?.pop().filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    }
  }


  const modifyUserInfo = async() => {
    try {
      Alert.alert('Update', 'user information?', [
        {text:'Cancel'},
        {
          text:'Yes',
          onPress: async() => {
            const userInfo = {
              username: userNewUsername,
              email: userNewEmail,
            }

            const token = await AsyncStorage.getItem('userToken');
            if (await checkUsername(userInfo.username)  === false ){
              Alert.alert('Username is taken');
            }
            else {
              const result =  await putUser(token, userInfo);
              result ?
              Alert.alert('Update user information successfully') :
              Alert.alert('There is something wrong')
            }
            setUpdate(!update);
            navigation.navigate('Profile', update)
          },
        },
      ]);
    } catch (error) {
      console.error('modifyUserInfo: ', error);
    }
  }

  const pickAvatar = async() => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect: [4,3],
        quality:0.5
      });
      if (!result.canceled){
        trigger();
      }
      console.log(result.assets[0].uri)
      setUserAvatar(result.assets[0].uri);

    } catch (error) {
      console.error('pickAvatar, ', error)
    }
  }

  // const postAvatar = async(avatarData) => {
  //     const tag = 'avatar_' + user.user_id;
  //     const mediaFilename = avatarData.assets[0].uri.split('/').pop();
  //     const formData = new FormData();
  //     formData.append('file',{
  //       uri: mediaFilename,
  //       name: tag
  //     })

  //     const avatarUploadResult = await postMedia(formData, token);

  //     console.log(avatarUploadResult)
  // }

  useEffect(() => {
    loadAvatar();
  },[])

  return (
    <ScrollView style={styles.container}>
      <Imagebackground />
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={{
            uri: userAvatar.includes('file') ?  userAvatar :
            !userAvatar.includes('file') ?
            uploadsUrl + userAvatar :
            'https://placedog.net/500'
        }}
          size={150}
        />
      </View>
      <View style={styles.buttonCancelContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Profile')}
          buttonColor={'#6adc99'}
        >
          Cancel
        </Button>
      </View>
      <View style={styles.buttonDoneContainer}>
        <Button
          mode="contained"
          onPress={modifyUserInfo}
          buttonColor={'#6adc99'}
        >
          Done
        </Button>
      </View>
      <View style={styles.buttonEditProfileContainer}>
        <Button
          mode="contained"
          onPress={pickAvatar}
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
              placeholder={'username'}
              style={{width: '100%', justifyContent:'center'}}
              numberOfLines={1}
              defaultValue={userInfo.username}
              onChangeText={newUsername => setUserNewUsername(newUsername)}
            />
          </View>
          <Divider />
          <View style={styles.inputContainer}>
            <IconButton icon={'email'} size={50} />
            <TextInput
              mode="flat"
              placeholder={'email'}
              style={{width: '100%', justifyContent:'center'}}
              numberOfLines={1}
              defaultValue={userInfo.Email}
              onChangeText={newEmail => setUserNewEmail(newEmail)}
            />
          </View>
          <Divider />
          {/* <View style={styles.inputContainer}>
            <IconButton icon={'lock'} size={50} />
            <TextInput
              mode="flat"
              placeholder={'password'}
              secureTextEntry={true}
              style={{width: '100%', justifyContent:'center'}}
              numberOfLines={1}
              defaultValue={userPassword}
              onChangeText={newPassword => setUserPassword(newPassword)}
            />
          </View> */}
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
  avatarContainer:{
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 45,
  },
  buttonDoneContainer: {
    position: 'absolute',
    left: 0,
    right: 10,
    alignItems:  'flex-end',
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

EditProfile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default EditProfile;
