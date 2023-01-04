import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLOR } from '../custom-styles/colors';
import QRCode from 'react-native-qrcode-svg';
import FarmerHeader from '../components/FarmerHeader';

const NewUpcCode = ({ navigation }) => {
  const [qr, setQr] = useState('USER@123_');
  return (
    <View style={styles.container}>
      <FarmerHeader navigation={navigation} />
      <Text style={styles.headerText}>New UPC Code</Text>
      <TouchableOpacity
        style={styles.qrStyle}
        onPress={() => navigation.navigate('plant')}>
        <QRCode
          enableLinearGradient={true}
          linearGradient={[COLOR.linearStart, COLOR.linearEnd]}
          gradientDirection={[0, 1, 1, 1]}
          value={qr}
          color="#727C8E"
          size={180}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  qrStyle: {
    alignSelf: 'center',
    marginTop: 10,
    elevation: 5,
    padding: 30,
    backgroundColor: 'white',
  },
  headerText: {
    fontFamily: 'Sansation',
    fontSize: 20,
    alignSelf: 'center',
    marginVertical: 20,
    fontWeight: '700',
    color: COLOR.primary,
  },
});

export default NewUpcCode;
