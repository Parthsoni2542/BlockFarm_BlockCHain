import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import HeaderImage from './headerLogo';
import {COLOR} from '../custom-styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AuthContext} from '../context/AuthContext';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';

const Header = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {signOut} = useContext(AuthContext);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <Modal
        animationInTiming={1}
        animationOutTiming={1}
        isVisible={isModalVisible}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
            backgroundColor: 'white',
            width: '50%',
            position: 'absolute',
            top: -20,
            right: -20,
          }}>
          <TouchableOpacity onPress={toggleModal} style={styles.drawerButton}>
            <Image source={require('../assets/images/cross.png')} />
          </TouchableOpacity>
          {/* <Text>Hello!</Text> */}

          <Pressable
            onPress={() => navigation.navigate('productSearch')}
            style={({pressed}) => [
              {
                backgroundColor: pressed
                  ? 'rgba(71, 54, 146, 1) && rgba(135, 187, 64, 1)'
                  : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>Product Search</Text>
            {/* </LinearGradient> */}
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('wholeSelerCheckOut')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>My Orders </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('profile')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>My Profile </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('UnlockWallet')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>My Wallet</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('MessagesScreen')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>Messages</Text>
          </Pressable>
          <Pressable
            onPress={() => signOut()}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
              {marginBottom: 30},
            ]}>
            <Text>Logout </Text>
          </Pressable>
        </View>
      </Modal>

      <View>
        <StatusBar
          translucent
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <View style={styles.hearder}>
          <HeaderImage />
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              position: 'absolute',
              right: 0,
              // borderWidth: 1,
              padding: 20
            }}>
            <Image
              source={require('../assets/images/drawerDots.png')}
              style={styles.dotpic}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: hp('5%'),
    alignItems: 'center',
    height: hp('2%'),
    marginBottom: hp('5%'),
    paddingBottom: hp('5%'),
    flexDirection: 'row',
  },
  drawerItems: {
    marginVertical: 15,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  drawerButton: {
    margin: 10,
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  hearder: {
    height: hp('2%'),
    flexDirection: 'row',
    marginTop: hp('3%'),

    width: wp('92%'),

    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dotpic: {
    marginTop: hp('5%'),
  },
});

export default Header;
