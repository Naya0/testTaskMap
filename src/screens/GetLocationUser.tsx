import React from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { shiftStore } from '../stores/ShiftStore';
import { styles } from '../styles/main.styles';

const GeolocationUser = () => {
  const { setGeolocationRequested, setPermissionGranted } = shiftStore;

  const requestPermission = async () => {
    try {
      let permissionStatus;
      if (Platform.OS === 'ios') {
        permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else if (Platform.OS === 'android') {
        permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      }

      if (permissionStatus === RESULTS.GRANTED) {
        setPermissionGranted(true);  
        setGeolocationRequested(true);
      } else {
        setPermissionGranted(false);  
      }
    } catch (err) {
      console.error('Ошибка запроса разрешений:', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Предоставить геопозицию?</Text>
      <View style={styles.flexRow}>
        <Button title="Дать разрешение" onPress={requestPermission} />
      </View>
    </View>
  );
};

export default GeolocationUser;
