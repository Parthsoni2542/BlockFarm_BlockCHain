import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Dots from 'react-native-vector-icons/dist/Entypo';
// import { useNavigation } from "@react-navigation/native";
// import {
// 	Container,
// 	Content,
// 	List,
// 	ListItem,
// 	Left,
// 	Body,
// 	Right,
// 	Thumbnail
// } from "native-base";

// import { p1, p2, p3, p4, p5, p6, p7, p8 } from "../theme/theme";

import Wrapper from './components/Wrapper';
import {TextInput} from 'react-native-gesture-handler';
import {ActivityIndicator, Divider} from 'react-native-paper';
import HeaderImage from './components/headerLogo';


import { IronSource ,IronSourceInterstitials} from '@wowmaking/react-native-iron-source';

const MessagesScreen = ({navigation}) => {
  const [Contact, setContact] = useState();
  const [search, setSearch] = useState('');
  const [Loading, setLoading] = useState('');
  const ref = useRef();
  const [IronLoaded , setIronLoaded] = useState(false)


  const ironsourceinterstitialsAd=()=>{
    //   IronSourceInterstitials.loadInterstitial();
    // IronSourceInterstitials.addEventListener('interstitialDidLoad', () => {
    //   IronSourceInterstitials.showInterstitial();
    // });
    IronSourceInterstitials.loadInterstitial();
    console.log('android IronSource interstitial :')

    IronSourceInterstitials.addEventListener('interstitialDidLoad', () => {
      // IronSourceInterstitials.showInterstitial();
      setIronLoaded(true)

    });
    IronSourceInterstitials.addEventListener('interstitialDidFailToLoadWithError', (err) => {
      console.warn('Failed to load inter Interstitial ', err);
    // IronSourceInterstitials.loadInterstitial();

    });
    IronSourceInterstitials.addEventListener('interstitialDidFailToShowWithError', (err) => {
      console.warn('Failed to show inter', err);
    });
    IronSourceInterstitials.addEventListener('interstitialDidClose', () => {
    });
    
    
      }

  useEffect(() => {
    ironsourceinterstitialsAd()

    const unsubscriber = navigation.addListener('focus', () => {
    
      ironsourceinterstitialsAd()
    
      });
      IronSource.initializeIronSource('b61cc35d', 'userId', {
        validateIntegration: true,
      }).then(() => {
        ironsourceinterstitialsAd()
        // console.warn('Init finished lk;k;');
     
      });
    setLoading(true);
    fetch(
      `https://hopeaccelerated-chat.herokuapp.com/api/v1/user/contacts?userId=${'606594c97d71c20017e38ad8'}&keyword=${search}`,
    )
      .then(res => res.json())
      .then(response => {
        setContact(response.data);
        setLoading(false);
      });
  }, [search]);
  return (
    <>
      {/* <StatusBar backgroundColor="white" /> */}
      <Wrapper>
        <Header back={() => navigation.goBack()} />
        <HeaderImage />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 25,
          }}>
          <TextInput
            placeholder="Search User Name"
            placeholderTextColor="#ADADAD"
            onChangeText={text => setSearch(text)}
            style={{
              color: 'black',
              textAlign: 'center',
              borderWidth: 1,
              borderColor: 'black',
              width: '100%',
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
            }}
          />
        </View>
        {Loading == true ? (
          <View
            style={{
              height: Dimensions.get('screen').height / 2,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'small'} color="black" />
          </View>
        ) : (
          <FlatList
            data={Contact}
            keyExtractor={item => item.id}
            // Divider={true}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            renderItem={({item}) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  {  if(IronLoaded == true){

                    IronSourceInterstitials.showInterstitial();
    
                    navigation.navigate('ChatScreen', {
                      name: item.name,
                      userId: item.userId,
                    })
                    // navigation.navigate("CongratulationBadge")
                    // ironsourceinterstitialsAd()
                    // setLoaded(false)
                  } else{
                    // navigation.navigate("CongratulationBadge")
                    navigation.navigate('ChatScreen', {
                      name: item.name,
                      userId: item.userId,
                    })
    
                  }
    }
                 
                }
                // onPress={() =>
                //   navigation.navigate('ChatScreen', {
                //     name: item.name,
                //     userId: item.userId,
                //   })
                // }
                style={{
                  // marginVertical: 3,
                  top: 4,
                  borderWidth: 1,
                  borderBottomColor: '#404040',
                  borderColor: '#fff',
                  padding: 2,
                  width: Dimensions.get('screen').width / 1.1,
                  // marginVertical:
                  marginVertical: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: item.avatar}}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 200,
                        resizeMode: 'stretch',
                      }}
                    />
                    {/* {item.availableStatusMobile ===
									"offline" ? (
										<Image
											source={require("../assets/online.png")}
											style={{
												width: 10,
												height: 10,
												top: "60%",
												// position:'absolute'
												left: -5,
												tintColor: "#ADADAD"
											}}
										/>
									) : (
										<Image
											source={require("../assets/online.png")}
											style={{
												width: 10,
												height: 10,
												top: "60%",
												// position:'absolute'
												left: -5
											}}
										/>
									)} */}
                  </View>

                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 19,
                        left: 10,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        left: 10,
                        top: 5,
                      }}>
                      {item.phone}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        )}
      </Wrapper>
    </>
  );
};

const Header = ({back}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          // marginTop: 19,
          backgroundColor: 'white',
          marginBottom: 30,
        }}>
        <TouchableOpacity onPress={back}>
          <Icon
            name="arrowleft"
            style={{marginLeft: 5, padding: 10}}
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 23,
            fontFamily: 'Sansation',
            marginLeft: 80,
            marginTop: 17,

            color: '#000',
            // fontWeight: "bold",
          }}>
          Messages
        </Text>

        <TouchableOpacity>
          <Dots
            style={{
              marginLeft: '48%',
              fontSize: 24,

              marginTop: 12,

              // fontWeight: "100",
            }}
            name="dots-three-vertical"
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
