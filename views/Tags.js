import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import CardTag from '../components/CardTag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag, useUser} from '../hooks/ApiHooks';

const Tags = (data, navigation) => {
  // const [postUser, setPostUser] = useState({});
  // const {getUserById} = useUser();
  // const {getFilesByTag} = useTag();

  // const getPostUser = async () => {
  //   try {
  //     const userToken = await AsyncStorage.getItem('userToken');
  //     const user = await getUserById(data.user_id, userToken);
  //     setPostUser(user);
  //   } catch (error) {
  //     console.error('getPostUserError', error);
  //   }
  // };
  // const {getUserById} = useUser();
  // const {getFilesByTag} = useTag();

  // const getLocationTags = async () => {
  //   try {
  //     const userToken = await AsyncStorage.getItem('userToken');
  //     const user = await getUserById(data.user_id, userToken);
  //   } catch (error) {
  //     console.error('getPostUserError', error);
  //   }
  // };

  // const allData = JSON.parse(data.tags);
  // const locationTagsData = allData.tags;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Location Tags</Text>

      <Card>
        <Text style={styles.title}>#Rovaniemi</Text>

        {/* <CardTag tags={locationTagsData} /> */}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
});

Tags.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
};

export default Tags;
