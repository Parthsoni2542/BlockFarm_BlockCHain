import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import ProductSearch from '../screens/ProductSearch';
import WholeSelerCheckOut from '../screens/WholeSelerCheckOut';
import ProfileScreen from '../screens/profile';
import UnlockWallet from '../screens/wallet/UnlockWallet';
import MessagesScreen from '../MessageScreen';
import {DrawerActions} from '@react-navigation/native';
import WholeSelerProduct from '../screens/WholeSelerProduct';
import FarmerMonitering from '../screens/FarmerMonitering';
import NewUpcCode from '../screens/NewUpcCode';
import NewPckSeed from '../screens/NewPckSeed';
import PlantStatus from '../screens/PlantStatus';
import ProductSelection from '../screens/ProductSelection';
import NewUPC from '../screens/NewUPC';
import AddNewQR from '../screens/AddNewQR';
import {useSelector} from 'react-redux';
import AllProduct from '../screens/AllPrduct';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = props => {
  return (
    <Drawer.Navigator
      screenOptions={{drawerPosition: 'right'}}
      initialRouteName="profile"
      // screenOptions={{ drawerPosition: 'right'}}
      drawerContent={prop => <DrawerContent {...prop} {...props} />}>
      <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Product Search"
        component={ProductSearch}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="All Product"
        component={WholeSelerProduct}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="My All Orders"
        component={ProductSelection}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="wholeSelerCheckOut"
        component={WholeSelerCheckOut}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="Orders"
        component={AllProduct}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Pick of seed"
        component={NewPckSeed}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="New Product Qr code"
        component={NewUPC}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="New UPC code"
        component={NewUpcCode}
        options={{
          headerShown: false,
        }}
      />

      <Drawer.Screen
        name="My wallet"
        component={UnlockWallet}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const DrawerContent = ({props, navigation}) => {
  // const handleLogout = async () => {
  //   await AsyncStorage.removeItem('otptoken');
  //   navigation.navigate('MainScreen');
  // };
  const store = useSelector(state => state.login);
  console.log(store, 'store');
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginVertical: 20}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5%',
          }}
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Entypo name="circle-with-cross" size={30} color={'#87BB40'} />
        </TouchableOpacity>

        {store?.roles[0].name == 'farmer' ? (
          <>
            {/* <ListItem
              onPress={() => navigation.navigate('farmerMonitering')}
              imageSource={Moniter}
              title="Farm Monitor"
            /> */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                padding: '5%',
              }}
              onPress={() => navigation.navigate('farmerMonitering')}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Farm Monitor
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                padding: '5%',
              }}
              onPress={() => navigation.navigate('AddQR')}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                New Purchase
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5%',
          }}
          onPress={() => navigation.navigate('Product Search')}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Product Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5%',
          }}
          onPress={() => navigation.navigate('Orders')}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            My Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5%',
          }}
          onPress={() => navigation.navigate('My wallet')}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            My Wallet
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5%',
          }}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            MY PROFILE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5%',
          }}
          onPress={() => navigation.navigate('Messages')}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            Messages
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '5%',
          }}
          onPress={() => props.navigation.navigate('Logout')}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
