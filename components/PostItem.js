import {TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Video} from 'expo-av';
import {uploadsUrl} from '../utils/variables';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import {useState} from 'react';

const PostItem = ({data}) => {
  const video = React.useRef(null);
  const navigation = useNavigation();
  const {getMediaByFileId} = useMedia();
  const [file, setFile] = useState({});

  const loadUserPosts = async () => {
    try {
      const posts = await getMediaByFileId(data.file_id);
      setFile(posts);
    } catch (error) {
      console.error('loadUserPosts: ', error);
    }
  };

  useEffect(() => {
    loadUserPosts();
  }, []);

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Single', file)}
      key={file.file_id}
    >
      {file.mime_type === 'image/jpeg' ? (
        <Image
          key={file.file_id}
          source={{
            uri: uploadsUrl + file.filename || 'https://placedog.net/500',
          }}
          style={styles.image}
        />
      ) : (
        <Video
          ref={video}
          source={{
            uri: uploadsUrl + file.filename || 'https://placedog.net/500',
          }}
          resizeMode="contain"
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '33.3%',
  },
  image: {
    height: 100,
    borderWidth: 1,
  },
});

PostItem.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default PostItem;
