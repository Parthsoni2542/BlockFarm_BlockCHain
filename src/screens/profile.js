import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../custom-styles/colors';
import PhoneInputComponent from '../components/phoneInput';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL, TOKEN} from '../api';
import {GET_USER} from '../api/ApiConstants';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-9529146124037412/2924314419';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


const ProfileScreen = ({navigation}) => {

  const [loaded , setLoaded] = useState(false)


  const [countryCode, setCountryCode] = useState('');
  const [callingCode, setCallingCode] = useState('');
  const store = useSelector(state => state.login);
  console.log(store, 'store');
  const [phone, setPhone] = useState('9955712774');
  const [qr, setQr] = useState('6198f0f9fa09d200184818c8');
  const [name, setName] = useState('Nick R. Bocker');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [info, setInfo] = useState(null);

  const getContactInfo = async () => {
    try {
      const COUNTRY_CODE = await AsyncStorage.getItem('country_code');
      const ISO_CODE = await AsyncStorage.getItem('country_iso_code');
      if (COUNTRY_CODE && ISO_CODE !== null) {
        setCountryCode(JSON.parse(ISO_CODE));
        setCallingCode(JSON.parse(COUNTRY_CODE));
      }
    } catch (e) {
      console.log(
        '🚀 ~ file: profileSecond.js ~ line 47 ~ getContactInfo ~ e',
        e,
      );
    }
  };

  const getProfile = async () => {
    await axios
      .get(`${BASE_URL}${GET_USER}`, {
        headers: {
          Authorization: 'Bearer ' + TOKEN,
        },
      })
      .then(res => {
        if (res.data.success) {
          setInfo(res.data.data);
        }
      })
      .catch(err => {
        console.log('🚀 ~ file: profileSecond.js ~ line 59 ~ .then ~ err', err);
      });
  };
const LoadRAd =()=>{

  rewarded.load();

  rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
    setLoaded(true);
    console.log('rewarded load')
 

  });
}
  useEffect(() => {
    LoadRAd()

     navigation.addListener('focus', () => {
      LoadRAd()
  
    });
    
   
    getContactInfo();
    getProfile();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      containerStyle={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Header navigation={navigation} />

        <View style={styles.notificationView}>
          <Text style={{color: '#1D2126'}}>Notifications</Text>
          <Switch
            trackColor={{false: '#767577', true: '#473692'}}
            thumbColor={isEnabled ? 'white' : 'white'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>BlockFarm Profile</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setLoaded(true)
            // rewarded.show();

            navigation.navigate('settingSecond');

          }}
          style={styles.qrStyle}>
          <QRCode
            enableLinearGradient={true}
            linearGradient={['#473692', '#85BA2E']}
            gradientDirection={[0, 1, 1, 1]}
            logoBackgroundColor="transparent"
            value={qr}
            color="#473692"
            size={150}
          />
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <View style={styles.fieldGroupStyle}>
            <Text style={styles.fieldText}>Name</Text>
            <TextInput
              style={styles.fieldInputStyle}
              placeholder="Enter Your Name"
              // value={store?.roles[0]?.name}
            />
          </View>
          {/* <View style={styles.fieldGroupStyle}> */}
          <Text style={styles.fieldText}>Telephone Number</Text>
          {/* <TextInput
              style={styles.fieldInputStyle}
              placeholder="Enter Telephone Number"
              onChangeText={text => setPhone(text)}
              value={phone}
            /> */}
          {/* </View> */}
          <View style={{marginVertical: 10}}>
            <PhoneInputComponent
              value={store?.data?.number.slice(3)}
              countryCode={'PK'}
              callingCode={'+92'}
              onSelect={country => {
                const {cca2, callingCode} = country;
                setCallingCode(cca2);
                setCountryCode(country.cca2);
                setCallingCode(callingCode[0]);
              }}
            />
          </View>
        </View>
        {/* <Button  onPress={() => {
                  setLoaded(true)
                  if (loaded == true) {
                    // return null;
                    rewarded.show();
                    setLoaded(false)
              console.log('rewarded load con')
        
                  }
                  // rewarded.show();
      
                  // navigation.navigate('settingSecond');
      
                }} >aaa</Button> */}
        <View style={styles.gradiantView}>
          <LinearGradient
            style={{
              padding: 20,
            }}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            colors={['#FFFFFF00', '#E3EFF8']}>
            <Text style={styles.bottomHeading}>
              Change Your Social Networks
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                onPress={() => {
                  setLoaded(true)
                  if (loaded == true) {
                    // return null;
                    rewarded.show();
                    setLoaded(false)
              console.log('rewarded load con')
                  
                }}
              }
               style={styles.buttonView}>
                <LinearGradient
                  style={styles.iconWrapper}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[COLOR.linearStart, COLOR.linearEnd]}>
                  <Image source={require('../assets/images/facebook.png')} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setLoaded(true)
                  // rewarded.show();
      
                  // navigation.navigate('settingSecond');
      
                }}
              style={styles.buttonView}>
                <LinearGradient
                  style={styles.iconWrapper}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[COLOR.linearStart, COLOR.linearEnd]}>
                  <Image source={require('../assets/images/googleWhite.png')} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setLoaded(true)
                  // rewarded.show();
      
                  // navigation.navigate('settingSecond');
      
                }}
              style={styles.buttonView}>
                <LinearGradient
                  style={styles.iconWrapper}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[COLOR.linearStart, COLOR.linearEnd]}>
                  <Image source={require('../assets/images/instaWhite.png')} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  setLoaded(true)
                  // rewarded.show();
      
                  // navigation.navigate('settingSecond');
      
                }}
              style={styles.buttonView}>
                <LinearGradient
                  style={styles.iconWrapper}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[COLOR.linearStart, COLOR.linearEnd]}>
                  <Image
                    source={require('../assets/images/youtubeWhite.png')}
                  />
                </LinearGradient>
              </TouchableOpacity>
              
            </View>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Nunito-Black',
    fontSize: 20,
    marginVertical: 20,
    color: COLOR.primary,
  },
  descText: {
    fontFamily: 'Nunito-Semibold',
    fontSize: 16,
    color: '#1D2126',
    textAlign: 'center',
    marginHorizontal: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
    marginVertical: 24,
  },
  fieldGroupStyle: {
    marginBottom: 16,
  },
  fieldText: {
    fontSize: 15,
    paddingHorizontal: 6,
    color: '#333333',
    fontFamily: 'Nunito-SemiBold',
  },
  fieldInputStyle: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    elevation: 5,
    paddingLeft: 16,
    fontSize: 15,
    marginTop: 8,
    color: '#1D2126',
    fontFamily: 'Nunito-Regular',
  },
  qrStyle: {
    alignSelf: 'center',
    marginTop: 10,
    elevation: 2,
    padding: 30,
    backgroundColor: 'white',
  },
  notificationView: {
    justifyContent: 'space-between',
    marginTop: 50,
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  iconWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradiantView: {
    justifyContent: 'center',
  },
  buttonView: {
    padding: 10,
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderRadius: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHeading: {
    marginBottom: 20,
    color: COLOR.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
  drawerItems: {
    marginVertical: 15,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  drawerButton: {
    margin: 20,
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});
export default ProfileScreen;
