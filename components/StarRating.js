import React from 'react';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useRating} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const StarRating = ({initialRating, fileId}) => {
  const [rating, setRating] = useState(initialRating);
  const {update, setUpdate} = useContext(MainContext);
  const {postRating, removeRatingByFileId} = useRating();

  const showToast = (type, title, detail = null) => {
    Toast.show({
      type: type,
      text1: title,
      text2: detail,
    });
  };

  const saveMediaRating = async (ratingNumber) => {
    try {
      setRating(ratingNumber);
      const token = await AsyncStorage.getItem('userToken');
      const result = await postRating(fileId, ratingNumber, token);
      setUpdate(!update);
      showToast(
        'success',
        'Add Rating Successfully 👍',
        `Thank you for your rating. Rating id: ${result.rating_id}`
      );
    } catch (error) {
      console.error('addMediaRatingError', error);
      showToast('error', 'errors with rating ☹️');
    }
  };

  const removeMediaRating = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await removeRatingByFileId(fileId, token);
      console.log('remove rating result', result);
      setUpdate(!update);
      setRating(0);
      showToast(
        'success',
        'Remove Rating Successfully',
        'Click on stars to re-rate 😄'
      );
    } catch (error) {
      console.error('removeMeiaRatingError', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{margin: 16}}>Your Rating:</Text>
        {[1, 2, 3, 4, 5].map((number, index) => {
          if (number <= rating) {
            return (
              <IconButton
                key={index}
                icon="star"
                iconColor="#d1cc2a"
                onPress={() => {
                  saveMediaRating(number);
                }}
              />
            );
          } else {
            return (
              <IconButton
                key={index}
                icon="star"
                iconColor="grey"
                onPress={() => {
                  saveMediaRating(number);
                }}
              />
            );
          }
        })}
      </View>
      {rating ? (
        <Button
          style={styles.reRateButton}
          mode="contained"
          onPress={() => removeMediaRating()}
        >
          Re-rate
        </Button>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reRateButton: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginBottom: 16,
  },
});
StarRating.propTypes = {
  initialRating: PropTypes.number,
  fileId: PropTypes.number,
};
export default StarRating;
