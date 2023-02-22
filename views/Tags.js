import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {FlatList} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';

const Tags = (data) => {
  const {getListOfTags} = useTag();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  const getTags = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await getListOfTags(token);
      console.log(response);
      const tags = JSON.parse(response.description).tags;
      console.log(tags);
      setTags(tags);
      setLoading(false);
    } catch (error) {
      console.error('getTagsError', error);
    }
  };

  const tagsLocation = JSON.parse(data.description).tags;
  console.log(tagsLocation);

  useEffect(() => {
    getTags();
  }, []);

  const renderTag = ({item}) => {
    return (
      <View style={styles.tag}>
        <Text>{item.tag}</Text>
      </View>
    );
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Location Tags</Text>
      <FlatList
        data={tags}
        renderItem={renderTag}
        keyExtractor={(item) => item.tag_id.toString()}
      />
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
  tag: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
});

Tags.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Tags;
