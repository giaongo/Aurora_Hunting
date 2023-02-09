import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, IconButton, Card, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import CardTag from './CardTag';
import CardIconButton from './CardIconButton';
import {uploadsUrl} from '../utils/variables';
import {useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OptionsMenu from 'react-native-option-menu';
import {MainContext} from '../contexts/MainContext';

const CardItem = ({data, navigation}) => {
  const [postUser, setPostUser] = useState({});
  const [postUserAvatar, setPostUserAvatar] = useState('');
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {user} = useContext(MainContext);
  const getPostUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await getUserById(data.user_id, userToken);
      setPostUser(user);
    } catch (error) {
      console.error('getPostUserError', error);
    }
  };

  const loadAvatar = async () => {
    try {
      const tag = 'avatar_' + data.user_id;
      const files = await getFilesByTag(tag);
      setPostUserAvatar(files?.pop()?.filename);
    } catch (error) {
      console.error('loadAvatarError', error);
    }
  };

  const editPost = () => {
    console.log('Edit pressed');
    navigation.navigate('Modify', data);
  };

  useEffect(() => {
    getPostUser();
    loadAvatar();
  }, []);

  return (
    <Card
      style={styles.cardContainer}
      mode="contained"
      onPress={() => navigation.navigate('Single', data)}
    >
      <View style={styles.cardHeader}>
        {data.user_id === user.user_id && (
          <OptionsMenu
            customButton={
              <IconButton
                icon="dots-horizontal"
                size={40}
                iconColor="#E0E0E0"
              />
            }
            destructiveIndex={1}
            options={['Edit', 'Delete', 'Cancel']}
            actions={[editPost]}
          />
        )}

        <Card.Title
          title={postUser.username}
          style={{color: '#f57b42', flex: 1}}
          left={(props) => (
            <Avatar.Image
              {...props}
              size={50}
              source={{
                uri: postUserAvatar
                  ? uploadsUrl + postUserAvatar
                  : 'http://placekitten.com/200/300',
              }}
            />
          )}
        />
      </View>

      <Card.Cover
        style={styles.cardImage}
        source={{uri: uploadsUrl + data.thumbnails.w320}}
      />

      <CardIconButton dataId={data.file_id} navigation={navigation} />
      <Text variant="titleLarge" style={styles.cardTitle}>
        {data.title}
      </Text>
      <Text varient="bodyMedium" style={styles.cardDescription}>
        {data.description}
      </Text>
      <Text varient="bodySmall" style={styles.dateText}>
        {new Date(data.time_added).toLocaleString('fi-FI')}
      </Text>
      <CardTag dataId={data.file_id} />
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
  cardHeader: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardImage: {
    objectFit: 'cover',
  },
  cardTitle: {
    color: '#E0E0E0',
  },
  cardDescription: {
    marginTop: 5,
  },
  dateText: {
    marginTop: 10,
    fontSize: 11,
    color: '#949494',
  },
});

CardItem.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
};

export default CardItem;
