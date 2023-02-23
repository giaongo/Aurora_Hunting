import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {FlatList} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import {useNavigation} from '@react-navigation/native';

const Tags = () => {
  const {getListOfTags} = useTag();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const navigation = useNavigation();

  const getTags = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await getListOfTags(token);
      console.log('json format', response);
      setTags(response);
      setLoading(false);
    } catch (error) {
      console.error('getTagsError', error);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  const renderTag = ({item}) => {
    const descriptionItem = JSON.parse(item.description);
    const tags = descriptionItem.tags;
    return (
      <View style={styles.tag}>
        <Button onPress={() => navigation.navigate('Single', item)}>
          <Text style={styles.text}>{'#' + tags.join(', ')}</Text>
        </Button>
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
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignContent: 'flex-start',
    paddingTop: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  tag: {
    backgroundColor: '#81854A',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    margin: 5,
  },
  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

Tags.propTypes = {
  navigation: PropTypes.object,
  item: PropTypes.object,
};

export default Tags;
