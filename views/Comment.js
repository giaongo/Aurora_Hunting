import React, { useContext, useEffect, useState } from 'react';
import {Avatar, Card, List, Text} from 'react-native-paper';
import {StyleSheet, SafeAreaView, ScrollView, FlatList, View} from 'react-native';
import { useComment, useTag, useUser } from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Comment = ({route}) => {
  const fileId = route.params;
  const { loadCommentsByFileId, postComments } = useComment();
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {user, userToken} = useContext(MainContext);
  const [commentArr, setCommentArr] = useState([]);
  const [postUser, setPostUser] = useState({});
  const [postUserAvatar, setPostUserAvatar] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNzAzLCJ1c2VybmFtZSI6IlRhaSBOZ3V5ZW4iLCJlbWFpbCI6InRhaS5uZ3V5ZW40QG1ldHJvcG9saWEuZmkiLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDIzLTAxLTEzVDE0OjE3OjI2LjAwMFoiLCJpYXQiOjE2NzU5MzM0MDMsImV4cCI6MTY3NjAxOTgwM30.qOUDNExHAjaodEY2o1Nn-u1xI7tdTtN2tv1MwGr9mcg';


  const loadComments = async() => {
    try {
      const result =  await loadCommentsByFileId(fileId);
      setCommentArr(result);
    } catch (error) {
      console.error('loadComments: ', error);
    }
  };

  const loadAvatar = async(item) => {
    try {
        const tag = 'avatar_' + item.user_id;
        const files = await getFilesByTag(tag);
        return setPostUserAvatar(files?.pop()?.filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    }
  };

  const getPostUser = async (item) => {
    try {
      const user = await getUserById(item.user_id, token);
      setPostUser(user);
    } catch (error) {
      console.error('getPostUser: ', error)
    }

  };

  useEffect(()=> {
    loadComments();
    loadAvatar();
    getPostUser();
  }, []);

  const CommentItem = (items) => {
    const item = items.data;

    const timeAdded = item.time_added.split('T')[0];
    return (
      <Card style={styles.cardContainer}>
        <Card.Title
        title={postUser.username}
        style={{color: '#f57b42'}}
        left={(props) => (
          <Avatar.Image
            {...props}
            size={50}
            source={{
              uri: loadAvatar(item)
                ? uploadsUrl + postUserAvatar
                : 'http://placekitten.com/200/300',
            }}
          />
        )}
      />
        <Text variant='bodyMedium'>{item.comment}</Text>
        <Text variant='bodyMedium'>{item.time_added}</Text>
      </Card>

    )
  }

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },
  cardContainer:{
    flex:1,
    flexDirection:'row',
    // backgroundColor: '#212121',
    // borderRadius:0
  },
});

Comment.propTypes = {
  route: PropTypes.object,
};

export default Comment;
