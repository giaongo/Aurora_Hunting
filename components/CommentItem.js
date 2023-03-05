import {Avatar, Button, Card} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useComment, useTag, useUser} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Alert, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';

const CommentItem = ({data}) => {
  const {setUpdate, update} = useContext(MainContext);
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const {getFilesByTag} = useTag();
  const {getUserById, getUserByToken} = useUser();
  const {deleteComments} = useComment();
  const [showMore, setShowMore] = useState(false);
  const [userId, setUserId] = useState('');

  const showToast = (message1, message2) => {
    Toast.show({
      type: 'info',
      text1: message1,
      text2: message2,
      position: 'top',
      visibilityTime: '2000',
    });
  };

  const getUserIdByToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const user = await getUserByToken(token);
    setUserId(user.user_id);
  };

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
      setUsername(usernames);
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
            const response = await deleteComments(token, data.comment_id);
            response
              ? setUpdate(!update)
              : showToast('There seems to be a problem, try again later');
          },
        },
      ]);
    } catch (error) {
      console.error('doDelele: ', error);
    }
  };

  useEffect(() => {
    loadAvatar();
    getUserIdByToken();
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
        <Text style={styles.commentContent}>
          {data.comment.length >= 25 ? (
            <>
              {!showMore ? (
                <>
                  <Text>{`${data.comment.substring(0, 25)}...`}</Text>
                  <Button
                    mode="text"
                    textColor="white"
                    style={{alignItems: 'flex-end'}}
                    onPress={() => setShowMore(!showMore)}
                  >
                    Show More
                  </Button>
                </>
              ) : (
                <Text>{data.comment}</Text>
              )}
            </>
          ) : (
            <Text>{data.comment}</Text>
          )}
        </Text>
        <Text style={styles.commentDate}>
          {data.time_added.split('T')[0]} at {data.time_added.split('T')[1]}
        </Text>
      </View>
      {userId === data.user_id ? (
        <View style={styles.buttonContainer}>
          <Button mode="elevated" textColor="black" onPress={doDelete}>
            Delete
          </Button>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 150,
  },
});

CommentItem.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default CommentItem;
