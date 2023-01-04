import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
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

import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { useEffect } from 'react';
import { useState } from 'react';

const adUnitId = __DEV__? TestIds.INTERSTITIAL : 'ca-app-pub-9529146124037412/4237396083';

var interstitial;

const ProductSelection = ({navigation}) => {
  const {result, visible, setResult, startVoiceSearch} = useVoiceSearch();

  const [loaded , setLoaded] = useState(false)
  const [adLoadedState,setadLoadedState] = useState()


  const LoadInterstitialAd=()=>{
        interstitial = InterstitialAd.createForAdRequest(adUnitId, {
         requestNonPersonalizedAdsOnly: true,
         keywords: ['fashion', 'clothing'],
       });
       interstitial.load();
       interstitial.addAdEventsListener(({type, payload}) => {
        console.log(`${Platform.OS} interstitial ad event: ${type}`);
      setadLoadedState(type)

        if (type === AdEventType.ERROR) {
      setadLoadedState(type)

          setLoaded(false)
          console.log(`${Platform.OS} interstitial error: ${payload?.message}`);
        }
        if (type === AdEventType.LOADED) {
          console.log('works');
          setLoaded(true)
    
        }
      });
     }
      
     useEffect(() => {
      
        LoadInterstitialAd()
      
        const unsubscribe = navigation.addListener('focus', () => {
          LoadInterstitialAd()
      
        });
       
      }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <SearchBox
        value={result}
        onChangeText={text => setResult(text)}
        onPress={startVoiceSearch}
        placeholder="Search all farms..."
      />
      <View style={{height: 25}} />
      <ProductSelectionCard
        source={require('../assets/images/product.png')}
        title="Zara Man Fit"
        number={987}
      />
      <ProductSelectionCard
        source={require('../assets/images/product.png')}
        title="Zara Man Fit"
        number={987}
      />
      <CouponCard title="Coupon" />
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
          // onPress={() => navigation.navigate('wholeSelerCheckOut')}
          onPress={() => {
            if(loaded == true){
                if(adLoadedState == 'loaded')
                {
                interstitial.show();
                navigation.navigate('wholeSelerCheckOut')
                setLoaded(false)
                }
  
              }else{
                navigation.navigate('wholeSelerCheckOut')
                setLoaded(false)
  
              }
            }
          }
          style={styles.midContainer}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Yes</Text>
          <MaterialIcons
            name="check-circle-outline"
            color={COLOR.blue}
            size={28}
          />
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => {
          if(loaded == true){
              if(adLoadedState == 'loaded')
              {
              interstitial.show();
              // navigation.navigate("CreateAccount")
              setLoaded(false)
              }

            }else{
              // navigation.navigate("CreateAccount")
              setLoaded(false)

            }
          }
        }
        style={styles.midContainer}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>No</Text>
          <AntDesign name="closecircleo" color={COLOR.blue} size={28} />
        </TouchableOpacity>
      </View>

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

export default ProductSelection;
