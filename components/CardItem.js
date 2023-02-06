import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import CardTag from './CardTag';
import CardIconButton from './CardIconButton';
import {uploadsUrl} from '../utils/variables';
import {useUser} from '../hooks/ApiHooks';

// Hard codeded token and user id. This part will be replaced by fetching user data from main context and AsyncStorage
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyODYzLCJ1c2VybmFtZSI6InBodW9uZ2dpYW8iLCJlbWFpbCI6ImdpYW8ubmdvQG1ldHJvcG9saWEuZmkiLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDIzLTAyLTA0VDE4OjM0OjExLjAwMFoiLCJpYXQiOjE2NzU2ODM4MTIsImV4cCI6MTY3NTc3MDIxMn0.htJcCWg9EKF98AMTTTYCrXtWgw6iFnK5p_kPJPw63aA';

const CardItem = ({data}) => {
  const [postUser, setPostUser] = useState({});
  const {getUserById} = useUser();

  const getPostUser = async () => {
    const user = await getUserById(data.user_id, token);
    setPostUser(user);
  };

  useEffect(() => {
    getPostUser();
  }, []);

  return (
    <Card style={styles.cardContainer} mode="contained">
      <Card.Title
        title={postUser.username}
        style={{color: '#f57b42'}}
        left={(props) => (
          <Avatar.Image
            {...props}
            size={50}
            source={{uri: 'http://placekitten.com/200/300'}}
          />
        )}
      />
      <Card.Cover
        style={styles.cardImage}
        source={{uri: uploadsUrl + data.thumbnails.w160}}
      />
      <CardIconButton dataId={data.file_id} />
      <Text variant="titleLarge">{data.title}</Text>
      <Text varient="bodyMedium">{data.description}</Text>
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingTop: 16,
        }}
      >
        <CardTag tag="#finland" />
        <CardTag tag="#espoo" />
        <CardTag tag="#vantaa" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#212121',
    flex: 1,
    marginBottom: 35,
    marginHorizontal: 30,
  },
  cardImage: {
    objectFit: 'cover',
  },
});

CardItem.propTypes = {
  data: PropTypes.object,
};

export default CardItem;
