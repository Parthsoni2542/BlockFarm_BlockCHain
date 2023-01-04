import React, { useState } from 'react';
import { Image, View, StyleSheet, StatusBar } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import HeaderImage from '../components/headerLogo';
import ListItem from '../components/listItem';
import Order from '../assets/images/order.png';
import User from '../assets/images/user.png';
import History from '../assets/images/history.png';
import Wallet from '../assets/images/wallet.png';
import Email from '../assets/images/email.png';
import Search from '../assets/images/search.png';
import Logout from '../assets/images/logout.png';
const SettingSecond = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <StatusBar hidden={true} />

        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={['#FFFFFF00', '#E3EFF8']}>
          <Image
            style={styles.picture}
            source={require('../assets/images/listPicture.png')}
          />
          <HeaderImage />
        </LinearGradient>
        <View style={styles.list}>
          <ListItem onPres={() => navigation.navigate("wholeSelerProduct")} imageSource={Search} title="Product Search" />
          <ListItem onPres={() => navigation.navigate("wholeSelerCheckOut")} imageSource={Order} title="My Orders" />
          <ListItem imageSource={History} title="Purchased History" />
          <ListItem onPres={() => navigation.navigate("profile")} imageSource={User} title="My Profile" />
          <ListItem onPress={() => alert('Coming Soon')} imageSource={Wallet} title="My Wallet" />
          <ListItem onPress={() => alert('Coming Soon')} imageSource={Email} title="Messages" />
          <ListItem
            onPress={() => navigation.navigate('signUp')}
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
    alignSelf: 'center',
  },
});

export default SettingSecond;
