import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Provider } from 'mobx-react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { shiftStore } from './src/stores/ShiftStore';


function App() {
  return (
    // <SafeAreaProvider>
    //   <AppContent />
    // </SafeAreaProvider>

    <Provider shiftStore={shiftStore}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

// const AppContent = () => {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           paddingTop: safeAreaInsets.top,
//           paddingBottom: safeAreaInsets.bottom,
//         },
//       ]}
//     >
//       <Text>ddd</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export default App;

