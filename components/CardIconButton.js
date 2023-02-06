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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyODYzLCJ1c2VybmFtZSI6InBodW9uZ2dpYW8iLCJlbWFpbCI6ImdpYW8ubmdvQG1ldHJvcG9saWEuZmkiLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDIzLTAyLTA0VDE4OjM0OjExLjAwMFoiLCJpYXQiOjE2NzU2Nzc5MDMsImV4cCI6MTY3NTc2NDMwM30.8oi_2f0Z_eNuPstjwJH_0S85QmSDz14KIlYEeAO5hzU';
  const userId = 2863;

  const getFavouritesByFileId = async () => {
    const favourites = await loadFavouritesByFileId(dataId);
    setFavouriteArray(favourites);
    const checkFavourite = favourites.some(
      (favourite) => favourite.user_id === userId
    );
    setIsFavourite(checkFavourite);
  };

  const getCommentsByFileId = async () => {
    const comments = await loadCommentsByFileId(dataId);
    setCommentArray(comments);
  };

  const getRatingsByFileId = async () => {
    const ratings = await loadRatingsByFileId(dataId);
    const ratingOnlyArray = ratings.map((element) => element.rating);
    setAverageRating(
      ratingOnlyArray.length &&
        ratingOnlyArray.reduce((prev, cur) => prev + cur, 0) /
          ratingOnlyArray.length
    );
  };

  const likeFile = async () => {
    const result = await addFavourite(dataId, token);
    console.log('result of adding favourite', result);
    getFavouritesByFileId();
  };

  const dislikeFile = async () => {
    const result = await removeFavourite(dataId, token);
    console.log('result of removing favourite', result);
    getFavouritesByFileId();
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
