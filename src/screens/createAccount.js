import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ButtonComponent from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import HeaderImage from '../components/headerLogo';
import {COLOR} from '../custom-styles/colors';
import ModalDropdown from 'react-native-modal-dropdown';
import Swiper from 'react-native-swiper';

import {
  IronSource,
  IronSourceInterstitials,
} from '@wowmaking/react-native-iron-source';

import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-9529146124037412/4237396083';

var interstitial;

const CreateAccountScreen = ({navigation}) => {
  const [nextPressed, setNexPressed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [IronLoaded, setIronLoaded] = useState(false);
  const [adLoadedState, setadLoadedState] = useState();

  // const ironsourceinterstitialsAd=()=>{
  //   console.log('runing')
  //   IronSourceInterstitials.loadInterstitial();
  //   IronSourceInterstitials.showInterstitial();
  //   // IronSourceInterstitials.addAdEventsListener('interstitialDidLoad', () => {
  //   //   // setLoaded(true)
  //   //   console.log('iron sourrrr')
  //   // });
  //   }
  const ironsourceinterstitialsAd = () => {
    //   IronSourceInterstitials.loadInterstitial();
    // IronSourceInterstitials.addEventListener('interstitialDidLoad', () => {
    //   IronSourceInterstitials.showInterstitial();
    // });
    IronSourceInterstitials.loadInterstitial();
    console.log('android IronSource interstitial :');

    IronSourceInterstitials.addEventListener('interstitialDidLoad', () => {
      // IronSourceInterstitials.showInterstitial();
      setIronLoaded(true);
    });
    IronSourceInterstitials.addEventListener(
      'interstitialDidFailToLoadWithError',
      err => {
        console.warn('Failed to load inter Interstitial ', err);
        // IronSourceInterstitials.loadInterstitial();
      },
    );
    IronSourceInterstitials.addEventListener(
      'interstitialDidFailToShowWithError',
      err => {
        console.warn('Failed to show inter', err);
      },
    );
    IronSourceInterstitials.addEventListener('interstitialDidClose', () => {});
  };

  const LoadInterstitialAd = () => {
    interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    interstitial.load();
    interstitial.addAdEventsListener(({type, payload}) => {
      console.log(`${Platform.OS} interstitial ad event: ${type}`);
      setadLoadedState(type);

      if (type === AdEventType.ERROR) {
        setadLoadedState(type);

        // setLoaded(false)
        console.log(`${Platform.OS} interstitial error: ${payload?.message}`);
      }
      if (type === AdEventType.LOADED) {
        console.log('works');
        setLoaded(true);
      }
    });
  };
  useEffect(() => {
    LoadInterstitialAd();
    ironsourceinterstitialsAd();

    const unsubscribe = navigation.addListener('focus', () => {
      LoadInterstitialAd();
    });
    const unsubscriber = navigation.addListener('focus', () => {
      ironsourceinterstitialsAd();
    });
    IronSource.initializeIronSource('b61cc35d', 'userId', {
      validateIntegration: true,
    }).then(() => {
      ironsourceinterstitialsAd();
      // console.warn('Init finished lk;k;');
    });
  }, []);
  return (
    <View style={styles.container}>
      <ModalDropdown
        defaultValue={'Choose Language'}
        style={styles.dropDown}
        textStyle={styles.selectLanguage}
        showsVerticalScrollIndicator={false}
        dropdownStyle={{
          elevation: 2,
          padding: 8,
          height: 200,
          backgroundColor: 'white',
        }}
        options={[
          'Choose Language',
          'English',
          'French',
          'Spanish',
          'Chinese',
          'Urdu',
        ]}
      />

      <HeaderImage />

      <View style={styles.contentContainer}>
        {nextPressed == false ? (
          <Swiper style={{marginLeft: 30}}>
            <Image
              style={{height: 200}}
              source={require('../assets/images/onBoard1.png')}
            />
            <Image
              style={{height: 200, borderRadius: 40}}
              source={require('../assets/images/onBoard2.png')}
            />
          </Swiper>
        ) : (
          <Swiper style={{marginLeft: 30}}>
            <Image
              style={{height: 200}}
              source={require('../assets/images/onBoard1.png')}
            />
            <Image
              style={{height: 200, borderRadius: 40}}
              source={require('../assets/images/onBoard2.png')}
            />
          </Swiper>
        )}
        <View style={styles.contentTextContainer}>
          {nextPressed == false ? (
            <Text style={styles.textTitle}>
              {'Please create an account or sign in'.toUpperCase()}
            </Text>
          ) : (
            <Text style={styles.textTitle}>
              {'create account'.toUpperCase()}
            </Text>
          )}
          <Text style={styles.textDescrtiption}>
            Please choose if you would like to signin or signup as a Farmer or
            Wholesaler
          </Text>
        </View>
      </View>
      <View
        // start={{ x: 0, y: 1 }}
        // end={{ x: 1, y: 0 }}
        style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20}}
        // colors={['#FFFFFF00', '#E3EFF8']}>
      >
        {nextPressed == false ? (
          <View style={styles.buttonContainer}>
            <ButtonComponent
              onPress={() => {
                if (loaded == true) {
                  if (adLoadedState == 'loaded') {
                    interstitial.show();
                    setNexPressed(true);

                    setLoaded(false);
                  }
                } else {
                  setNexPressed(true);
                }
              }}
              title="CREATE ACCOUNT"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => {
                if (loaded == true) {
                  if (adLoadedState == 'loaded') {
                    interstitial.show();
                    navigation.navigate('login');

                    setLoaded(false);
                  }
                } else {
                  navigation.navigate('login');
                }
              }}>
              <Text style={styles.btnSignInTextStyle}>SIGN IN</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('socialSecond')
                
                }>
              <Text style={styles.btnSignInTextStyle}>not navigate socialSecond 4b iron interstitial </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('phoneVerified')
                
                }>
              <Text style={styles.btnSignInTextStyle}>testing phoneVerified 5c admob</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('profile')
                
                }>
              <Text style={styles.btnSignInTextStyle}>testing profile 6a/b reward</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => navigation.navigate('header')}>
              <Text style={styles.btnSignInTextStyle}>
                testing header 7b iron reward
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('newUPC')
                
                }>
              <Text style={styles.btnSignInTextStyle}>testing newUPC 9b admob reward</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('plant')
                
                }>
              <Text style={styles.btnSignInTextStyle}>testing PlantStatus 10b iron reward </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('sellerOrder')
                
                }>
              <Text style={styles.btnSignInTextStyle}>not navigate SellerOrder 12b admob reward done </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => navigation.navigate('wholeSelerProduct')}>
              <Text style={styles.btnSignInTextStyle}>
                not navigate const item = route.params; wholeSelerProduct 13b
                iron interstitial{' '}
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('productSelection')
                
                }>
              <Text style={styles.btnSignInTextStyle}>not navigate productSelection 14b admob interstitial </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('wholeSelerCheckOut')
                
                }>
              <Text style={styles.btnSignInTextStyle}>not navigate wholeSelerCheckOut 15b iron reward </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('MessagesScreen')
                
                }>
              <Text style={styles.btnSignInTextStyle}> MessagesScreen 18b iron interstitial </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnStyle}
              onPress={() => 

              navigation.navigate('ChatScreen')
                
                }>
              <Text style={styles.btnSignInTextStyle}> ChatScreen 19b admob interstitial </Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <ButtonComponent
                onPress={() => {
                  if (IronLoaded == true) {
                    IronSourceInterstitials.showInterstitial();

                    navigation.navigate('socialFirst', {
                      user: 'farmer',
                    });
                    // navigation.navigate("CongratulationBadge")
                    // ironsourceinterstitialsAd()
                    setLoaded(false);
                  } else {
                    // navigation.navigate("CongratulationBadge")
                    navigation.navigate('socialFirst', {
                      user: 'farmer',
                    });
                  }
                }}
                title="AS A FARMER"
              />
            </View>
            <View style={[styles.buttonContainer, {marginTop: 0}]}>
              <ButtonComponent
                onPress={() => {
                  if (IronLoaded == true) {
                    IronSourceInterstitials.showInterstitial();
                    // 'socialSecond'   testing 4b Ad
                    navigation.navigate('socialFirst', {
                      user: 'wholesaler',
                    });
                    // ironsourceinterstitialsAd()
                    setLoaded(false);
                  } else {
                    navigation.navigate('socialFirst', {
                      user: 'wholesaler',
                    });
                  }
                }}
                title="AS A WHOLESALER"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingTop: '1%',
  },

  headerImage: {
    marginTop: 30,
    alignSelf: 'center',
  },
  selectLanguage: {
    fontWeight: '700',
    textAlign: 'center',
    color: COLOR.textColor,
    marginHorizontal: 10,
    marginTop: 10,
  },
  logoContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1.7,
    justifyContent: 'center',
  },
  dropDown: {
    position: 'absolute',
    right: 20,
  },
  contentTextContainer: {
    marginHorizontal: 26,
    marginTop: 20,
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: '19%',
    color: COLOR.primary,
    fontFamily: 'Sansation_Bold',
  },
  textDescrtiption: {
    textAlign: 'center',
    fontSize: 15,
    color: COLOR.textColor,
    paddingHorizontal: 50,
    marginTop: 10,
    // marginBottom: 50,
  },
  buttonContainer: {
    // alignItems: 'center',
    // alignSelf: 'center',
    marginVertical: 10,
  },
  btnStyle: {
    padding: 13,
    alignSelf: 'center',
    borderRadius: 6,
    marginHorizontal: 10,
    borderStyle: 'solid',
    borderColor: '#C52B72',
    borderWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
  btnSignInTextStyle: {
    color: '#C52B72',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CreateAccountScreen;
