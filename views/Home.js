import React, { useEffect } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CardItem from '../components/CardItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const Home = ({navigation}) => {
  const {mediaArray} = useMedia();


  const showToast = (message1, message2) => {
    Toast.show({
      type: 'info',
      text1:message1,
      text2:message2,
      position:'top',
      visibilityTime:3000,
      autoHide:true,
    });
  };

  useEffect(() => {
    showToast('Click on location tag' , 'for weather information');
  }, [])

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
    backgroundColor: '#121212',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
