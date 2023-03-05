import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CardItem from '../components/CardItem';
import {useMedia} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useState} from 'react';
import {useCallback} from 'react';
import {useContext} from 'react';
import {MainContext} from '../contexts/MainContext';
import {RefreshControl} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';

const Home = ({navigation}) => {
  const {update, setUpdate} = useContext(MainContext);
  const [refreshing, setRefreshing] = useState(false);
  const ref = useRef(null);
  useScrollToTop(ref);
  const {mediaArray} = useMedia();

  const showToast = (message1, message2) => {
    Toast.show({
      type: 'info',
      text1: message1,
      text2: message2,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const onRefresh = useCallback(() => {
    setUpdate(!update);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    showToast('Click on location tag', 'for weather information');
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'azure'}
            color={'azure'}
          />
        }
        ref={ref}
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
