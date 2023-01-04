import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import HeaderImage from '../components/headerLogo';
import ListItem from '../components/listItem';
import Moniter from '../assets/images/moniter.png';
import Purchase from '../assets/images/purchase.png';
import Order from '../assets/images/order.png';
import User from '../assets/images/user.png';
import History from '../assets/images/history.png';
import Wallet from '../assets/images/wallet.png';
import Email from '../assets/images/email.png';
import Logout from '../assets/images/logout.png';
import {COLOR} from '../custom-styles/colors';
import {useSelector} from 'react-redux';
const SettingScreen = ({navigation}) => {
  const store = useSelector(state => state.login);
  console.log(store, 'store');
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <StatusBar hidden={true} />

        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          // style={{backgroundColor: 'red'}}
          colors={['#FFFFFF00', '#E3EFF8']}>
          <Image
            style={styles.picture}
            source={require('../assets/images/listPicture.png')}
          />
          <HeaderImage />
        </LinearGradient>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.searchIcon}
            source={require('../assets/images/search.png')}
          />
        </View>
        <TextInput
          style={styles.fieldInputStyle}
          placeholderTextColor="black"
          placeholder="Inventory Search"
        />
        <View style={styles.list}>
          {store?.roles[0].name == "farmer" ? (
            <>
              <ListItem
                onPress={() => navigation.navigate('farmerMonitering')}
                imageSource={Moniter}
                title="Farm Monitor"
              />
              <ListItem
                onPress={() => navigation.navigate('AddQR')}
                imageSource={Purchase}
                title="New Purchase"
              />
            </>
          ) : null}

          <ListItem
            onPress={() => navigation.navigate('FarmerCheckout')}
            imageSource={Order}
            title="My Orders"
          />
          <ListItem imageSource={History} title="Purchased History" />
          <ListItem
            onPress={() => navigation.navigate('UnlockWallet')}
            imageSource={Wallet}
            title="My Wallet"
          />
          <ListItem
            onPress={() => navigation.navigate('profile')}
            imageSource={User}
            title="My Profile"
          />
          <ListItem
            onPress={() => navigation.navigate('MessagesScreen')}
            imageSource={Email}
            title="Messages"
          />
          <ListItem
            onPress={() => navigation.navigate('login')}
            imageSource={Logout}
            title="Logout"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  picture: {
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: -10,
  },
  fieldInputStyle: {
    backgroundColor: '#FFF',
    borderRadius: 6,
    elevation: 2,
    // flex: 1,
    paddingLeft: 40,
    fontSize: 15,
    marginTop: 8,
    color: '#1D2126',
    marginBottom: 2,
    marginHorizontal: 40,
    marginTop: 30,
  },
  searchIcon: {
    position: 'absolute',
    left: 50,
    top: 45,
    elevation: 3,
  },
  list: {
    marginVertical: 30,
    marginLeft: 60,
    marginBottom: 60,
  },
});

export default SettingScreen;
