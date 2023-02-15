import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

const LocationMap = ({route}) => {
  const {lat, lng} = route.params;
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={{latitude: lat, longitude: lng}} />
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
};
export default LocationMap;
