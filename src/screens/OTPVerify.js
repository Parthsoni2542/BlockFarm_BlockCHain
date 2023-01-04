import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import ButtonComponent from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../custom-styles/colors';
import {missedCallVerify} from '../api/ApiFunctions';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {otpVerifyValidator} from '../helpers/validations';
import {AuthContext} from '../context/AuthContext';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import * as actionTypes from '../redux/actions/actionTypes';
import HeaderImage from '../components/headerLogo';

const OTPVerify = ({navigation, route}) => {
  const store = useSelector(state => state);
  const [code, setCode] = React.useState('');
  const pinInput = React.useRef();
  // console.log(store, 'store');
  const [otpVerify, setOtpVerify] = useState('');
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const {data} = route.params;
  const {signIn} = useContext(AuthContext);

  const dispatch = useDispatch();

  const missedCallVerifyFun = async () => {
    // const otpVerifyError = otpVerifyValidator(code);
    setLoading(true);
    if (!code) {
      setLoading(false);
      Snackbar.show({
        backgroundColor: 'red',
        text: 'Code number is required',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      // async () => {
      // 	await
      fetch(
        'https://hopeaccelerated-backend.herokuapp.com/api/v1/check-mobi/verify',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOThmMGY5ZmEwOWQyMDAxODQ4MThjOCIsImlhdCI6MTY0MjU5OTk5OSwiZXhwIjoxNjQ1MTkxOTk5fQ.Ve9I6luP6Gs2ZbEunI_dEzpZrXloyLVKLJ7sVxReJ_Y'}`,
          },
          body: JSON.stringify({
            id: data.id,
            pin: code,
            deviceId: '123456',
          }),
        },
      )
        .then(data => data.json())
        .then(res => {
          console.log(res, 'response');
          if (res.success == true) {
            setResponse(res);
            dispatch({type: actionTypes.SET_LOGIN, login: res});
            navigation.navigate('DrawerNavigation');
            // navigation.navigate('profile')
           
            setLoading(false);
          }
        })
        .catch(err => {
          setLoading(false);
        });
      // };
    }
    // if (otpVerifyError) {
    //   setOtpVerify({...otpVerify, error: otpVerifyError});
    // } else {
    //   await AsyncStorage.setItem('country_code', JSON.stringify(country_code));
    //   await AsyncStorage.setItem(
    //     'country_iso_code',
    //     JSON.stringify(country_iso_code),
    //   );
    //   signIn(id, otpVerify.value);
    // }
  };
  const _onFinishCheckingCode1 = data => {
    setOtpVerify(data);
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
      <View style={{flex: 1}}>
        <HeaderImage />
        <View style={{padding: 20, flex: 3}}>
          <View style={styles.topPicture}>
            <Image source={require('../assets/images/phone.png')} />
          </View>
          <Text style={styles.headerText}>Phone Verification</Text>

          <View
            style={{
              justifyContent: 'center',
              alignItem: 'center',
              // borderWidth: 1,
            }}>
            {/* <TextInput
              style={styles.textInputStyle}
              placeholder="First last four digit number of misscalled no"
              keyboardType="numeric"
              placeholderTextColor="black"
              maxLength={4}
              onChangeText={text => setOtpVerify({value: text, error: ''})}
            /> */}
            <SmoothPinCodeInput
              // ref={"codeInputRef2"}
              ref={pinInput}
              secureTextEntry={true}
              cellSize={55}
              codeLength={4}
              cellStyle={{
                borderWidth: 2,
                // borderRadius: 24,
                borderColor: '#0072CC',
                backgroundColor: '#fff',
              }}
              cellStyleFocused={{
                borderColor: '#0072CC',
                backgroundColor: '#0072CC',
              }}
              textStyle={{
                fontSize: 24,
                color: 'black',
              }}
              // activeColor={"white"}
              // inactiveColor={"white"}
              value={code}
              // keyboardType="numeric"
              // autoFocus={true}
              onTextChange={code => setCode(code)}
              // codeLength={4}
              // space={16}
              // inputPosition="center"
              // size={45}
              // onFocus={() => alert("haha")}
              onFulfill={_onFinishCheckingCode1}
              containerStyle={{
                marginVertical: 12,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItem: 'center',
              }}
              codeInputStyle={{}}
            />
            {otpVerify.error ? (
              <Text style={styles.error}>{otpVerify.error}</Text>
            ) : null}

            <View style={{marginVertical: 10}}></View>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Nunito',
                  fontSize: 14,
                  fontWeight: '700',
                  color: 'black',
                  textAlign: 'center',
                }}>
                You didn’t recieve a code??{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          // start={{x: 0, y: 1}}
          // end={{x: 1, y: 0}}
          style={{justifyContent: 'flex-end', paddingHorizontal: 20}}
          // colors={['#FFFFFF00', '#E3EFF8']}>
        >
          <TouchableOpacity style={{marginVertical: 20}}>
            <ButtonComponent
              onPress={() => missedCallVerifyFun()}
              title="VERIFY"
            />
          </TouchableOpacity>
        </View>
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
    borderRadius: 200,
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: 4,
    paddingTop: 4,
    marginLeft: 15,
  },
});

export default OTPVerify;
