import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Searchbar, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native';
import {FlatList} from 'react-native';
import {uploadsUrl} from '../utils/variables';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const {searchMedia} = useMedia();
  const navigation = useNavigation();

  const handleSearch = async () => {
    console.log('searching for', searchQuery);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const results = await searchMedia({title: searchQuery}, token);
      const filteredResults = results.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults.reverse());
      console.log(searchResults);

      if (filteredResults.length === 0) {
        setSearchError('No results found');
      } else {
        setSearchError(null);
      }
    } catch (error) {
      console.error('search media failed', error);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
      setSearchError(null);
    }
  }, [searchQuery]);

  const mappedArray = () => {
    return searchResults.map((item, index) => {
      return {
        item: item,
        id: index,
      };
    });
  };

  const SearchItem = ({item}) => {
    return (
      <Button onPress={() => navigation.navigate('Single', item.item)}>
        <Image
          source={{uri: uploadsUrl + item.item.filename}}
          style={styles.image}
        />
      </Button>
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        onSubmitEditing={handleSearch}
        onClear={clearSearch}
        icon="magnify"
        iconColor="black"
        style={{margin: 10}}
        inputStyle={{color: 'black'}}
      />
      {searchError && <Text>{searchError}</Text>}
      <FlatList
        vertical={true}
        data={mappedArray()}
        renderItem={({item}) => <SearchItem item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
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
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#81854A',
  },
  list: {
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Search;
