import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Text} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
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
      setTags(response.reverse());
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
      <View key={item.tag_id} style={styles.tag}>
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
      <ScrollView contentContainerStyle={styles.list}>
        {tags.map((tag) => renderTag({item: tag}))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
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
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

Tags.propTypes = {
  navigation: PropTypes.object,
  item: PropTypes.object,
};

export default Tags;
