import React, {useEffect, useRef, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash-screen';
import CreateAccountScreen from '../screens/createAccount';
import SocialFirst from '../screens/socialFirst';
import SocialSecond from '../screens/socialSecond';
import OTPSignUp from '../screens/phoneSignUp';
import OTPVerify from '../screens/OTPVerify';
import OTPVerified from '../screens/phoneVerified';
import SettingScreen from '../screens/setting';
import SettingSecond from '../screens/settingSecond';
import ProfileScreen from '../screens/profile';
import SignUpScreen from '../screens/signUp';
import ProfileSecond from '../screens/profileSecond';
import AddNewQR from '../screens/AddNewQR';
import NewPckSeed from '../screens/NewPckSeed';
import NewUPC from '../screens/NewUPC';
import NewUpcCode from '../screens/NewUpcCode';
import PlantStatus from '../screens/PlantStatus';
import Login from '../screens/Login';
import FarmerMonitering from '../screens/FarmerMonitering';
import SellerOrder from '../screens/SellerOrder';
import WholeSelerProduct from '../screens/WholeSelerProduct';
import ProductSelection from '../screens/ProductSelection';
import WholeSelerCheckOut from '../screens/WholeSelerCheckOut';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import FarmerCheckout from '../screens/FarmerCheckout';
import {BASE_URL} from '../api';
import {GET_USER, GET_USERS, LOG_IN} from '../api/ApiConstants';
import {missedCallVerify} from '../api/ApiFunctions';
import DropdownAlert from 'react-native-dropdownalert';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import ProductSearch from '../screens/ProductSearch';
import ChatScreen from '../ChatScreen';
import MessagesScreen from '../MessageScreen';
import UnlockWallet from '../screens/wallet/UnlockWallet';
import Home from '../screens/wallet/Home';
import RecoverPhrase from '../screens/wallet/RecoveryPhrase';
import Main from '../screens/wallet/Main';
import PinCodeNew from '../screens/wallet/PinCodeNew';
import Wallet from '../screens/wallet/Wallet';
import WalletVerification from '../screens/wallet/UploadDocs';
import SelectUser from '../screens/wallet/SelectUser';
import Actions from '../screens/wallet/Send';
import {DrawerNavigation} from './drawerNavigation';

// import Header from '../components/Header';

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    initialRouteName="splash"
    screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="splash" component={SplashScreen} />
    <AuthStack.Screen name="login" component={Login} />
    {/* <AuthStack.Screen name="phoneVerifieds" component={phoneVerified} /> */}
    <AuthStack.Screen name="signUp" component={SignUpScreen} />
    <AuthStack.Screen name="phoneSignUp" component={OTPSignUp} />
    <AuthStack.Screen name="phoneVerify" component={OTPVerify} />
    <AuthStack.Screen name="phoneVerified" component={OTPVerified} />
    <AuthStack.Screen name="socialFirst" component={SocialFirst} />
    <AuthStack.Screen name="socialSecond" component={SocialSecond} />
    <AuthStack.Screen name="createAccount" component={CreateAccountScreen} />
    <AuthStack.Screen name="Second" component={ProfileScreen} />
    <AuthStack.Screen name="profile" component={ProfileScreen} />
    {/* For Testing Ads than removed wholeSeller stack */}
    <AuthStack.Screen name="sellerOrder" component={SellerOrder} />
    <AuthStack.Screen name="wholeSelerProduct" component={WholeSelerProduct} />
    <AuthStack.Screen name="productSelection" component={ProductSelection} />
    <AuthStack.Screen
      name="wholeSelerCheckOut"
      component={WholeSelerCheckOut}
    />

    {/* For Chat */}
    <AuthStack.Screen name="ChatScreen" component={ChatScreen} />
    <AuthStack.Screen name="MessagesScreen" component={MessagesScreen} />

    {/* For Wallet */}
    <AuthStack.Screen name="DrawerNavigation" component={DrawerNavigation} />
    <AuthStack.Screen name="UnlockWallet" component={UnlockWallet} />
    <AuthStack.Screen name="Home" component={Home} />
    <AuthStack.Screen name="RecoverPhrase" component={RecoverPhrase} />
    <AuthStack.Screen name="Main" component={Main} />
    <AuthStack.Screen name="PinCodeNew" component={PinCodeNew} />
    <AuthStack.Screen name="Wallet" component={Wallet} />
    <AuthStack.Screen name="UploadDocs" component={WalletVerification} />
    <AuthStack.Screen name="SelectUser" component={SelectUser} />
    <AuthStack.Screen name="Send" component={Actions} />
    <FarmerStack.Screen name="settingSecond" component={SettingScreen} />
    <FarmerStack.Screen name="farmerMonitering" component={FarmerMonitering} />
    <FarmerStack.Screen name="AddQR" component={AddNewQR} />
    <FarmerStack.Screen name="pckSeed" component={NewPckSeed} />
    <FarmerStack.Screen name="newUPC" component={NewUPC} />
    <FarmerStack.Screen name="newUpcCode" component={NewUpcCode} />
    <FarmerStack.Screen name="plant" component={PlantStatus} />
    <FarmerStack.Screen name="FarmerCheckout" component={FarmerCheckout} />
  </AuthStack.Navigator>
);

const FarmerStack = createNativeStackNavigator();
const FarmerStackScreen = () => (
  <FarmerStack.Navigator
    screenOptions={{headerShown: false, drawerPosition: 'right'}}>
    <FarmerStack.Screen name="Second" component={ProfileSecond} />
    <FarmerStack.Screen name="farmerMonitering" component={FarmerMonitering} />
    <FarmerStack.Screen name="AddQR" component={AddNewQR} />
    <FarmerStack.Screen name="pckSeed" component={NewPckSeed} />
    <FarmerStack.Screen name="newUPC" component={NewUPC} />
    <FarmerStack.Screen name="newUpcCode" component={NewUpcCode} />
    <FarmerStack.Screen name="plant" component={PlantStatus} />
    <FarmerStack.Screen name="FarmerCheckout" component={FarmerCheckout} />
    <FarmerStack.Screen name="settingSecond" component={SettingScreen} />
    <FarmerStack.Screen name="ChatScreen" component={ChatScreen} />
    <FarmerStack.Screen name="MessagesScreen" component={MessagesScreen} />
  </FarmerStack.Navigator>
);

const WholeSellerStack = createNativeStackNavigator();
const WholeSellerScreen = () => (
  <WholeSellerStack.Navigator screenOptions={{headerShown: false}}>
    <WholeSellerStack.Screen name="profile" component={ProfileScreen} />
    <WholeSellerStack.Screen
      name="wholeSelerCheckOut"
      component={WholeSelerCheckOut}
    />
    <WholeSellerStack.Screen name="productSearch" component={ProductSearch} />
    <WholeSellerStack.Screen
      name="productSelection"
      component={ProductSelection}
    />
    <WholeSellerStack.Screen
      name="wholeSelerProduct"
      component={WholeSelerProduct}
    />
    <WholeSellerStack.Screen name="sellerOrder" component={SellerOrder} />
    <WholeSellerStack.Screen name="header" component={Header} />
    <WholeSellerStack.Screen name="settingFirst" component={SettingSecond} />
  </WholeSellerStack.Navigator>
);

export default () => {
  const initialLoginState = {
    isLoading: true,
    role: null,
    token: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          role: action.role,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          role: action.role,
          token: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          role: null,
          token: null,
          isLoading: false,
        };
      case 'LOADING':
        return {
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );
  console.log(
    '🚀 ~ file: stackNavigation.js ~ line 122 ~ loginState',
    loginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (id, pin) => {
        try {
          const response = await missedCallVerify({
            id,
            pin,
          });
          if (response.data.validated) {
            const token = response.token;
            const role = response.user.roles;
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userRole', role[0]);
            dispatch({type: 'LOGIN', token: token, role: role[0]});
          } else {
            Alert.alert('Oops!', 'OTP didnt match', [{text: 'Okay'}]);
            dispatch({});
          }
        } catch (error) {
          Alert.alert('Oops!', '@OTP didnt match', [{text: 'Okay'}]);
        }
      },

      getProfile: async () => {
        const response = await axios.get(`${BASE_URL}${GET_USER}`);
        console.log(
          '🚀 ~ file: stackNavigation.js ~ line 172 ~ getProfile: ~ response',
          response,
        );
      },

      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userRole');
        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let token;
      token = null;
      let role;
      role = null;
      try {
        token = await AsyncStorage.getItem('userToken');
        role = await AsyncStorage.getItem('userRole');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: token, role: role});
    }, 1000);
  }, []);

  if (loginState?.isLoading) {
    return <Loading />;
  }

  const AppStack = createStackNavigator();
  const AppStackScreen = () => (
    <AuthContext.Provider value={authContext}>
      <AppStack.Navigator
        screenOptions={{headerShown: false, drawerPosition: 'right'}}>
        {loginState?.role === '5ebcff6991b7084528ebeb19' ? (
          <AppStack.Screen
            name="farmer"
            component={FarmerStackScreen}
            options={{
              drawerLabel: () => null,
              title: null,
              drawerIcon: () => null,
            }}
          />
        ) : (
          <AppStack.Screen name="seller" component={WholeSellerScreen} />
        )}
      </AppStack.Navigator>
    </AuthContext.Provider>
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* onlyfor Wallet and Socket */}
        {/* <AuthStack.Navigator
          initialRouteName="UnlockWallet"
          screenOptions={{headerShown: false}}>
          <AuthStack.Screen name="ChatScreen" component={ChatScreen} />
          <AuthStack.Screen name="MessagesScreen" component={MessagesScreen} />
          <AuthStack.Screen name="UnlockWallet" component={UnlockWallet} />
          <AuthStack.Screen name="Home" component={Home} />
          <AuthStack.Screen name="RecoverPhrase" component={RecoverPhrase} />
          <AuthStack.Screen name="Main" component={Main} />
          <AuthStack.Screen name='PinCodeNew' component={PinCodeNew} />
          <AuthStack.Screen name="Wallet" component={Wallet} />
          <AuthStack.Screen name="UploadDocs" component={WalletVerification} />
          <AuthStack.Screen name="SelectUser" component={SelectUser} />
          <AuthStack.Screen name="Send" component={Actions} />
        </AuthStack.Navigator>   */}
        {/* onlyfor Wallet and Socket End */}
        {loginState?.token ? <AppStackScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
