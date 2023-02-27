import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, ImageBackground} from 'react-native';
import {Text, Button, Avatar} from 'react-native-paper';
import {MainContext} from '../contexts/MainContext';
import {
  useComment,
  useFavourite,
  useMedia,
  useTag,
  useUser,
} from '../hooks/ApiHooks';
import {appId, uploadsUrl} from '../utils/variables';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import PostItem from '../components/PostItem';

const Profile = () => {
  const {setUser, setIsLoggedIn, user, update} = useContext(MainContext);
  const {getFilesByTag, getAllTagsByFileId} = useTag();
  const {getMediaByUserId} = useMedia();
  const {getComments} = useComment();
  const {getFavourite} = useFavourite();
  const {getUserByToken} = useUser();

  const [userAvatar, setUserAvatar] = useState('');
  const [userWallPaper, setUserWallPaper] = useState('');
  const [username, setUsername] = useState(user.username);
  const [commentsByUser, setCommentsByUser] = useState([]);
  const [favouritesByUser, setFavouritesByUser] = useState([]);
  const [mediaArray, setMediaArray] = useState([]);
  const navigation = useNavigation();

  const loadAvatar = async () => {
    try {
      const tag = 'avatar_' + user.user_id;
      const files = await getFilesByTag(tag);
      setUserAvatar(files?.pop()?.filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    }
  };

  const loadWallPaper = async () => {
    try {
      const tag = 'wallpaper_' + user.user_id;
      const files = await getFilesByTag(tag);
      setUserWallPaper(files?.pop()?.filename);
    } catch (error) {
      console.error('loadWallPaper: ', error);
    }
  };

  const loadUsername = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await getUserByToken(token);
      setUsername(result.username);
    } catch (error) {
      console.error('loadUsername: ', error);
    }
  };

  const loadUserMediaFiles = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userAllFiles = await getMediaByUserId(token, user.user_id);
      const userFilteredFiles = userAllFiles.map((item) => item.file_id);
      const media = await Promise.all(
        userFilteredFiles.map(async (item) => {
          return await getAllTagsByFileId(item);
        })
      );
      setMediaArray(media);
    } catch (error) {
      console.error('loadUserMediaFiles: ', error);
    }
  };

  const loadCommentsPostedByUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const commentsPostedByUser = await getComments(token);
      setCommentsByUser(commentsPostedByUser);
    } catch (error) {
      console.error('loadCommentsPostedByUser: ', error);
    }
  };

  const loadFavouritesByUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const favourites = await getFavourite(token);
      setFavouritesByUser(favourites);
    } catch (error) {
      console.error('loadCommentsPostedByUser: ', error);
    }
  };

  useEffect(() => {
    loadAvatar();
    loadWallPaper();
    loadUsername();
    loadUserMediaFiles();
    loadCommentsPostedByUser();
    loadFavouritesByUser();
  }, [update]);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{
          uri: userWallPaper
            ? uploadsUrl + userWallPaper
            : 'https://placedog.net/500/280',
        }}
        resizeMethod={'auto'}
        style={styles.backgroundImg}
      />
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={{
            uri: userAvatar
              ? uploadsUrl + userAvatar
              : 'https://placedog.net/500',
          }}
          size={135}
        />
      </View>

      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{username}</Text>
      </View>
      <View style={styles.statisticsContainer}>
        <View style={styles.statisticsColumn}>
          <Text style={styles.statisticsNumber}>{favouritesByUser.length}</Text>
          <Text style={styles.statisticsContent}>Favourites</Text>
        </View>
        <View style={styles.statisticsColumn}>
          <Text style={styles.statisticsNumber}>{commentsByUser.length}</Text>
          <Text style={styles.statisticsContent}>Comments</Text>
        </View>
        <View style={styles.statisticsColumn}>
          <Text style={styles.statisticsNumber}>
            {
              mediaArray.filter((item) => {
                if (item[0]?.tag.includes(appId)) {
                  return item;
                }
              }).length
            }
          </Text>
          <Text style={styles.statisticsContent}>Posts</Text>
        </View>
      </View>
      <View style={styles.buttonEditProfileContainer}>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('EditProfile', {
              username: username,
              Email: user.email,
            })
          }
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
        {mediaArray.reverse().map((file) => {
          if (file[0]?.tag.includes(appId)) {
            return <PostItem key={file[0].file_id} data={file[0]} />;
          }
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
  backgroundImg: {
    width: '100%',
    height: 350,
    opacity: 0.5,
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
  avatarContainer: {
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
