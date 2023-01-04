import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import ButtonComponent from '../components/button';
import HeaderImage from '../components/headerLogo';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '../custom-styles/colors';


import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__? TestIds.INTERSTITIAL : 'ca-app-pub-9529146124037412/4237396083';

var interstitial;

const OTPVerified = ({ navigation }) => {

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

      // setLoaded(false)
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
    <>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <HeaderImage />
        <View style={{ padding: 20, flex: 4.5 }}>
          <Text style={styles.headerText}>Phone Verification</Text>
          <View style={styles.topPicture}>
            <Image source={require('../assets/images/phone.png')} />
            <Image
              style={styles.verifyIconStyle}
              source={require('../assets/images/verify.png')}
            />
          </View>
          <Text style={styles.headerText}>Verified</Text>
        </View>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20 }}
          colors={['#FFFFFF00', '#E3EFF8']}>
          <TouchableOpacity style={{ marginVertical: 20 }}>
            <ButtonComponent
              onPress={() =>
                {

              if(loaded == true){
              if(adLoadedState == 'loaded')
              {
              interstitial.show();
              navigation.navigate('login')

              setLoaded(false)
              }

            }else{
              navigation.navigate('login')


            }
              }
            
            }
              title="Main Menu"
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: '#FFF',
    elevation: 5,
    marginVertical: 10,
    paddingHorizontal: 16,
    marginTop: 30,
    borderRadius: 10,
    fontWeight: '700',
    fontSize: 14,
    color: '#1D2126',
  },
  headerText: {
    fontFamily: 'Sansation',
    fontSize: 20,
    marginTop: 20,
    color: COLOR.primary,
    alignSelf: 'center',
    fontWeight: '700',
  },
  topPicture: {
    padding: 40,
    backgroundColor: '#FAEBE9',
    borderRadius: 90,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyIconStyle: {
    position: 'absolute',
    right: -10,
    top: 10,
  },
});

export default OTPVerified;
