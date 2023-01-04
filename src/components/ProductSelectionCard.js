import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLOR} from '../custom-styles/colors';

const ProductSelectionCard = ({title, number, source, navigation}) => {
  console.log(
    '🚀 ~ file: ProductSelectionCard.js ~ line 8 ~ ProductSelectionCard ~ navigation',
    navigation,
  );
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View
          style={{
            elavation: 5,
            width: wp('20%'),
            height: hp('7%'),
            borderColor: '#d5d5d5',
            borderRadius: 5,
          }}>
          <Image source={source} style={styles.img} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.text}>${number}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          color={COLOR.black}
          size={28}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: hp('9%'),
    flexDirection: 'row',

    alignSelf: 'center',
    borderRadius: 5,

    padding: wp('3%'),
    alignItems: 'center',
    marginTop: hp('1%'),
    backgroundColor: COLOR.white,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    width: wp('30%'),

    paddingHorizontal: wp('1%'),
  },
  img: {
    width: wp('12%'),
    height: hp('7%'),
  },
  rightContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  text: {
    marginRight: hp('1%'),
    color: COLOR.black,
  },
});

export default ProductSelectionCard;
