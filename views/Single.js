import React, {useEffect, useState} from 'react';
import {IconButton, Text} from 'react-native-paper';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {ImageBackground} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import CardIconButton from '../components/CardIconButton';
const Single = ({route, navigation}) => {
  const {
    file_id: fileId,
    filename,
    media_type: type,
    time_added: time,
    title,
    description,
    user_id: userId,
  } = route.params;
  const [postUser, setPostUser] = useState({});
  const {getUserById} = useUser();

  const getPostUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await getUserById(userId, userToken);
      setPostUser(user);
    } catch (error) {
      console.error('getPostUserError', error);
    }
  };

  const allData = JSON.parse(description);
  const descriptionData = allData.description;
  const locationTagsData = allData.tags;

  useEffect(() => {
    getPostUser();
  }, []);
  return (
    <ScrollView style={styles.backgroundContainer}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: uploadsUrl + filename}}
        style={styles.imageContainer}
        imageStyle={{borderBottomLeftRadius: 45, borderBottomRightRadius: 45}}
      >
        <View style={styles.titleBanner} blurType="light" blurAmount={20}>
          <Text style={styles.titleText} variant="titleLarge">
            {title}
          </Text>
          <Text variant="titleMedium">by {postUser.username}</Text>
        </View>
      </ImageBackground>
      <CardIconButton dataId={fileId} navigation={navigation} />
      <View style={{marginLeft: 20}}>
        <Text>Description:</Text>
        <Text>{descriptionData}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: 'black',
  },
  imageContainer: {
    height: 400,
    justifyContent: 'flex-end',
  },
  titleBanner: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
});

Single.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};
export default Single;
