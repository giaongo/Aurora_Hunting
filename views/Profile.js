import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';
import Imagebackground from '../components/Imagebackground';
import {MainContext} from '../contexts/MainContext';
import { useComment, useFavourite, useMedia, useTag, useUser } from '../hooks/ApiHooks';
import { uploadsUrl } from '../utils/variables';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';




const Profile = ({data, navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const {getFilesByTag} = useTag();
  const {getMediaByUserId} = useMedia();
  const {getComments} = useComment();
  const {getFavourite} = useFavourite();

  const [userAvatar, setUserAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [userFiles, setUserFiles] = useState([]);
  const [commentsByUser, setCommentsByUser] = useState([]);
  const [favouritesByUser, setFavouritesByUser] = useState([]);



  const loadAvatar = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userInfo = await getUserByToken(token);
      const tag = 'avatar_' + userInfo.user_id;
      const files = await getFilesByTag(tag);
      setUserAvatar(files?.pop().filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    }
  }

  const loadUsername = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userInfo = await getUserByToken(token);
      setUsername(userInfo.username);
    } catch (error) {
      console.error('loadUsername: ', error);
    }
  }

  const loadUserMediaFiles = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userInfo = await getUserByToken(token);
      const userFiles = await getMediaByUserId(token, userInfo.user_id);
      setUserFiles(userFiles);
    } catch (error) {
      console.error('loadUserMediaFiles: ', error)
    }
  }

  const loadCommetsPostedByUser = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const commentsPostedByUser = await getComments(token);
      setCommentsByUser(commentsPostedByUser);
    } catch (error) {
      console.error('loadCommentsPostedByUser: ', error)
    }
  }

  const loadFavouritesByUser = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const favourites = await getFavourite(token);
      setFavouritesByUser(favourites);
    } catch (error) {
      console.error('loadCommentsPostedByUser: ', error)
    }
  }

  useEffect(() => {
    loadAvatar();
    loadUsername();
    loadUserMediaFiles();
    loadCommetsPostedByUser();
    loadFavouritesByUser();
  },[])

  return (
    <ScrollView style={styles.container}>
      <Imagebackground />
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={{uri: userAvatar ? uploadsUrl + userAvatar : 'https://placedog.net/500'}}
          size={135}
        />
      </View>

      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.statisticsContainer}>
          <View style={styles.statisticsColumn} >
            <Text style={styles.statisticsNumber}>{favouritesByUser.length}</Text>
            <Text style={styles.statisticsContent}>Favourites</Text>
          </View>
          <View style={styles.statisticsColumn} >
            <Text style={styles.statisticsNumber}>{commentsByUser.length}</Text>
            <Text style={styles.statisticsContent}>Comments</Text>
          </View>
          <View style={styles.statisticsColumn} >
            <Text style={styles.statisticsNumber}>{userFiles.length}</Text>
            <Text style={styles.statisticsContent}>Posts</Text>
          </View>
    </View>
      <View style={styles.buttonEditProfileContainer}>
        <Button
          mode="contained"
          onPress={() => console.log('Edit Profile')}
          dark={true}
          buttonColor={'#6adc99'}
        >
          Edit Profile
        </Button>
      </View>
      <View style={styles.buttonLogOutContainer}>
        <Button
          mode="contained"
          onPress={async () => {
            console.log('Logging out');
            setUser({});
            setIsLoggedIn(false);
            try {
              await AsyncStorage.clear();
            } catch (error) {
              console.error('clearing asyncstorage failed', error);
            }
          }}
          dark={true}
          buttonColor={'#6adc99'}
        >
          Log out
        </Button>
      </View>
      <View style={styles.gridContainer}>
      {userFiles.map((file) => {
        return (
          <TouchableOpacity
            style={styles.button}
            key={file.id}
            onPress={() => console.log('pressed')}
            >
            <Image
              source={{uri: uploadsUrl + file.filename  || 'https://placedog.net/500'}}
              style={styles.image}
            />
          </TouchableOpacity>
        );
      })}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#212121',
  },
  usernameContainer: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 180,
  },
  username: {
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
  },
  avatarContainer:{
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 45,
  },
  buttonEditProfileContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 275,
  },
  buttonLogOutContainer: {
    position: 'absolute',
    left: 0,
    right: 10,
    alignItems: 'flex-end',
    top: 25,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: '33.3%',
  },
  image: {
    height: 100,
    borderWidth:1,
    backgroundColor:'blue'
  },
  statisticsContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 220,
  },
  statisticsColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  statisticsNumber: {
    fontSize: 20,
    fontWeight: '800',
  },
  statisticsContent: {
    fontSize: 20,
    fontWeight: '800',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};
export default Profile;
