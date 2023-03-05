import React, {useContext, useEffect, useState} from 'react';
import {Avatar, IconButton, TextInput} from 'react-native-paper';
import {StyleSheet, FlatList, View, Platform} from 'react-native';
import {useComment, useTag, useUser} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentItem from '../components/CommentItem';
import {KeyboardAvoidingView} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {MainContext} from '../contexts/MainContext';

const Comment = ({route}) => {
  const fileId = route.params;
  const {setUpdate, update} = useContext(MainContext);
  const [commentArr, setCommentArr] = useState([]);
  const [comment, setComment] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [submitButtonState, setSubmitButtonState] = useState(true);
  const {loadCommentsByFileId, postComments} = useComment();
  const {getUserByToken} = useUser();
  const {getFilesByTag} = useTag();

  const loadComments = async () => {
    try {
      const result = await loadCommentsByFileId(fileId);
      setCommentArr(result);
    } catch (error) {
      console.error('loadComments: ', error);
    }
  };

  const showToast = (message1) => {
    Toast.show({
      type: 'info',
      text1: message1,
      position: 'top',
      visibilityTime: '2000',
    });
  };

  const addComment = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postComments(token, fileId, comment);
      result
        ? setUpdate(!update) & setComment(null)
        : showToast('There seems to be a problem, try again later');
    } catch (error) {
      console.error('add Comment: ', error);
    }
  };

  const handleChange = (content) => {
    if (content.length != 0) {
      setComment(content);
      setSubmitButtonState(false);
    }
  };

  const loadCommentAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userInfo = await getUserByToken(token);
      const tag = 'avatar_' + userInfo.user_id;
      const files = await getFilesByTag(tag);
      setUserAvatar(files?.pop()?.filename);
    } catch (error) {
      console.error('loadCommentAvatar: ', error);
    }
  };

  useEffect(() => {
    loadComments();
    loadCommentAvatar();
  }, [update]);

  return (
    <View style={styles.container}>
      <FlatList
        data={commentArr}
        keyExtractor={(item) => item.comment_id}
        renderItem={({item}) => {
          return <CommentItem data={item} />;
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={95}
      >
        <View style={styles.addContainer}>
          <Avatar.Image
            source={{
              uri: userAvatar
                ? uploadsUrl + userAvatar
                : 'https://placedog.net/500',
            }}
          />
          <TextInput
            mode="flat"
            placeholder="add comment..."
            value={comment}
            style={{width: '60%', alignSelf: 'center', marginHorizontal: 10}}
            onChangeText={handleChange}
          />

          <IconButton
            icon={'send'}
            mode="elevated"
            size={40}
            iconColor={'white'}
            style={{marginHorizontal: 0}}
            disabled={submitButtonState}
            onPress={addComment}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },
  addContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

Comment.propTypes = {
  route: PropTypes.object,
};

export default Comment;
