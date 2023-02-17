import { View, Text } from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';


const Weather = ({route}) => {
  const cityNames = route.params;
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const apiKey = 'AIzaSyAOG_23-DdBUVKebvH2ahHhk94qITphAX8';
  const cityName = cityNames[0];

  const getCoordinates = async () => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${apiKey}`);
      const data = await response.json();
      if (data.status === "OK") {
        setLatitude(data.results[0].geometry.location.lat);
        setLongitude(data.results[0].geometry.location.lng);
        console.log(latitude, longitude);
      } else {
        console.log(`Unable to find latitude and longitude for ${cityName}.`);
        return null;
      }
    } catch (error) {
      console.log(`Error getting latitude and longitude: ${error}`);
      return null;
    };
  }

  getCoordinates();

  const getWeatherFromLongAndLat = async () => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
      const data = await response.json();
      console.log(data.hourly.temperature_2m.length ,data.hourly.time[0].split('T') );
    } catch (error) {

    }
  }


  getWeatherFromLongAndLat();

  return (
    <View style={styles.container}>
      <Text>text</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})


Weather.propTypes = {
  route: PropTypes.object,
};

export default Weather;
