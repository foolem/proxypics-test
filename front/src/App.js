import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import createStore from './redux';
import Container from './navigation';
import { Colors } from './themes';

const store = createStore();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary,
    text: Colors.text,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Container />
      </PaperProvider>
    </Provider>
  );
}
