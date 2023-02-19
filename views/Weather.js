import { View, Text } from 'react-native';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { SectionList } from 'react-native';
import { FlatList } from 'react-native';
import { useEffect } from 'react';
import {REACT_APP_GOOGLE_API_WEATHER} from '@env';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { weatherCodes } from '../utils/variables';
import {LinearGradient} from 'expo-linear-gradient'


const Weather = ({route}) => {
  const cityNames = route.params;
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [weatherUnit, setWeatherUnit] = useState('');
  const [currentWeather, setCurrentWeather] = useState({});
  const [todaysDate, setTodaysDate] = useState();
  const [hourlyWeatherCode, setHourlyWeatherCode] = useState([]);
  const [hourlyWeatherTemp, setHourlyWeatherTemp] = useState([]);
  const [hourlyWeatherTime, setHourlyWeatherTime] = useState([]);
  const [dailyWeatherTime, setDailyWeatherTime] = useState([]);
  const [dailyWeatherCode, setDailyWeatherCode] = useState([]);
  const [dailyWeatherTempMin, setDailyWeatherTempMin] = useState([]);
  const [dailyWeatherTempMax, setDailyWeatherTempMax] = useState([]);



  const doFetchWeatherData = async(lat, long, param1, param2, param3, param4) => {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=${true}&temperature_unit=${'celsius'}&${param1}=${param2},weathercode&${param3}=${param4}`);
      const weatherInfo = await response.json();
      return weatherInfo;
    } catch (error) {
      console.error('doFetchWeatherData: ', error);
    }
  }

  const getCoordinates = async () => {
    try {
      const cityName = cityNames[0];
      const googleApi = REACT_APP_GOOGLE_API_WEATHER;
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${googleApi}`);
      const data = await response.json();
      if (data.status === "OK") {
        setLatitude(data.results[0].geometry.location.lat.toFixed(2));
        setLongitude(data.results[0].geometry.location.lng.toFixed(2));
        getHourlyWeather(data.results[0].geometry.location.lat.toFixed(2), data.results[0].geometry.location.lng.toFixed(2));
        getDailyWeather(data.results[0].geometry.location.lat.toFixed(2), data.results[0].geometry.location.lng.toFixed(2));
      } else {
        console.log(`Unable to find latitude and longitude for ${cityName}.`);
        return null;
      }
    } catch (error) {
      console.log(`Error getting latitude and longitude: ${error}`);
      return null;
    };
  };


  const getHourlyWeather = async (Lat, Long) => {
    try {
      const hourlyWeatherInfo = await doFetchWeatherData(Lat, Long, 'hourly', 'temperature_2m','', '');
      setHourlyWeatherCode(hourlyWeatherInfo.hourly.weathercode);
      setWeatherUnit(hourlyWeatherInfo.hourly_units.temperature_2m);
      setCurrentWeather(hourlyWeatherInfo.current_weather);
      setHourlyWeatherTemp(hourlyWeatherInfo.hourly.temperature_2m);
      setHourlyWeatherTime(hourlyWeatherInfo.hourly.time);
    } catch (error) {
      console.error('getHourlyWeatherFromLongAndLat: ', error)
    }
  };

  const getDailyWeather = async(Lat, Long) => {
    try {
      const dailyWeatherInfo = await doFetchWeatherData(Lat, Long, 'daily', 'temperature_2m_min,temperature_2m_max','timezone','auto');
      setDailyWeatherTime(dailyWeatherInfo.daily.time);
      setDailyWeatherTempMin(dailyWeatherInfo.daily.temperature_2m_min);
      setDailyWeatherTempMax(dailyWeatherInfo.daily.temperature_2m_max);
      setDailyWeatherCode(dailyWeatherInfo.daily.weathercode);
    } catch (error) {
      console.error('getDailyWeatherInfo: ', error)
    }
  };

  useEffect(() => {
    getCoordinates();
  }, [cityNames])

  const mappedHourlyArray = () => {
    const currentTime = Number(currentWeather.time?.split('T')[1].split(':')[0]);
    return hourlyWeatherTime.slice(currentTime, currentTime+24).map((value, index) => {
      const time = value.split('T')[1].split(':')[0];
      return {time: time ,temp: hourlyWeatherTemp[index] + weatherUnit,id: index, code: hourlyWeatherCode[index]};
  })
}

  const HourlyItem = ({item}) => {
    return (
        <View style={{marginHorizontal:10, alignItems:'center'}}>
          <Text style={{fontSize:15}}> {item.time} </Text>
          <IconButton
            icon={weatherCodes[item.code]?.icon}
            size={30}
          />
          <Text style={{fontSize:20, fontWeight:'600'}}> {item.temp} </Text>
      </View>
    )
  }

  const mappedDailyArray = () => {
    return dailyWeatherTime.map((value, index) =>{
      const dailyDate = new Date(value)?.toLocaleDateString('en-US', {weekday:'short'});
      const today = currentWeather.time?.split('T')[0];
      return {time: value === today ? 'Today' : dailyDate , minTemp: dailyWeatherTempMin[index], maxTemp: dailyWeatherTempMax[index], id: index, code: dailyWeatherCode[index]}
    })
  }



  const DailyItem = ({item}) => {
    return(
      <View style={styles.dailyItemContainer}>
        <Text style={{fontSize:20, width:'25%'}}> {item.time === todaysDate ? 'Today' : item.time} </Text>
        <IconButton
            icon={weatherCodes[item.code]?.icon}
            size={25}
          />
        <Text style={styles.dailyItemTemp} > {item.minTemp + weatherUnit} </Text>
        <Text style={styles.dailyItemTemp}> {item.maxTemp + weatherUnit} </Text>
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['blue', 'lightblue']} style={{flex:1, alignItems:'center'}}>
      <Text style={{fontSize:20, marginTop: 10}}> { new Date(currentWeather.time).toLocaleString('en-US', {weekday: 'long'}) + ', ' + new Date(currentWeather.time).getDate('en-US') + ' '+ new Date(currentWeather.time).toLocaleString('en-US', {month: 'long'})}</Text>
      <View style={styles.locationContainer}>
        <IconButton
          icon={'map-marker-radius'}
          size={35}
        />
        <Text style={styles.textLocation}> {cityNames[0].toUpperCase()} </Text>
      </View>
      <View style={styles.currentWeatherContainer}>
        <Text style={{fontSize:35}}> {currentWeather.temperature + weatherUnit}</Text>
        <IconButton
          icon={weatherCodes[currentWeather.weathercode]?.icon}
          size={70}
        />
      </View>
      <Text style={{fontSize:25, marginBottom:30}}>{weatherCodes[currentWeather.weathercode]?.description} </Text>
      <FlatList
        style={styles.hourlyFlatList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={mappedHourlyArray()}
        renderItem={({item}) => <HourlyItem item={item} />}
        keyExtractor={item => item.id}
      />
      <FlatList
        style={styles.dailyFlatList}
        data={mappedDailyArray()}
        renderItem={({item}) => <DailyItem item={item} />}
        keyExtractor={item => item.id}
      />
      </LinearGradient>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  },
  locationContainer:{
    flexDirection:'row',
  },
  textLocation:{
    alignSelf:'center',
    fontSize:25,
    fontWeight:'bold'
  },
  currentWeatherContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  dailyItemContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    marginHorizontal:25
  },
  dailyItemTemp: {
    fontSize:20,
    fontWeight:'600',
    width:'25%',
    textAlign:'right'
  },
  dailyFlatList:{
    width:'100%',
    marginBottom: 20
  },
  hourlyFlatList:{
    paddingBottom: 50,
    marginHorizontal:25
  }
})


Weather.propTypes = {
  route: PropTypes.object,
};

export default Weather;
