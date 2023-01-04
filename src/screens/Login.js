import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import ButtonComponent from '../components/button';
import HeaderImage from '../components/headerLogo';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../custom-styles/colors';
import CountryPicker from 'react-native-country-picker-modal';
import {missedCall} from '../api/ApiFunctions';
import LottieView from 'lottie-react-native';
import {phoneValidator} from '../helpers/validations';
import {useDeviceToken} from '../hooks/useDeviceToken';
import {useDispatch} from 'react-redux';
import * as actionTypes from '../redux/actions/actionTypes';

const Login = ({navigation}) => {
  const {deviceToken} = useDeviceToken();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState({value: '', error: ''});
  const [countryCode, setCountryCode] = useState('PK');
  const [callingCode, setCallingCode] = useState('92');

  const number = phone.value;
  console.log(`+${callingCode}${number}`, 'Phone Number');

  const missedCallFun = async () => {
    // navigation.navigate('phoneVerify', {
    //   id: 1,
    //   country_code: +92,
    //   country_iso_code: 3166,
    // });
    const phoneError = phoneValidator(phone.value);

    if (phoneError) {
      setPhone({...phone, error: phoneError});
    } else {
      setLoading(true);
      try {
        const response = await missedCall({
          number: `+${callingCode}${number}`,
          type: 'reverse_cli',
          platform: 'android',
          deviceId: deviceToken,
        });
        if (response.success) {
          const id = response.data.id;
          const country_code = response.data.validation_info.country_code;
          const country_iso_code =
            response.data.validation_info.country_iso_code;
          // console.log(response, 'response');
          setLoading(false);
          if (
            response.success == true ||
            response.message == 'Missed call sended'
          ) {
            var dataSave = response.data;
            console.log(dataSave, 'dataSave');
            dispatch({type: actionTypes.SET_LOGIN, login: dataSave});
            navigation.navigate('phoneVerify', {
              data: response.data
            });
          }
        } else {
          setLoading(false);
          alert('Some things went wrong! Please try again....');
        }
      } catch (error) {
        setLoading(false);
        console.log('error:dddd' + error);
        alert('Some things went wrong! Please try again');
      }
    }
  };
  if (loading) {
    return (
      <LottieView
        source={require('../assets/animation/loading.json')}
        autoPlay
        loop
      />
    );
  }

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white',paddingVertical: 30}}>
        <HeaderImage />
        <View style={{padding: 20, flex: 1.5}}>
          {/* <Text style={{fontSize: 40, textAlign: 'center'}}>Login</Text> */}
          <Text style={styles.headerText}>Welcome Back!</Text>
          <Text style={styles.descText}> Fill in your account using</Text>

          <View>
            <View style={{marginHorizontal: 20, marginVertical: 30}}>
              <View>
                <View
                  style={{
                    height: 52,
                    elevation: 5,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    flexDirection: 'row',

                    width: '100%',
                  }}>
                  <View
                    style={{
                      width: '25%',
                      flexDirection: 'row',
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      alignItems: 'center',

                      justifyContent: 'center',
                      backgroundColor: COLOR.primary,
                    }}>
                    <CountryPicker
                      withFilter
                      countryCode={countryCode}
                      withFlag={true}
                      withAlphaFilter={false}
                      withCurrencyButton={false}
                      withCallingCode={callingCode}
                      onSelect={country => {
                        const {cca2, callingCode} = country;
                        setCallingCode(cca2);
                        setCountryCode(country.cca2);
                        setCallingCode(callingCode[0]);
                      }}
                    />
                    <Text
                      style={{color: 'white', marginLeft: -7, fontSize: 12}}>
                      {callingCode}
                    </Text>
                  </View>
                  <TextInput
                    style={{color: 'black', width: '55%', paddingLeft: 20}}
                    placeholder={'Mobile Number'}
                    keyboardType="numeric"
                    placeholderTextColor={'black'}
                    onChangeText={text => setPhone({value: text, error: ''})}
                  />
                </View>
                {phone.error ? (
                  <Text style={styles.error}>{phone.error}</Text>
                ) : null}
              </View>
            </View>
            <View style={{marginVertical: -10}} />
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate('createAccount')}
                style={{
                  fontFamily: 'Nunito',
                  fontSize: 14,
                  fontWeight: '700',
                  alignSelf: 'flex-end',
                }}>
                Change Number?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20}}
          colors={['#FFFFFF00', '#E3EFF8']}> */}
        <View
          style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20}}>
          <TouchableOpacity style={{marginVertical: 20}}>
            <ButtonComponent onPress={missedCallFun} title="NEXT" />
          </TouchableOpacity>
        </View>
        {/* </LinearGradient> */}
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
    marginTop: 30,
    color: COLOR.primary,
    alignSelf: 'center',
    fontWeight: '700',
  },
  descText: {
    fontFamily: 'Sansation',
    fontWeight: '700',
    color: '#1D2126',
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 15,
  },

  btnStyle: {
    flex: 1,
    padding: 15,
    borderRadius: 6,
    marginHorizontal: 8,
    marginTop: 10,
  },
  btnSignInStyle: {
    borderStyle: 'solid',
    borderColor: '#B3327E',
    borderWidth: 1,
  },
  phoneContainer: {
    width: '75%',
    height: 50,
    position: 'absolute',
    left: 10,
  },
  textInput: {
    marginLeft: -20,
    position: 'absolute',
  },
  error: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default Login;
