import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/contexts/AuthContext';
import AppRoutes from './src/navigation';
import {Provider} from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NavigationContainer>
    </Provider>
  );
}
