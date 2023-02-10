import {Avatar, Card} from 'react-native-paper';
import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useMedia, useTag, useUser} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Alert, StyleSheet, View, Text} from 'react-native';
// -------------------------------------------------------------------------------------------------
// import { ButtonGroup, Divider } from '@rneui/themed';

// BIG NOTE: We have bug by this code Tai.
// Rneui/theme is for react native element and we dont use this library. Change to react native paper instead.

// ----------------------------------------------------------------------------
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const CommentItem = ({data}) => {
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const {update, setUpdate} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const {getUserById} = useUser();
  const {deleteMedia} = useMedia();

  const loadAvatar = async () => {
    try {
      const tag = 'avatar_' + data.user_id;
      const files = await getFilesByTag(tag);
      setAvatar(files?.pop()?.filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    }
  };

  const getUsernameById = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const usernames = await getUserById(data.user_id, token);
      return setUsername(usernames);
    } catch (error) {
      console.error('getUsernameById: ', error);
    }
  };

  const doDelete = () => {
    try {
      Alert.alert('Delete', 'this file permanently ?', [
        {text: 'Cancel'},
        {
          text: 'Yes',
          onPress: async () => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(token, data.comment_id);
            response && setUpdate(!update);
            response
              ? Alert.alert('Deleted Comment successfully')
              : Alert.alert('There is something wrong');
          },
        },
      ]);
    } catch (error) {
      console.error('doDelele: ', error);
    }
  };

  useEffect(() => {
    loadAvatar();
    getUsernameById();
  }, []);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={{
          uri: avatar ? uploadsUrl + avatar : 'https://placedog.net/500',
        }}
        style={styles.avatar}
      />
      <View style={styles.contentContainer}>
        <Card.Title title={username.username} style={styles.cardTitle} />
        <Text style={styles.commentContent}>{data.comment}</Text>
        <Text style={styles.commentDate}>{data.time_added.split('T')[0]}</Text>
      </View>

      <ButtonGroup
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        buttons={['Modify', 'Delete']}
        rounded
        onPress={(index) => {
          if (index === 0) {
            console.log('pressed modify');
          } else {
            doDelete();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    flexDirection: 'row',
    paddingTop: 20,
  },
  avatar: {
    borderColor: 'green',
    borderWidth: 2,
    borderStyle: 'dotted',
  },
  contentContainer: {
    flexDirection: 'column',
    width: '50%',
  },
  cardTitle: {
    alignItems: 'flex-start',
  },
  commentContent: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 20,
    color: '#F0FFFF',
  },
  commentDate: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 10,
    color: '#F0F8FF',
    height: '100%',
  },
  buttonContainer: {
    height: 150,
    width: '20%',
    flexDirection: 'column',
  },
  button: {
    borderBottomWidth: 1,
  },
});

CommentItem.propTypes = {
  route: PropTypes.object,
};

export default CommentItem;
