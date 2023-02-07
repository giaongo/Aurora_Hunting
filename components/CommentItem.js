import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, List } from "react-native-paper";
import { useUser } from "../hooks/ApiHooks";

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNzAzLCJ1c2VybmFtZSI6IlRhaSBOZ3V5ZW4iLCJlbWFpbCI6InRhaS5uZ3V5ZW40QG1ldHJvcG9saWEuZmkiLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDIzLTAxLTEzVDE0OjE3OjI2LjAwMFoiLCJpYXQiOjE2NzU3Njg3OTYsImV4cCI6MTY3NTg1NTE5Nn0.gtcSHXrePExqBOV92yZ2SEMPos9CZW58MKhdypHHN0M';

const CommentItem = ({data}) => {
  console.log(data);
  const {getUserById} = useUser();
  const [postUser, setPostUser] = useState({});
  const [postUserAvatar, setPostUserAvatar] = useState('');

  const getPostUser = async () => {
    const user = await getUserById(data.user_id, token);
    setPostUser(user);
  };


  const loadAvatar = async () => {
    const tag = 'avatar_' + data.user_id;
    const files = await getFilesByTag(tag);
    setPostUserAvatar(files?.pop()?.filename);
  };

  const loadComments = async() => {
    const result =  await loadCommentsByFileId(fileId);

  };

  useEffect(() => {
    getPostUser();
    loadAvatar();
  }, [])

  return (
    <List.Item style={styles.container}>
      <Avatar.Image
      source={{uri: postUserAvatar
      ? uploadsUrl + postUserAvatar
      : 'http://placekitten.com/200/300'}}
      size={150}
      />
      <Text>{postUser.username}</Text>
    </List.Item>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})

export default CommentItem;
