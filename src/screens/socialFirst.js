import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ButtonComponent from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import HeaderImage from '../components/headerLogo';
import { COLOR } from '../custom-styles/colors';

import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__? TestIds.INTERSTITIAL : 'ca-app-pub-9529146124037412/4237396083';

var interstitial;

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
GoogleSignin.configure();


const SocialFirst = ({ route, navigation }) => {
  const { user } = route.params;
  const [nextPressed, setNexPressed] = useState(false);

  const [loaded , setLoaded] = useState(false)
  const [adLoadedState,setadLoadedState] = useState()


  const LoadInterstitialAd=()=>{
    setLoaded(true)
        interstitial = InterstitialAd.createForAdRequest(adUnitId, {
         requestNonPersonalizedAdsOnly: true,
         keywords: ['fashion', 'clothing'],
       });
       interstitial.load();
       interstitial.addAdEventsListener(({type, payload}) => {
        console.log(`${Platform.OS} interstitial ad event s: ${type}`);
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
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("🚀 ~ file: socialFirst.js ~ line 19 ~ signIn ~ userInfo", userInfo)

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow')

      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated')

      } else {
        console.log('some other error happened')

      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: '80%' }}>
        <HeaderImage />
        {/* {nextPressed == false ? ( */}
        <Text style={styles.heading}>Fill in your account details using</Text>
        {/* ) : ( */}
        {/* <Text style={styles.heading}>Have a second account? Login here</Text> */}
        {/* )} */}
        <TouchableOpacity style={styles.socialButtonView}>
          <Text> Login with Facebook</Text>
          <View style={styles.iconWrapper}>
            <Image source={require('../assets/images/facebook.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={signIn} style={styles.socialButtonView}>
          <Text> Login with Google</Text>
          <View style={[styles.iconWrapper, { backgroundColor: 'white' }]}>
            <Image source={require('../assets/images/google.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtonView}>
          <Text> Login with Instagaram</Text>
          <Image
            style={{ height: 25, width: 25 }}
            source={require('../assets/images/insta.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtonView}>
          <Text> Login with Youtube</Text>
          <View style={[styles.iconWrapper, { backgroundColor: 'white' }]}>
            <Image source={require('../assets/images/youtube.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1, padding: 20 }}
        colors={['#FFFFFF00', '#E3EFF8']}>
        <Text style={styles.bottomText}>I’dont have account </Text>
        <View style={{ justifyContent: 'flex-end', flex: 1 }}>
          <ButtonComponent
            onPress={() =>
             {  if(loaded == true){
              if(adLoadedState == 'loaded')
              {
              interstitial.show();
              navigation.navigate('signUp', {
                user: user,
              })
              setLoaded(false)
              }

            }else{
              navigation.navigate('signUp', {
                user: user,
              })

            }
          }
              
            }
            title="SIGN UP"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  heading: {
    color: COLOR.primary,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 30,
  },
  socialButtonView: {
    backgroundColor: '#E5E6E7',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  iconWrapper: {
    backgroundColor: '#367FC0',
    height: 25,
    width: 25,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    fontWeight: '700',
    textAlign: 'center',
    color: COLOR.textColor,
  },
});

export default SocialFirst;
