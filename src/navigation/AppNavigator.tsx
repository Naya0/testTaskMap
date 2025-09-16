import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShiftScreen from '../screens/ShiftScreen';
import CheckPermitionsNavigate from '../screens/CheckPermitionsNavigate';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        options={{ title: 'Смены в вашем городе' }}
        component={CheckPermitionsNavigate}
      />
      <Stack.Screen
        name="ShiftScreen"
        options={{ title: 'Смены в вашем городе' }}
        component={ShiftScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
