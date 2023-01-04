import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Barcode from '@kichiyaki/react-native-barcode-generator';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Header from '../components/Header';
import SearchBox from '../components/SearchBox';
import WholeSelerCard from '../components/WholeSelerCard';

import {COLOR} from '../custom-styles/colors';
import {Dropdown} from '../components/DropDown';
import {Picker} from '@react-native-picker/picker';
import {useVoiceSearch} from '../hooks/useVoiceSearch';
import {Model} from '../components/Model';


import { IronSource ,IronSourceInterstitials} from '@wowmaking/react-native-iron-source';
import { useEffect } from 'react';

const WholeSelerProduct = ({navigation, route}) => {

  
  const [IronLoaded , setIronLoaded] = useState(false)

  const {item} = route.params;
  const [quantity, setQuantity] = useState(item?.metaOptions[0]?.options[0]);
  const [size, setSize] = useState(item?.metaOptions[0]?.options[0]);
  const {result, visible, setResult, startVoiceSearch} = useVoiceSearch();
  console.log(item, 'items');


  const ironsourceinterstitialsAd=()=>{
    //   IronSourceInterstitials.loadInterstitial();
    // IronSourceInterstitials.addEventListener('interstitialDidLoad', () => {
    //   IronSourceInterstitials.showInterstitial();
    // });
    IronSourceInterstitials.loadInterstitial();
    console.log('android IronSource interstitial :')

    IronSourceInterstitials.addEventListener('interstitialDidLoad', () => {
      // IronSourceInterstitials.showInterstitial();
      setIronLoaded(true)

    });
    IronSourceInterstitials.addEventListener('interstitialDidFailToLoadWithError', (err) => {
      console.warn('Failed to load inter Interstitial ', err);
    // IronSourceInterstitials.loadInterstitial();

    });
    IronSourceInterstitials.addEventListener('interstitialDidFailToShowWithError', (err) => {
      console.warn('Failed to show inter', err);
    });
    IronSourceInterstitials.addEventListener('interstitialDidClose', () => {
    });
    
    
      }
      useEffect(() => {
        ironsourceinterstitialsAd()
    
        const unsubscriber = navigation.addListener('focus', () => {
        
          ironsourceinterstitialsAd()
        
          });
          IronSource.initializeIronSource('b61cc35d', 'userId', {
            validateIntegration: true,
          }).then(() => {
            ironsourceinterstitialsAd()
            // console.warn('Init finished lk;k;');
         
          });
    },[])
  return (
    <View style={styles.contair}>
      <Header navigation={navigation} />
      <SearchBox
        value={result}
        onChangeText={text => setResult(text)}
        onPress={startVoiceSearch}
        placeholder="Search all farms..."
      />
      <View style={styles.productVew}>
        <Image
          source={
            {uri: item.images[0]} || require('../assets/images/product.png')
          }
          style={styles.img}
        />
        <Barcode
          format="CODE128B"
          value="0000002021954Q"
          text="0000002021954Q"
          style={styles.barCode}
          maxWidth={wp('50%')}
          width={wp('40%')}
          height={hp('5%')}
        />
      </View>
      <WholeSelerCard title={item?.metaOptions[0]?.name}>
        <Dropdown
          selectedValue={quantity}
          onValueChange={value => setQuantity(value)}>
          {item?.metaOptions[0]?.options?.map((item, index) => {
            return <Picker.Item label={item} value={item} />;
          })}
        </Dropdown>
      </WholeSelerCard>

      <WholeSelerCard title={item?.metaOptions[1]?.name}>
        <Dropdown selectedValue={size} onValueChange={value => setSize(value)}>
          {item?.metaOptions[1]?.options?.map((item,index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Dropdown>
      </WholeSelerCard>
      <TouchableOpacity
        // onPress={() => navigation.navigate('My All Orders')}

        onPress={() =>
          {  if(IronLoaded == true){

            IronSourceInterstitials.showInterstitial();

            navigation.navigate('My All Orders')
            // navigation.navigate("CongratulationBadge")
            // ironsourceinterstitialsAd()
            // setLoaded(false)
          } else{
            // navigation.navigate("CongratulationBadge")
            navigation.navigate('My All Orders')

          }
}
         
        }
        style={styles.touch}>
        <LinearGradient
          style={styles.btnStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.linearStart, COLOR.linearEnd]}>
          <View onPres style={styles.cartView}>
            <MaterialIcons
              name="shopping-cart"
              color="#fff"
              size={28}
              style={styles.icon}
            />
            <Text style={styles.text}>Cart</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <Model visible={visible} />
    </View>
  );
};
const styles = StyleSheet.create({
  contair: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'white',
  },
  productVew: {
    width: wp('92%'),
    height: hp('40%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: wp('50%'),
    height: hp('25%'),
    marginBottom: 4,
  },
  barCode: {
    backgroundColor: 'white',
  },
  touch: {
    width: wp('92%'),
    height: hp('10%'),
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp('1%'),
  },
  btnStyle: {
    width: '100%',
    alignSelf: 'center',
    height: hp('6%'),
    borderRadius: 6,
    marginHorizontal: 8,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  cartView: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLOR.white,
    marginLeft: wp('2%'),
  },
});

export default WholeSelerProduct;
