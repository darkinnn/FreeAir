import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BubbleScreen from '../screens/BubbleScreen';
import InfoScreen from '../screens/InfoScreen';
import PersonalizarScreen from '../screens/PersonalizarScreen';
import FinishSessionScreen from '../screens/FinishSessionScreen';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }} name="BubbleScreen" component={BubbleScreen} />
      <Stack.Screen
        options={{
          title: 'Info de utilidad',
        }} name="InfoScreen"  component={InfoScreen} />
      <Stack.Screen
        options={{
          title: 'Personalizar',
        }} name="PersonalizarScreen"  component={PersonalizarScreen}  />
      <Stack.Screen
        options={{
          headerShown: false,
        }} name="FinishSessionScreen" component={FinishSessionScreen} />
    </Stack.Navigator>
  );
}