import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const LiveOrderCard = () => {
  return (
    <View style={styles.container}>
      <Barcode
        format="CODE128B"
        value="0000002021954Q"
        text="0000002021954Q"
        style={styles.barCode}
        maxWidth={wp('50%')}
        width={wp('40%')}
        height={hp('5%')}
      />

      <View style={styles.rightIcons}>
        <MaterialIcons
          name="check-circle-outline"
          color="#0072CC"
          size={28}
          style={styles.icon}
        />
        <MaterialIcons name="cancel" color="black" size={28} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: wp('95%'),
    height: hp('15%'),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 5,

    margin: hp('0.4%'),
  },

  barCode: {
    position: 'absolute',
    left: wp('2%'),
    backgroundColor: '#F5F5F7',
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('2%'),
  },
  rightIcons: {
    position: 'absolute',
    right: wp('4%'),
    flexDirection: 'row',
  },
  icon: {
    paddingRight: wp('5%'),
  },
});

export default LiveOrderCard;
