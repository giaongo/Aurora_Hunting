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
import {Avatar, Button, Divider, IconButton, Text, TextInput} from 'react-native-paper';
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
import { ImageBackground } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const EditProfile = ({route}) => {
  const {user, userPassword, setUserPassword, update, setUpdate} = useContext(MainContext);
  const {control, formState:{errors}, handleSubmit, reset, trigger} = useForm({mode:'onBlur'});
  const {getFilesByTag, postTag} = useTag();
  const {getUserByToken, putUser, checkUsername} = useUser();
  const {postMedia} = useMedia();

  const userInfo = route.params;
  const [userAvatar, setUserAvatar] = useState('');
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [avatarChange, setAvatarChange] = useState('');
  const [wallPaperChange, setWallPaperChange] = useState('');
  const [userWallPaper, setUserWallPaper] = useState('');
  const [isWallPaperChanged, setIsWallPaperChanged] = useState(false);
  const [userNewUsername, setUserNewUsername] = useState(user.username);
  const [userNewEmail, setUserNewEmail] = useState(user.email);
  const navigation = useNavigation();

  const testPassword = () => {
    console.log(userPassword);
  }

  const loadAvatar = async() => {
    try {
      const tag = 'avatar_' + user.user_id;
      const files = await getFilesByTag(tag);
      setUserAvatar(files?.pop()?.filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    };
  };

  const loadWallPaper = async() => {
    try {
      const tag = 'wallpaper_' + user.user_id;
      const files = await getFilesByTag(tag);
      setUserWallPaper(files?.pop()?.filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    };
  };

  const editUserUsernameAndEmail = async() => {
    const userInformation = {
      username: userNewUsername,
      email: userNewEmail,
    };
    const token = await AsyncStorage.getItem('userToken');
    if (await checkUsername(userInformation.username)  === false && (userInformation.username != user.username )){
      Alert.alert('Username is taken');
    }
    else {
      const result =  await putUser(token, userInformation);
      result ?
      Alert.alert('Update user information successfully') :
      Alert.alert('There is something wrong')
    };
  };

  const modifyUser = async() => {
    try {
      Alert.alert('Update', 'user information?', [
        {text:'Cancel'},
        {
          text:'Yes',
          onPress: async() => {
            await editUserUsernameAndEmail();
            !avatarChange ? null : await postAvatar();
            !wallPaperChange ? null : await postWallPaper();
            setUpdate(!update);
            navigation.navigate('Profile', update);
          },
        },
      ]);
    } catch (error) {
      console.error('modifyUserInfo: ', error);
    }
  };

  const pickWallPaper = async() => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect: [4,3],
        quality:0.5
      });
      if (!result.canceled){
        setWallPaperChange(result.assets[0]);
        trigger();
        setIsWallPaperChanged(!isWallPaperChanged);
      }
    } catch (error) {
      console.error('pickAvatar, ', error)
    }
  };

  const postWallPaper = async() => {
    const formData = new FormData();
    formData.append('title', userInfo.username + ' wallpaper');
    const mediaFileName = wallPaperChange.uri.split('/').pop();
    let mediaFileExt = mediaFileName.split('.').pop();
    if (mediaFileExt === 'jpg') mediaFileExt = 'jpeg';
    const mimeType = wallPaperChange.type + '/' + mediaFileExt;
    formData.append('file',{
      uri: wallPaperChange.uri,
      name:  mediaFileName,
      type: mimeType
    })
    try {
      const token = await AsyncStorage.getItem('userToken');
      const wallPaperUploadResult = await postMedia(formData, token);
     const fileId = wallPaperUploadResult.file_id;
      const tag = 'wallpaper_' + user.user_id;
      const tagsWallPaperResult = await postTag(fileId, tag, token);
      console.log(tagsWallPaperResult);
      const files = await getFilesByTag(tag);
      setUserWallPaper(files?.pop().filename);
    } catch (error) {
      console.error('postWallPaper', error);
    }
  };


  const pickAvatar = async() => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect: [4,3],
        quality:0.5
      });
      if (!result.canceled){
        setAvatarChange(result.assets[0]);
        trigger();
        setIsAvatarChanged(!isAvatarChanged);
      }
    } catch (error) {
      console.error('pickAvatar, ', error)
    }
  };

  const postAvatar = async() => {
    const formData = new FormData();
    formData.append('title', userInfo.username + ' avatar');
    const mediaFileName = avatarChange.uri.split('/').pop();
    let mediaFileExt = mediaFileName.split('.').pop();
    if (mediaFileExt === 'jpg') mediaFileExt = 'jpeg';
    const mimeType = avatarChange.type + '/' + mediaFileExt;
    formData.append('file',{
      uri: avatarChange.uri,
      name:  mediaFileName,
      type: mimeType
    })
    try {
      const token = await AsyncStorage.getItem('userToken');
      const avatarUploadResult = await postMedia(formData, token);
     const fileId = avatarUploadResult.file_id;
      const tag = 'avatar_' + user.user_id;
      const tagsAvatarResult = await postTag(fileId, tag, token);
      console.log(tagsAvatarResult);
      const files = await getFilesByTag(tag);
      setUserAvatar(files?.pop().filename);
    } catch (error) {
      console.error('postAvatar', error);
    }

  };

  useEffect(() => {
    loadAvatar();
    loadWallPaper();
    testPassword();
  },[update])

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
      source={ isWallPaperChanged ?
        {uri: wallPaperChange ? wallPaperChange.uri : 'https://placedog.net/500/200'} :
        {uri: userWallPaper ? uploadsUrl + userWallPaper : 'https://placedog.net/500'}}
      resizeMethod={'auto'}
      style={styles.backgroundImg}
      />
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={ isAvatarChanged ?
            {uri: avatarChange ? avatarChange.uri : 'https://placedog.net/500'} :
            {uri: userAvatar ? uploadsUrl + userAvatar : 'https://placedog.net/500'}
          }
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
          onPress={modifyUser}
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
          onPress={pickWallPaper}
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
  backgroundImg: {
    width: '100%',
    height: 350,
    opacity: 0.5,
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
