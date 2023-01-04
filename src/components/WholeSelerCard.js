import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WholeSelerCard = (props) => {



  return (
    <View style={styles.container}>
      <Text style={{color:'black'}}>{props.title}</Text>
      <View style={styles.rightContainer}>
        {props.children}
        {/* <Text style={styles.text}>{country.label}</Text> */}
        {/* <MaterialIcons selectedValue={country}
          onValueChange={(value, index) => setCountry(value)} name="keyboard-arrow-down" color="#0072CC" size={28} /> */}

      </View>
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
    // elevation: 2,

    padding: wp('3%'),
    alignItems: 'center',
    marginTop: hp('1%'),
    borderWidth: 1


  },
  rightContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginRight: hp('1%')
  },

});


export default WholeSelerCard;
