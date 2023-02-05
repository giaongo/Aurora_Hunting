import React from 'react';
import {FlatList, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import CardItem from '../components/CardItem';
import {useMedia} from '../hooks/ApiHooks';

const Home = () => {
  const mediaArray = useMedia();
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <FlatList
          data={mediaArray}
          keyExtractor={(item) => item.file_id}
          renderItem={({item}) => <CardItem data={item} />}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  text: {
    color: '#fff',
    marginBottom: 16,
  },
});

export default Home;
