import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ButtonComponent from '../components/button';
import CountryPicker from 'react-native-country-picker-modal';
import axios from 'axios';
import {COLOR} from '../custom-styles/colors';
import {
  emailValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
  countryValidator,
  phoneValidator,
} from '../helpers/validations';
import Loading from '../components/Loading';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../api';
import {SIGN_UP} from '../api/ApiConstants';
import {useDeviceToken} from '../hooks/useDeviceToken';

const SignUpScreen = ({route, navigation}) => {
  const {user} = route.params;
  // const user =''
  const {deviceToken} = useDeviceToken();
  console.log(
    '🚀 ~ file: signUp.js ~ line 27 ~ SignUpScreen ~ deviceToken',
    deviceToken,
  );

  const [firstName, setFirstName] = useState({value: '', error: ''});
  const [lastName, setLastName] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [address, setAdress] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [country, setCountry] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);

  const [countryCode, setCountryCode] = useState('PK');
  const [callingCode, setCallingCode] = useState('92');
  const [preferredLanguage, setPreferredLanguage] = useState('english');
  const [termsChecked, setTermsChecked] = useState(true);

  const handleTermsCheckbox = () => {
    setTermsChecked(!termsChecked);
  };
  console.log(user, 'user');
  const number = phone.value;

  const signUp = () => {
    setLoading(true);

    const data = {
      email: email.value,
      password: password.value,
      phone: `+${callingCode}${number}`,
      roleId:
        user === 'farmer'
          ? '619355e8de2f280018720549'
          : '619355fbde2f28001872054a',
      appsChannelKey:
        user === 'farmer'
          ? '619354d5de2f280018720548'
          : '619354d5de2f280018720548',
      preferredLanguage: 'english',
      deviceIds: 123456,
      profile: {
        firstName: firstName.value,
        // lastName: lastName.value,
        // gender: 'male',
        // dob: '12-12-10',
        country: country.value,
        // location: {
        //   type: 'Point',
        //   coordinates: [24.860735, 67.001137],
        // },
        address: 'Street 2',
        city: 'Karachi',
        // ownCar: 1,
        // maritalStatus: 'Single',
        // photo: '123.jpg',
      },
    };
    console.log(data, 'data');
    axios
      .post(`${BASE_URL}${SIGN_UP}`, data)
      .then(res => {
        if (res.data.success) {
          const roles = JSON.parse(JSON.stringify(res.data.data.roles));
          // navigation.navigate('phoneSignUp', {
          //   callingCode,
          //   countryCode,
          //   number,
          //   roles,
          // });
          navigation.navigate('login')
         
        }
      })
      .catch(err => {
        setLoading(false);
        Alert.alert('Oops!', 'User already exists', [{text: 'Okay'}]);
      });
  };

  const onSubmitFormHandler = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const firstNameError = firstNameValidator(firstName.value);
    const lastNameError = lastNameValidator(lastName.value);
    const phoneError = phoneValidator(phone.value);
    const countryError = countryValidator(country.value);

    if (
      emailError ||
      passwordError ||
      firstNameError ||
      lastNameError ||
      phoneError ||
      countryError
    ) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setFirstName({...firstName, error: firstNameError});
      setLastName({...lastName, error: lastNameError});
      setPhone({...phone, error: phoneError});
      setCountry({...country, error: countryError});
    } else {
      signUp();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>SIGN UP</Text>
          <Text style={styles.descText}>
            Please fill below details to create a{' '}
            <Text style={{fontWeight: '700'}}>new account</Text>
          </Text>
        </View>

        <View>
          <TextInput
            style={styles.textInputStyle}
            placeholder="First Name"
            placeholderTextColor="black"
            onChangeText={text => setFirstName({value: text, error: ''})}
          />

          {firstName.error ? (
            <Text style={styles.error}>{firstName.error}</Text>
          ) : null}

          <TextInput
            style={styles.textInputStyle}
            placeholder="Last Name"
            placeholderTextColor="black"
            onChangeText={text => setLastName({value: text, error: ''})}
          />
          {lastName.error ? (
            <Text style={styles.error}>{lastName.error}</Text>
          ) : null}

          <View style={{marginHorizontal: 20, marginVertical: 10}}>
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
                  <Text style={{color: 'white', marginLeft: -7, fontSize: 12}}>
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
            </View>
          </View>
          {phone.error ? <Text style={styles.error}>{phone.error}</Text> : null}

          <TextInput
            style={styles.textInputStyle}
            placeholder="Your Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            onChangeText={text => setEmail({value: text, error: ''})}
          />
          {email?.error ? (
            <Text style={styles.error}>{email.error}</Text>
          ) : null}

          <TextInput
            style={styles.textInputStyle}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={text => setPassword({value: text, error: ''})}
          />
          <Text style={[styles.termsTextStyle, {marginLeft: 20}]}>
            Password can be any 4 digits and/or letters
          </Text>
          {password.error ? (
            <Text style={styles.error}>{password.error}</Text>
          ) : null}

          <TextInput
            style={styles.textInputStyle}
            placeholder="Country"
            placeholderTextColor="black"
            keyboardType="email-address"
            onChangeText={text => setCountry({value: text, error: ''})}
          />
          {country.error ? (
            <Text style={styles.error}>{country.error}</Text>
          ) : null}

          <TouchableOpacity
            activeOpacity={1}
            style={styles.termsStyle}
            onPress={handleTermsCheckbox}>
            <TouchableOpacity
              onPress={() => setTermsChecked(!termsChecked)}
              style={styles.checkBox}>
              {termsChecked == true ? (
                <Image source={require('../assets/images/check.png')} />
              ) : (
                <Text> </Text>
              )}
            </TouchableOpacity>
            <Text style={styles.termsTextStyle}>
              I Agree to the Terms & Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={{margin: 20}} activeOpacity={0.2}>
        <ButtonComponent onPress={onSubmitFormHandler} title="SIGN UP" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#F5F5F7',
  },
  error: {
    fontSize: 14,
    color: 'red',
    paddingHorizontal: 4,
    paddingTop: 4,
    marginLeft: 15,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontFamily: 'Nunito-Black',
    fontSize: 20,
    marginVertical: 6,
    marginTop: 20,
    color: COLOR.primary,
  },
  descText: {
    fontFamily: 'Nunito-Semibold',
    fontSize: 16,
    color: '#1D2126',
    textAlign: 'center',
    marginHorizontal: 70,
  },
  textInputStyle: {
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 6,
    elevation: 4,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1D2126',
  },
  termsStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    // marginVertical: 12,
    // paddingVertical: 6,
    fontWeight: 'bold',
    alignSelf: 'baseline',
  },
  termsTextStyle: {
    marginLeft: 10,
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Nunito-Semibold',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginBottom: 3,
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
export default SignUpScreen;
