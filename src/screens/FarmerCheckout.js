import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBox from '../components/SearchBox';
import ProductSelectionCard from '../components/ProductSelectionCard';
import { COLOR } from '../custom-styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CouponCard from '../components/CouponCard';
import FarmerHeader from '../components/FarmerHeader';
import { Model } from '../components/Model';
import { useVoiceSearch } from '../hooks/useVoiceSearch';


const FarmerCheckout = ({ navigation }) => {
  const { result, visible, setResult, startVoiceSearch } = useVoiceSearch();


  return (
    <View style={StyleSheet.container}>

      <FarmerHeader navigation={navigation} />
      <SearchBox
        value={result}
        onChangeText={text => setResult(text)}
        onPress={startVoiceSearch}
        placeholder='Search all farms...'
      />
      <View style={styles.totalView}>
        <Text style={styles.normalText}>Order Number</Text>
        <Text style={styles.normalText}>SGN56768</Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.normalText}>Delivery Status</Text>
        <Text style={styles.normalText}>In progress</Text>
      </View>
      <Text style={styles.orderText}>Cancel Order (Before Delivery)</Text>
      <CouponCard title="Return Order (Upload Photos of Items)" />

      <View style={styles.card}>
        <ProductSelectionCard title="East SEED1" number='$55.5' />
        <ProductSelectionCard title="East SEED1" number='$55.5' />
        <ProductSelectionCard title="East SEED1" number='$55.5' />
      </View>

      <View style={styles.totalView}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>$105</Text>
      </View>

      <Model visible={visible} />

    </View>


  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),

    backgroundColor: 'white'
  },
  card: {
    height: hp('50%'),

  },
  totalView: {
    width: wp('90%'),
    height: hp('4%'),
    flexDirection: "row",
    alignSelf: 'center',
    alignItems: "center",

    justifyContent: 'space-between',
    paddingHorizontal: wp('3%')
  },
  bottomView: {
    width: wp('90%'),
    height: hp('4%'),
    flexDirection: "row",
    alignSelf: 'center',
    alignItems: "center",
    marginTop: hp('4%'),
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%')
  },
  midContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('15%')
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.blue
  },
  normalText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.black
  },
  orderText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.black,
    marginVertical: 10,
    width: wp('85%'),
    alignSelf: 'center'
  },



  alertDialogStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  modalStyle: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
  },
  labelTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: Constants.AppColors.Font.QuestionnaireLabelColor,
  },

});


export default FarmerCheckout;
