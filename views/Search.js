import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Searchbar, Text, TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardItem from '../components/CardItem';
import {TouchableOpacity} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {Keyboard} from 'react-native';
import {Platform} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {FlatList} from 'react-native';

const Search = (navigation) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {mediaArray, searchMedia} = useMedia();

  const handleSearch = async () => {
    console.log('searching for', searchQuery);
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token);
      const results = await searchMedia({title: searchQuery}, token);
      console.log(results);
      const filteredResults = results.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      console.log('handleSearch', filteredResults);
    } catch (error) {
      console.error('search media failed', error);
    }

    // const [searchFile, setSearchFile] = useState('');
    // const [searchResults, setSearchResults] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const {searchMedia} = useMedia();

    // const handleSearch = async () => {
    //   try {
    //     const userToken = AsyncStorage.getItem('userToken');
    //     setLoading(true);
    //     const results = await searchMedia(searchFile, userToken);
    //     console.log('searchFile', results);
    //     setSearchResults(results);
    //   } catch (error) {
    //     console.error('search media failed', error);
    //   }
  };

  // const height = useHeaderHeight();

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
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        onSubmitEditing={handleSearch}
        icon="magnify"
        iconColor="black"
        style={{margin: 10}}
      />
      <FlatList
        data={(mediaArray, searchResults)}
        keyExtractor={(item) => item.file_id.toString()}
        renderItem={({item}) => (
          <CardItem data={item} navigation={navigation} />
        )}
      />
    </View>
    // <View style={styles.container}>
    //   <TouchableOpacity onPress={() => Keyboard.dismiss()} activeOpacity={1}>
    //     <KeyboardAvoidingView
    //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //       keyboardVerticalOffset={height + 47}
    //       style={{flex: 1}}
    //       enabled
    //     ></KeyboardAvoidingView>
    //   </TouchableOpacity>
    //   <TextInput
    //     placeholder="Search for media"
    //     placeholderTextColor={'Grey'}
    //     value={searchFile}
    //     onChangeText={(text) => setSearchFile(text)}
    //     onSubmitEditing={handleSearch}
    //     loading={loading}
    //   />
    //   {searchResults.map((item) => (
    //     <CardItem key={item.id} title={item.title} />
    //   ))}
    // </View>
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
