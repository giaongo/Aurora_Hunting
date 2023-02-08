import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useComment, useFavourite, useRating} from '../hooks/ApiHooks';

const CardIconButton = ({dataId, navigation}) => {
  const [favouriteArray, setFavouriteArray] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const [commentArray, setCommentArray] = useState([]);

  const [averageRating, setAverageRating] = useState([]);
  const [clickStar, setClickStar] = useState(false);

  const {loadFavouritesByFileId, addFavourite, removeFavourite} =
    useFavourite();
  const {loadCommentsByFileId} = useComment();
  const {loadRatingsByFileId} = useRating();

  // Hard codeded token and user id. This part will be replaced by fetching user data from main context and AsyncStorage
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyODYzLCJ1c2VybmFtZSI6InBodW9uZ2dpYW8iLCJlbWFpbCI6ImdpYW8ubmdvQG1ldHJvcG9saWEuZmkiLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDIzLTAyLTA0VDE4OjM0OjExLjAwMFoiLCJpYXQiOjE2NzU4NjMwNDgsImV4cCI6MTY3NTk0OTQ0OH0.Y6u5OSxxtenZRU2xq5XeynMBv-K-EXQk25V0RB3QB0U';
  const userId = 2863;

  const getFavouritesByFileId = async () => {
    try {
      const favourites = await loadFavouritesByFileId(dataId);
      setFavouriteArray(favourites);
      const checkFavourite = favourites.some(
        (favourite) => favourite.user_id === userId
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
      const result = await addFavourite(dataId, token);
      console.log('result of adding favourite', result);
      getFavouritesByFileId();
    } catch (error) {
      console.error('likeFileError', error);
    }
  };

  const dislikeFile = async () => {
    try {
      const result = await removeFavourite(dataId, token);
      console.log('result of removing favourite', result);
      getFavouritesByFileId();
    } catch (error) {
      console.error('dislikeFileError', error);
    }
  };

  useEffect(() => {
    getFavouritesByFileId();
    getCommentsByFileId();
    getRatingsByFileId();
  }, []);

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
          navigation.navigate('Comment');
        }}
      />
      <Text>{commentArray.length || 0}</Text>
      <IconButton
        icon={clickStar ? 'star' : 'star-outline'}
        size={35}
        iconColor="#E0E0E0"
        onPress={() => setClickStar(!clickStar)}
      />
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
