import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ButtonComponent from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import HeaderImage from '../components/headerLogo';
import {COLOR} from '../custom-styles/colors';


import { IronSource ,IronSourceInterstitials} from '@wowmaking/react-native-iron-source';

const SocialSecond = ({navigation}) => {
  const [nextPressed, setNexPressed] = useState(false);
  const [loaded , setLoaded] = useState(false)
  const [adLoadedState,setadLoadedState] = useState()
  const [IronLoaded , setIronLoaded] = useState(false)


  const ironsourceinterstitialsAd=()=>{
    //   IronSourceInterstitials.loadInterstitial();
    // IronSourceInterstitials.addEventListener('interstitialDidLoad', () => {
    //   IronSourceInterstitials.showInterstitial();
    // });
    setIronLoaded(true)
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
      //
     
            }, []);
  return (
    <View style={styles.container}>
      <View style={{height: '80%'}}>
        <HeaderImage />
        <Text style={styles.heading}>Have a second account? Login here</Text>
        <TouchableOpacity style={styles.socialButtonView}>
          <Text> Login with Facebook</Text>
          <View style={styles.iconWrapper}>
            <Image source={require('../assets/images/facebook.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtonView}>
          <Text> Login with Google</Text>
          <View style={[styles.iconWrapper, {backgroundColor: 'white'}]}>
            <Image source={require('../assets/images/google.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtonView}>
          <Text> Login with Instagaram</Text>
          <Image
            style={{height: 25, width: 25}}
            source={require('../assets/images/insta.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtonView}>
          <Text> Login with Youtube</Text>
          <View style={[styles.iconWrapper, {backgroundColor: 'white'}]}>
            <Image source={require('../assets/images/youtube.png')} />
          </View>
        </TouchableOpacity>
      </View>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{flex: 1, padding: 20}}
        colors={['#FFFFFF00', '#E3EFF8']}>
        <Text style={styles.bottomText}>I’dont have account </Text>
        <View style={{justifyContent: 'flex-end', flex: 1}}>
          <ButtonComponent
            onPress={() => 
              {  if(IronLoaded == true){

                IronSourceInterstitials.showInterstitial();

                navigation.navigate('signUp')
                setLoaded(false)
              } else{
                navigation.navigate('signUp')
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

export default SocialSecond;
