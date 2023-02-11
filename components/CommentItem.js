import {Avatar, Button, Card, SegmentedButtons} from 'react-native-paper';
import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useMedia, useTag, useUser} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Alert, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const CommentItem = ({data}) => {
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const {update, setUpdate} = useContext(MainContext);
  const {getFilesByTag} = useTag();
  const {getUserById, getUserByToken} = useUser();
  const {deleteMedia} = useMedia();
  const [showMore, setShowMore] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [userId, setUserId] = useState('');


  const getUserIdByToken = async() => {
    const token = await AsyncStorage.getItem('userToken');
    const user = await getUserByToken(token);
    setUserId(user.user_id);
  }


  const loadAvatar = async () => {
    try {
      const tag = 'avatar_' + data.user_id;
      const files = await getFilesByTag(tag);
      setAvatar(files?.pop()?.filename);
    } catch (error) {
      console.error('loadAvatar: ', error);
    }
  };

  const getUsernameById = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const usernames = await getUserById(data.user_id, token);
      setUsername(usernames);
    } catch (error) {
      console.error('getUsernameById: ', error);
    }
  }

  const doDelete = () => {
    try {
      Alert.alert('Delete', 'this file permanently ?', [
        {text:'Cancel'},
        {
          text:'Yes',
          onPress: async() => {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(token, data.comment_id);
            response
            ? Alert.alert('Deleted Comment successfully')
            & setUpdateComment(!updateComment)
            & setUpdate(!update)
            : Alert.alert('There is something wrong')
          },
        },
      ]);
    } catch (error) {
      console.error('doDelele: ', error);
    }
  }


  useEffect(() => {
    loadAvatar();
    getUserIdByToken();
    getUsernameById();
  }, [updateComment])


  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={{
          uri: avatar ? uploadsUrl  + avatar : 'https://placedog.net/500'
          }}
        style={styles.avatar}
      />
      <View style={styles.contentContainer}>
        <Card.Title
          title={username.username}
          style={styles.cardTitle}
        />
        <Text style={styles.commentContent}>
          {showMore ? data.comment : `${data.comment.substring(0,25)}` }
          <Button
            mode='text'
            textColor='white'
            style={{alignItems:'flex-end'}}
            onPress={() => {
              setShowMore(!showMore);
            }}
          >Show More</Button>
        </Text>
        <Text style={styles.commentDate}>{data.time_added.split('T')[0]}</Text>
      </View>
      {(userId === data.user_id) ? (
        <View style={styles.buttonContainer}>
        <Button
          mode='elevated'
          textColor='black'
          onPress={doDelete}
        >Delete</Button>
      </View>
      )
      :  <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    paddingTop: 20,
  },
  avatar: {
    borderColor:'green',
    borderWidth:2,
    borderStyle:'dotted'
  },
  contentContainer:{
    flexDirection:'column',
    width:'50%',
  },
  cardTitle:{
    alignItems:'flex-start'
  },
  commentContent: {
    marginLeft:20,
    marginBottom:10,
    fontSize:20,
    color:'#F0FFFF',

  },
  commentDate:{
    marginLeft:20,
    marginTop:10,
    fontSize:10,
    color:'#F0F8FF',
    height:'100%'
  },
  buttonContainer:{
    flexDirection:'column',
    justifyContent:'center',
    height: 150
  },

});

CommentItem.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default CommentItem;
