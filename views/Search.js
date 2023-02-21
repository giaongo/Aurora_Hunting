import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import CardItem from '../components/CardItem';

const Search = () => {
  const [searchFile, setSearchFile] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const {searchMedia} = useMedia();

  const handleSearch = async () => {
    try {
      const userToken = AsyncStorage.getItem('userToken');
      setLoading(true);
      const results = await searchMedia(searchFile, userToken);
      console.log('searchFile', results);
      setSearchResults(results);
    } catch (error) {
      console.error('search media failed', error);
    }
  };

  // const {mediaArray, loadMedia, searchMedia} = useMedia();

  // const searchFile = async (navigation) => {
  //   try {
  //     const userToken = AsyncStorage.getItem('userToken');
  //     const result = await searchMedia(userToken);
  //     console.log('searchFile', result);
  //   } catch (error) {
  //     console.error('search media failed', error);
  //   }
  // };

  // useEffect(() => {
  //   searchFile();
  // }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for media"
        placeholderTextColor={'Grey'}
        value={searchFile}
        onChangeText={(text) => setSearchFile(text)}
        onSubmitEditing={handleSearch}
        loading={loading}
      />
      {searchResults.map((item) => (
        <CardItem key={item.id} title={item.title} />
      ))}
    </View>
  );
};

Search.propTypes = {
  navigation: PropTypes.object,
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

export default Search;
