import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useComment, useFavourite, useRating} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardIconButton = ({dataId, navigation}) => {
  const {user, update, setUpdate} = useContext(MainContext);
  const [favouriteArray, setFavouriteArray] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const [commentArray, setCommentArray] = useState([]);

  const [averageRating, setAverageRating] = useState([]);

  const {loadFavouritesByFileId, addFavourite, removeFavourite} =
    useFavourite();
  const {loadCommentsByFileId} = useComment();
  const {loadRatingsByFileId} = useRating();

  const getFavouritesByFileId = async () => {
    try {
      const favourites = await loadFavouritesByFileId(dataId);
      setFavouriteArray(favourites);
      const checkFavourite = favourites.some(
        (favourite) => favourite.user_id === user.user_id
      );
      setIsFavourite(checkFavourite);
    } catch (error) {
      console.error('getFavoritesByFileIdError', error);
    }
  };

  const getCommentsByFileId = async () => {
    try {
      const comments = await loadCommentsByFileId(dataId);
      setCommentArray(comments);
    } catch (error) {
      console.error('getCommentsByFileIdError', error);
    }
  };

  const getRatingsByFileId = async () => {
    try {
      const ratings = await loadRatingsByFileId(dataId);
      const ratingOnlyArray = ratings.map((element) => element.rating);
      setAverageRating(
        ratingOnlyArray.length &&
          ratingOnlyArray.reduce((prev, cur) => prev + cur, 0) /
            ratingOnlyArray.length
      );
    } catch (error) {
      console.error('getRatingsByFileIdError', error);
    }
  };

  const likeFile = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await addFavourite(dataId, userToken);
      console.log('result of adding favourite', result);
      setUpdate(!update);
      getFavouritesByFileId();
    } catch (error) {
      console.error('likeFileError', error);
    }
  };

  const dislikeFile = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await removeFavourite(dataId, userToken);
      console.log('result of removing favourite', result);
      getFavouritesByFileId();
    } catch (error) {
      console.error('dislikeFileError', error);
    }
  };

  useEffect(() => {
    getFavouritesByFileId();
    getCommentsByFileId();
  }, []);

  useEffect(() => {
    getRatingsByFileId();
  }, [update]);

  return (
    <View style={styles.cardIconStatus}>
      <IconButton
        icon={isFavourite ? 'heart' : 'heart-outline'}
        size={30}
        iconColor="#E0E0E0"
        onPress={() => {
          !isFavourite ? likeFile() : dislikeFile();
        }}
      />
      <Text>{favouriteArray.length || 0}</Text>
      <IconButton
        icon="comment-multiple-outline"
        size={30}
        iconColor="#E0E0E0"
        onPress={() => {
          navigation.navigate('Comment', dataId);
        }}
      />
      <Text>{commentArray.length || 0}</Text>
      <IconButton icon="star-outline" size={35} iconColor="#E0E0E0" />
      <Text>{averageRating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardIconStatus: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
CardIconButton.propTypes = {
  dataId: PropTypes.number,
  navigation: PropTypes.object,
};

export default CardIconButton;
