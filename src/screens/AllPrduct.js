import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import ProductSelectionCard from '../components/ProductSelectionCard';
import {COLOR} from '../custom-styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CouponCard from '../components/CouponCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useVoiceSearch} from '../hooks/useVoiceSearch';
import {Model} from '../components/Model';
import {baseURL} from '../utils';
import {useSelector} from 'react-redux';

const AllProduct = ({navigation}) => {
  const {result, visible, setResult, startVoiceSearch} = useVoiceSearch();
  const [data, setData] = useState();
  const store = useSelector(state => state.login);
  useEffect(() => {
    fetch(`${baseURL}/api/v1/product`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${store?.token}`,
      },
    })
      .then(resp => resp.json())
      .then(response => {
        console.log(response);
        setData(response.data);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <SearchBox
        value={result}
        onChangeText={text => setResult(text)}
        onPress={startVoiceSearch}
        placeholder="Search all Products..."
      />
      <View style={{height: 25}} />
      <FlatList
        data={data}
        renderItem={({item}) => {
          console.log(item);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('All Product', {
                  item: item,
                });
              }}>
              <ProductSelectionCard
                source={{
                  uri:
                    item.images[0] ||
                    'https://www.apnikheti.com/upload/crops/701idea99lettuce-plant-i5.jpg',
                }}
                title={item.name}
                number={`${item?.variations[0]?.price || 100} - ${
                  item?.variations[1]?.price || 150
                }`}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />

      {/* <ProductSelectionCard title="Zara Man Fit" number={987} /> */}
      {/* <CouponCard title="Coupon" />
      <View style={styles.totalView}>
        <Text style={styles.text}>TOTAL</Text>
        <Text style={styles.text}>$105</Text>
      </View>
      <TextInput
        style={styles.textInputStyle}
        placeholder="Address"
        placeholderTextColor={'black'}
      />
      <View style={styles.bottomView}>
        <Text style={styles.text}>Delivery by Blockride?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('wholeSelerCheckOut')}
          style={styles.midContainer}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Yes</Text>
          <MaterialIcons
            name="check-circle-outline"
            color={COLOR.blue}
            size={28}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.midContainer}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>No</Text>
          <AntDesign name="closecircleo" color={COLOR.blue} size={28} />
        </TouchableOpacity>
      </View> */}
      <Model visible={visible} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),

    backgroundColor: 'white',
  },
  totalView: {
    width: wp('90%'),
    height: hp('4%'),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    // borderWidth: 1,
    marginVertical: hp('1%'),
  },
  bottomView: {
    width: wp('90%'),
    height: hp('4%'),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
  },
  midContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('15%'),
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.black,
  },
  textInputStyle: {
    height: hp('6%'),
    width: wp('90%'),
    alignSelf: 'center',
    backgroundColor: '#FFF',
    borderRadius: 6,
    elevation: 4,
    // marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1D2126',
  },
});

export default AllProduct;
