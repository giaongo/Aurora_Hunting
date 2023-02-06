import {SafeAreaView, StatusBar} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Navigator from './navigators/Navigator';
import {StyleSheet, Platform} from 'react-native';
import EditProfile from './views/EditProfile';

import Profile from './views/Profile';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      secondary: 'yellow',
      onSurface: '#BDBDBD',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <StatusBar />
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Navigator></Navigator>
      </SafeAreaView>

    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: '#212121',
  },
});
