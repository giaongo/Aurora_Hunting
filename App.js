import {Platform, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';

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
