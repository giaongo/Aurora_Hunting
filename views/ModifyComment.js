import {View, Text} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {Card, IconButton, TextInput} from 'react-native-paper';

const ModifyComment = ({navigation, route}) => {
  const {
    comment,
    comment_id: commentId,
    file_id: fileId,
    user_id: userId,
  } = route.params;

  const [commentText, setCommentText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={comment}
        textColor={'black'}
        style={styles.textInput}
        onChangeText={setCommentText}
      ></TextInput>
      <IconButton
        icon={'send'}
        iconColor={'black'}
        size={30}
        style={{alignItems: 'flex-end'}}
        onPress={() => console.log('edited')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textInput: {
    width: '80%',
    justifyContent: 'center',
  },
});

ModifyComment.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default ModifyComment;
