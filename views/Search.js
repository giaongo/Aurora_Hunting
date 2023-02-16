import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import PropTypes from 'prop-types';

const Search = (navigation) => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

Search.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

export default Search;
