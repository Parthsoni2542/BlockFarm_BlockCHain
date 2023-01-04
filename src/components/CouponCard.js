import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLOR} from '../custom-styles/colors';

const CouponCard = props => {
  return (
    <View style={styles.container}>
      <Feather name="upload" color={COLOR.black} size={28} />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: hp('7%'),
    flexDirection: 'row',

    alignSelf: 'center',
    borderRadius: 5,
    elevation: 3,

    padding: wp('3%'),
    alignItems: 'center',
    marginTop: hp('1%'),
    backgroundColor: COLOR.white,
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default CouponCard;
