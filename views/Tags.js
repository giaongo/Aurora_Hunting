import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Card, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import CardTag from '../components/CardTag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';

const Tags = (navigation, route) => {
  const {description, user_id: userId} = route.params;

  const [setPostUser] = useState({});

  const allData = JSON.parse(description);
  const locationTagsData = allData.tags;

  const {getListOfTags} = useTag();
  const getTags = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const user = await getListOfTags(userId, userToken);
      setPostUser(user);
    } catch (error) {
      console.error('getTagsError', error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Location Tags</Text>

      <Card>
        <Text style={styles.title}>#Rovaniemi</Text>
        <CardTag navigation={navigation} />

        <CardTag tags={locationTagsData} />
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
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Tags;
