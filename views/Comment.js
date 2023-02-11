import React, { useContext, useEffect, useState } from 'react';
import {ActivityIndicator, Avatar, Button, Card, IconButton, List, Text, TextInput} from 'react-native-paper';
import {StyleSheet, SafeAreaView, ScrollView, FlatList, View, Platform} from 'react-native';
import { useComment, useMedia, useTag, useUser } from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentItem from '../components/CommentItem';
import { KeyboardAvoidingView } from 'react-native';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';


const Comment = ({route}) => {
  const fileId = route.params;
  const {control, handleSubmit, formState: {errors}, trigger, setValue} = useForm({
    defaultValues: {}
  });
  const [commentArr, setCommentArr] = useState([]);
  const [comment, setComment] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [submitButtonState, setSubmitButtonState] = useState(true);
  const { loadCommentsByFileId, postComments } = useComment();

  const {getUserByToken} = useUser();
  const {getFilesByTag} = useTag();


  const loadComments = async() => {
    try {
      const result =  await loadCommentsByFileId(fileId);
      setCommentArr(result);
    } catch (error) {
      console.error('loadComments: ', error);
    }
  };

  const addComment = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const result = await postComments(token, fileId, comment);
      result ? Alert.alert('post comment successfully') : Alert.alert('Please try again');
    } catch (error) {
      console.error('add Comment: ', error);
    }
  }

  const handleChange = (content) => {
    if (content.length != 0){
      setComment(content);
      setSubmitButtonState(false);
    }
  }

  const loadCommentAvatar = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userInfo = await getUserByToken(token);
      const tag = 'avatar_' + userInfo.user_id;
      const files = await getFilesByTag(tag);
      setUserAvatar(files.pop().filename);
    } catch (error) {
      console.error('loadCommentAvatar: ', error);
    }
  };


  useEffect(()=> {
    loadComments();
    loadCommentAvatar();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={commentArr}
        keyExtractor={item => item.comment_id}
        renderItem={({item}) => {
          return (
            <CommentItem data={item} />
          )
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <View style={styles.addContainer}>
        <Avatar.Image
          source={{uri: userAvatar ? uploadsUrl + userAvatar : 'https://placedog.net/500'}}
        />
        <TextInput
          mode='flat'
          placeholder='add comment...'
          value={comment}
          style={{width:'60%', alignSelf:'center', marginHorizontal:10}}
          onChangeText={handleChange}
        />

        <IconButton
          icon={'send'}
          mode='elevated'
          size={40}
          iconColor={'white'}
          style={{marginHorizontal:0}}
          disabled={submitButtonState}
          onPress={async()=> {
            await addComment();
          }}
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
  addContainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'black',
  }
});

Comment.propTypes = {
  route: PropTypes.object,
};

export default Comment;
