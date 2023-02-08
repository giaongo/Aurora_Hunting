// import {StatusBar} from 'expo-status-bar';
import {Platform, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContext';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <MainProvider>
        <StatusBar />
        <SafeAreaView style={styles.AndroidSafeArea}>
          <Navigator></Navigator>
        </SafeAreaView>
      </MainProvider>
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
