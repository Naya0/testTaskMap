import React, { useEffect, useState } from 'react';
import { Platform, Text, View, Button, Linking } from 'react-native';
import { shiftStore } from '../stores/ShiftStore';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Geolocation, {
  GeoPosition,
  GeoError,
} from 'react-native-geolocation-service';
import ShiftListScreen from './ShiftListScreen';
import { observer } from 'mobx-react';

const CheckPermitionsNavigate = observer(() => {
  const {
    isGeolocationRequested,
    permissionGranted,
    setGeolocationRequested,
    setPermissionGranted,
    resetGeolocation,
    fetchShifts,
    latitude,
    longitude,
  } = shiftStore;

  const [loadingState, setLoadingState] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isGeolocationRequested) {
      requestPermission();
    } else if (permissionGranted) {
      getLocation();
    } else {
      setLoadingState(false);

      shiftStore.latitude = 45.039268;
      shiftStore.longitude = 38.987221;
    }
  }, [isGeolocationRequested, permissionGranted]);

  const requestPermission = async () => {
    try {
      console.log('Запрос разрешения на геолокацию...');

      let permissionStatus =
        Platform.OS === 'ios'
          ? await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          : await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      console.log('Результат запроса разрешения:', permissionStatus);

      if (permissionStatus === RESULTS.GRANTED) {
        console.log('Разрешение получено');
        setPermissionGranted(true);
      } else {
        console.log('Разрешение не получено');
        setPermissionGranted(false);
      }

      setGeolocationRequested(true);
    } catch (err) {
      console.error('Ошибка запроса разрешений:', err);
      setError('Ошибка запроса разрешений');
      setGeolocationRequested(true);
      setLoadingState(false);
    }
  };

  const getLocation = () => {
    console.log('Попытка получить геопозицию...');

    Geolocation.getCurrentPosition(
      async (position: GeoPosition) => {
        console.log('Получена геопозиция:', position);
        setError(null);

        shiftStore.latitude = position.coords.latitude;
        shiftStore.longitude = position.coords.longitude;

        try {
          await shiftStore.fetchShifts();
        } catch (err: any) {
          setError(err.message || 'Ошибка при загрузке смен');
        } finally {
          setLoadingState(false);
        }
      },
      (error: GeoError) => {
        console.error('Ошибка при получении геопозиции:', error);
        setError(error.message);
        setLoadingState(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );

    console.log('Геопозиция - ', shiftStore.latitude);
  };

  const handleReset = () => {
    console.log('Сбрасываем состояние');
    resetGeolocation();
    setLoadingState(true);
    Linking.openSettings();
  };

  return (
    <View style={{ flex: 1 }}>
      {loadingState ? (
        <Text>Loading ...</Text>
      ) : (
        <>
          <ShiftListScreen />
        </>
      )}

      <Button
        title="Сбросить состояние и запросить разрешение"
        onPress={handleReset}
      />
    </View>
  );
});

export default CheckPermitionsNavigate;
