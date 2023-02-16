import React, {useCallback, useContext, useRef} from 'react';
import PropTypes from 'prop-types';
import {BackHandler, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useFocusEffect} from '@react-navigation/native';
import {MainContext} from '../contexts/MainContext';

const LocationMap = ({navigation, route}) => {
  const {latitude, longitude, routeName} = route.params;
  const {update, setUpdate} = useContext(MainContext);
  const coordinateRef = useRef({latitude, longitude});

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (routeName === 'Upload') {
          setUpdate(!update);
          navigation.navigate(routeName, {data: coordinateRef.current});
        }
        console.log('pressed back button');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        onBackPress();
        BackHandler.removeEventListener('hardwareBackPress');
      };
    }, [])
  );
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        title="Aurora Zone"
        draggable
        coordinate={{latitude, longitude}}
        onDragEnd={(result) => {
          coordinateRef.current = result.nativeEvent.coordinate;
        }}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

LocationMap.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};
export default LocationMap;
