import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import HeaderImage from './headerLogo';
import {COLOR} from '../custom-styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AuthContext} from '../context/AuthContext';
import { DrawerActions } from '@react-navigation/native';

const FarmerHeader = ({navigation}) => {
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
            onPress={() => navigation.navigate('farmerMonitering')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>Farm Monitor</Text>
            {/* </darGradient> */}
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('AddQR')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>New Purchase </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('FarmerCheckout')}
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
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>Purchased History</Text>
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('Coming Soon!')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>My Wallet </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Second')}
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
            onPress={() => Alert.alert('Coming Soon!')}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? COLOR.primary : 'white',
                padding: pressed ? 10 : 0,
                borderRadius: pressed ? 10 : 0,
              },
              styles.drawerItems,
            ]}>
            <Text>Messages </Text>
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
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'center',
        }}>
        <HeaderImage />
        <TouchableOpacity
          // onPress={toggleModal}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            top: 25,
            right: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../assets/images/drawerDots.png')} />
        </TouchableOpacity>
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
    margin: 20,
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});

export default FarmerHeader;
