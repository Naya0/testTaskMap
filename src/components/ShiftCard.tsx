import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Shift } from '../types/types';
import { shiftStore } from '../stores/ShiftStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from '../styles/main.styles';
import { observer } from 'mobx-react-lite';

interface Props {
  shiftData: Shift;
}

type RootStackParamList = {
  ShiftScreen: undefined;
};

const ShiftCard = observer( ({ shiftData }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (id: string) => {
    shiftStore.selectShift(id);
    navigation.navigate('ShiftScreen');
  };

  return (
    <TouchableOpacity
      style={styles.shiftCard}
      onPress={() => handlePress(shiftData.id)}
    >
      <View style={styles.logoCompanyContainer}>
        <Image
          style={styles.logoCompany}
          source={{
            uri: shiftData.logo
              ? shiftData.logo
              : '../images/Image-not-found.png',
          }}
          resizeMode="cover"
        />
      </View>

      <View style={styles.containerContent}>
        <View style={styles.borderLine}>
          <View style={styles.flexRow}>
            <Text style={styles.textCompanyName}>{shiftData.companyName}</Text>
          </View>

          <View style={styles.flexRow}>
            <Text style={styles.text}>Рейтинг&#58; {shiftData.customerRating}</Text>
            <Text style={[styles.text, styles.subtext]}>
              {shiftData.customerFeedbacksCount}
            </Text>
          </View>
        </View>

        <View style={styles.borderLine}>
          {shiftData.workTypes.map(workType => (
            <View key={workType.id} style={styles.flexRow}>
              <Text style={styles.text}>{workType.name}</Text>
            </View>
          ))}
          <Text>
            Людей набрано&#58; {shiftData.currentWorkers} &frasl; {shiftData.planWorkers}
          </Text>
        </View>

        <View>
          <Text>Дата&#58; {shiftData.dateStartByCity}</Text>
          <Text>
            Время&#58; {shiftData.timeStartByCity} &#45; {shiftData.timeEndByCity}
          </Text>
        </View> 
      </View>
    </TouchableOpacity>
  );
});

export default ShiftCard;
