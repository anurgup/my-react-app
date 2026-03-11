import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LandingPage from './screens/LandingPage';
import AppPage from './screens/AppPage';

export type RootStackParamList = {
  Landing: undefined;
  App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ animationEnabled: false }}
          />
          <Stack.Screen
            name="App"
            component={AppPage}
            options={{
              animationTypeForReplace: 'pop',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
