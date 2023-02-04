import {StatusBar} from 'expo-status-bar';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {MainProvider} from './contexts/MainContext';

import Home from './views/Home';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
      onSurface: '#BDBDBD',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <MainProvider>
        <Home />
        <StatusBar style="auto" />
      </MainProvider>
    </PaperProvider>
  );
}
