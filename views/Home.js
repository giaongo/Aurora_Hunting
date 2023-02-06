import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CardItem from '../components/CardItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
const HomePage = ({navigation}) => {
  const mediaArray = useMedia();
  return (
    <View style={styles.container}>
      <FlatList
        data={mediaArray}
        keyExtractor={(item) => item.file_id}
        renderItem={({item}) => (
          <CardItem data={item} navigation={navigation} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
});

HomePage.propTypes = {
  navigation: PropTypes.object,
};

export default HomePage;
