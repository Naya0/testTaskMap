import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../styles/main.styles';
import { shiftStore } from '../stores/ShiftStore';

const ShiftScreen = () => {
  const shiftData = shiftStore.selectedShift;

  if (!shiftData) {
    return (
      <View style={styles.shiftCardContainer}>
        <Text>Смена не найдена</Text>
      </View>
    );
  }
  return (
    <View style={styles.shiftCardContainer}>
      <View style={styles.shiftCard}>
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

        <View style={styles.containerContent} >
          <View style={styles.borderLine}>
            <Text style={styles.textCompanyName}>{shiftData.companyName}</Text>
            <View style={styles.flexRow}>
              <Text style={styles.text}>
                Рейтинг&#58; {shiftData.customerRating}
              </Text>
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
            <Text>Сколько людей уже набрано&#58; {shiftData.currentWorkers}</Text>
            <Text>Сколько людей требуется&#58; {shiftData.planWorkers}</Text>
          </View>

          <View style={styles.borderLine}>
            <Text>Дата&#58; {shiftData.dateStartByCity}</Text>
            <Text>
              Время&#58; {shiftData.timeStartByCity} &#45; {shiftData.timeEndByCity}
            </Text>
          </View>

          <Text style={styles.textBold}>
            Сумма выплаты за смену {shiftData.priceWorker} руб.
          </Text>

        </View>
      </View>
    </View>
  );
};

export default ShiftScreen;
