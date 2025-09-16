import React, { useEffect } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { shiftStore } from '../stores/ShiftStore';
import { observer } from 'mobx-react';
import ShiftCard from '../components/ShiftCard';
import { styles } from '../styles/main.styles';

const ShiftListScreen = observer(() => {
  const { shifts, loading, error } = shiftStore;

  useEffect(() => {
    if (shifts.length === 0) {
      shiftStore.fetchShifts();
    }
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Ошибка: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.shiftCardContainer}>
        {shifts.length > 0 ? (
          shifts.map(item => <ShiftCard key={item.id} shiftData={item} />)
        ) : (
          <Text>Нет доступных смен</Text>
        )}
      </View>
    </ScrollView>
  );
});

export default ShiftListScreen;
