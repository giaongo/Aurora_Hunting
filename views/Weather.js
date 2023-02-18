import { View, Text } from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { SectionList } from 'react-native';
import { FlatList } from 'react-native';
import { useEffect } from 'react';
import {REACT_APP_GOOGLE_API_WEATHER} from '@env';


const Weather = ({route}) => {
  const cityNames = route.params;
  console.log(cityNames);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyWeatherTemp, setHourlyWeatherTemp] = useState([]);
  const [hourlyWeatherTime, setHourlyWeatherTime] = useState([]);


  const getCoordinates = async () => {
    try {
      const cityName = cityNames[0];
      const googleApi = REACT_APP_GOOGLE_API_WEATHER;
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${googleApi}`);
      const data = await response.json();
      if (data.status === "OK") {
        setLatitude(data.results[0].geometry.location.lat.toFixed(2));
        setLongitude(data.results[0].geometry.location.lng.toFixed(2));
        getHourlyWeatherFromLongAndLat(data.results[0].geometry.location.lat.toFixed(2), data.results[0].geometry.location.lng.toFixed(2));
      } else {
        console.log(`Unable to find latitude and longitude for ${cityName}.`);
        return null;
      }
    } catch (error) {
      console.log(`Error getting latitude and longitude: ${error}`);
      return null;
    };
  };


  const getHourlyWeatherFromLongAndLat = async (lat, long) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=${true}&temperature_unit=${'celsius'}&hourly=temperature_2m&`);
      const data = await response.json();
      setCurrentWeather(data.current_weather);
      setHourlyWeatherTemp(data.hourly.temperature_2m);
      setHourlyWeatherTime(data.hourly.time);
    } catch (error) {
      console.error('getHourlyWeatherFromLongAndLat: ', error)
    }
  };



  useEffect(() => {
    getCoordinates();
  }, [cityNames])


  return (
    <View style={styles.container}>
      <Text> { new Date(currentWeather.time).toLocaleString('en-US', {weekday: 'long'})}, { new Date(currentWeather.time).toLocaleString('en-US', {month: 'long'})}  </Text>
      <Text> {cityNames[0].toUpperCase()} </Text>
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
