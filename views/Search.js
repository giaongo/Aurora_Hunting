import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Searchbar} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import {FlatList} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const {mediaArray, searchMedia} = useMedia();
  const navigation = useNavigation();

  const handleSearch = async () => {
    console.log('searching for', searchQuery);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const results = await searchMedia({title: searchQuery}, token);
      const filteredResults = results.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      console.log(searchResults);
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

  const mappedArray = () => {
    return searchResults.map((item, index) => {
      return {
        uri: item.filename,
        id: index,
        file_id: item.file_id,
        user_id: item.user_id,
      };
    });
  };

  const SearchItem = ({item}) => {
    console.log(item);
    return (
      <Button onPress={() => navigation.navigate('Single', item)}>
        <Image
          source={{uri: uploadsUrl + item.uri}}
          style={{width: 100, height: 100}}
        />
      </Button>
    );
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
        horizontal={true}
        data={mappedArray()}
        renderItem={({item}) => <SearchItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      {/* <FlatList
        data={(mediaArray, searchResults)}
        keyExtractor={(item) => item.file_id.toString()}
        renderItem={({item}) => (
          <CardItem data={item} navigation={navigation} />
        )}
      /> */}
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
  item: PropTypes.object,
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
