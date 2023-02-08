import {SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
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
