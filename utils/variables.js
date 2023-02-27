const baseUrl = 'https://media.mw.metropolia.fi/wbma/';
const uploadsUrl = 'https://media.mw.metropolia.fi/wbma/uploads/';
const appId = 'aurora_hunting_2023';
const weatherCodes = {
  0: {
    description: 'Clear sky',
    icon: 'weather-sunny',
  },
  1: {
    description: 'Mainly clear',
    icon: 'weather-partly-cloudy',
  },
  2: {
    description: 'Partly cloudy',
    icon: 'weather-partly-cloudy',
  },
  3: {
    description: 'Cloudy',
    icon: 'weather-cloudy',
  },
  45: {
    description: 'Fog and depositing rime fog',
    icon: 'weather-fog',
  },
  51: {
    description: 'Light Drizzle',
    icon: 'weather-rainy',
  },
  53: {
    description: 'Moderate Drizzle',
    icon: 'weather-rainy',
  },
  55: {
    description: 'Dense Drizzle',
    icon: 'weather-rainy',
  },
  56: {
    description: 'Light Freezing Drizzle',
    icon: 'weather-snowy-rainy',
  },
  57: {
    description: 'Dense Freezing Drizzle',
    icon: 'weather-snowy-rainy',
  },
  61: {
    description: 'Slight Rain',
    icon: 'weather-rainy',
  },
  63: {
    description: 'Moderate Rain',
    icon: 'weather-rainy',
  },
  65: {
    description: 'Heavy Rain',
    icon: 'weather-pouring',
  },
  66: {
    description: 'Light Freezing Rain',
    icon: 'weather-snowy-rainy',
  },
  67: {
    description: 'Heavy Freezing Rain',
    icon: 'weather-snowy-rainy',
  },
  71: {
    description: 'Slight Snow fall',
    icon: 'weather-snowy',
  },
  73: {
    description: 'Moderate Snow fall',
    icon: 'weather-snowy',
  },
  75: {
    description: 'Heavy Snow fall',
    icon: 'weather-snowy',
  },
  77: {
    description: 'Snow grains',
    icon: 'weather-snowy',
  },
  80: {
    description: 'Slight Rain showers',
    icon: 'weather-pouring',
  },
  81: {
    description: 'Moderate Rain showers',
    icon: 'weather-pouring',
  },
  82: {
    description: 'Heavy Rain showers',
    icon: 'weather-pouring',
  },
  85: {
    description: 'Slight Snow showers',
    icon: 'weather-snowy',
  },
  86: {
    description: 'Heavy Snow showers',
    icon: 'weather-snowy',
  },
  95: {
    description: 'Slight Thunderstorm:',
    icon: 'weather-lightning',
  },
  96: {
    description: 'Thunderstorm with light hail',
    icon: 'weather-hail',
  },
  99: {
    description: 'Thunderstorm with heavy hail',
    icon: 'weather-hail',
  },
};
export {baseUrl, uploadsUrl, appId, weatherCodes};
