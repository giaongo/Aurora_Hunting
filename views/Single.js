import React, {useContext, useEffect, useState} from 'react';
import {IconButton, Text, Button} from 'react-native-paper';
import {StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {ImageBackground} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRating, useUser} from '../hooks/ApiHooks';
import CardIconButton from '../components/CardIconButton';
import StarRating from '../components/StarRating';
import {MainContext} from '../contexts/MainContext';
const Single = ({route, navigation}) => {
  const {
    file_id: fileId,
    filename,
    media_type: type,
    time_added: time,
    title,
    description,
    user_id: userId,
  } = route.params;
  const [postUser, setPostUser] = useState({});
  const {getUserById} = useUser();
  const {loadRatingsByFileId} = useRating();
  const {user} = useContext(MainContext);
  const [userRating, setUserRating] = useState(null);
  const {update} = useContext(MainContext);
  const getPostUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await getUserById(userId, userToken);
      setPostUser(user);
    } catch (error) {
      console.error('getPostUserError', error);
    }
  };

  const getUserRating = async () => {
    try {
      const result = await loadRatingsByFileId(fileId);

      const userRatingValue = result.filter(
        (rating) => rating.user_id === user.user_id
      );
      userRatingValue.length
        ? setUserRating(userRatingValue[0].rating)
        : setUserRating(0);
    } catch (error) {
      console.error('getUserRatingError', error);
    }
  };
  const allData = JSON.parse(description);
  const descriptionData = allData.description;
  const locationTagsData = allData.tags;

  useEffect(() => {
    getPostUser();
  }, []);

  useEffect(() => {
    getUserRating();
  }, [update]);

  return (
    <ScrollView style={styles.backgroundContainer}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: uploadsUrl + filename}}
        style={styles.imageContainer}
        imageStyle={{borderBottomLeftRadius: 45, borderBottomRightRadius: 45}}
      >
        <View style={styles.titleBanner}>
          <Text style={styles.titleText} variant="titleLarge">
            {title}
          </Text>
          <Text variant="titleMedium">by {postUser.username}</Text>
        </View>
      </ImageBackground>
      <CardIconButton dataId={fileId} navigation={navigation} />
      <View style={{marginLeft: 8}}>
        <Text>Description:</Text>
        <Text>{descriptionData}</Text>
        {userRating !== null ? (
          <StarRating initialRating={userRating} fileId={fileId} />
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: '#121212',
  },
  imageContainer: {
    height: 400,
    justifyContent: 'flex-end',
  },
  titleBanner: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
});

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};
export default Single;
