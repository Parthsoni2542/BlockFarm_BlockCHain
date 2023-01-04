import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ButtonComponent from '../components/button';
import HeaderImage from '../components/headerLogo';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR } from '../custom-styles/colors';
import CountryPicker from 'react-native-country-picker-modal';
import { missedCall } from '../api/ApiFunctions';
import LottieView from 'lottie-react-native';

const OTPSignUp = ({ navigation, route }) => {
  const { countryCode, callingCode, number } = route.params;

  console.log("🚀 ~ file: phoneSignUp.js ~ line 20 ~ OTPSignUp ~ number", number)
  console.log("🚀 ~ file: phoneSignUp.js ~ line 20 ~ OTPSignUp ~ callingCode", callingCode)

  const [loading, setLoading] = useState(false);
  console.log(`+${callingCode}${number}`);
  const missedCallFun = async () => {
    setLoading(true);
    try {
      const response = await missedCall({
        number: `+${callingCode}${number}`,
        type: 'reverse_cli',
        platform: 'android',
      });
      if (response.success) {
        console.log("🚀 ~ file: phoneSignUp.js ~ line 31 ~ missedCallFun ~ response", response)
        const id = response.data.id;
        const otp = response.data.cli_prefix;

        setLoading(false);
        navigation.navigate('phoneVerify', {
          id,
          countryCode,
          callingCode
        });
      } else {
        setLoading(false);
        alert('Some things went wrong! Please try again....');
      }
    } catch (error) {
      setLoading(false);
      console.log('error:' + error);
      alert('Some things went wrong! Please try again');
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
      <View style={{ flex: 1 }}>
        <HeaderImage />
        <View style={{ padding: 20, flex: 1.5 }}>
          <Text style={styles.headerText}>Welcome Back!</Text>
          <Text style={styles.descText}> Fill in your account using</Text>

          <View>
            <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
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
                    />
                    <Text
                      style={{ color: 'white', marginLeft: -7, fontSize: 12 }}>
                      {callingCode}
                    </Text>
                  </View>
                  <TextInput
                    style={{ color: 'black', width: '55%', paddingLeft: 20 }}
                    placeholder={'Mobile Number'}
                    keyboardType="decimal-pad"
                    placeholderTextColor={'black'}
                    value={number}
                  // onChangeText={text => setPhone(`+${callingCode}${text}`)}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 10 }} />
            <TouchableOpacity>
              <Text
                onPress={() => console.log('pressed')}
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
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20 }}
          colors={['#FFFFFF00', '#E3EFF8']}>
          <TouchableOpacity style={{ marginVertical: 20 }}>
            <ButtonComponent onPress={() => missedCallFun()} title="NEXT" />
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
});

export default OTPSignUp;
