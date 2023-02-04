import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useFavourite} from '../hooks/ApiHooks';

const CardIconButton = ({dataId}) => {
  const {loadFavouritesByFileId, addFavourite} = useFavourite();
  const [favouriteArray, setFavouriteArray] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const [clickComment, setClickComment] = useState(false);
  const [clickStar, setClickStar] = useState(false);
  const [update, setUpdate] = useState(false);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNjg5LCJ1c2VybmFtZSI6ImdpYW8iLCJlbWFpbCI6ImdpYW8ubmdvQG1ldHJvcG9saWEuZmkiLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDIzLTAxLTEyVDA4OjI0OjEyLjAwMFoiLCJpYXQiOjE2NzU1MDUwODAsImV4cCI6MTY3NTU5MTQ4MH0.q6-GWf5pB6n81eloChOxB1kLLXD-Tv8IhAh_2ZsH7Mo';

  const userId = 2689;
  useEffect(() => {
    loadFavouritesByFileId(dataId).then((favourites) => {
      setFavouriteArray(favourites);
      console.log('favourite array is', favourites);
      const checkFavourite = favourites.some(
        (favourite) => favourite.user_id === userId
      );
      setIsFavourite(checkFavourite);
    });
  }, [update]);

  return (
    <View style={styles.cardIconStatus}>
      <IconButton
        icon={isFavourite ? 'heart' : 'heart-outline'}
        size={30}
        iconColor="#E0E0E0"
        onPress={async () => {
          const result = !isFavourite && (await addFavourite(dataId, token));
          console.log('result of adding favourite', result);
          setIsFavourite(!isFavourite);
          setUpdate(!update);
        }}
      />
      <Text>{favouriteArray.length || 0}</Text>
      <IconButton
        icon={clickComment ? 'comment-multiple' : 'comment-multiple-outline'}
        size={30}
        iconColor="#E0E0E0"
        onPress={() => setClickComment(!clickComment)}
      />
      <Text>100</Text>
      <IconButton
        icon={clickStar ? 'star' : 'star-outline'}
        size={35}
        iconColor="#E0E0E0"
        onPress={() => setClickStar(!clickStar)}
      />
      <Text>100</Text>
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
};

export default CardIconButton;
