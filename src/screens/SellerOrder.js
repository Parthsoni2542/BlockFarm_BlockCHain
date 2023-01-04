import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { COLOR } from '../custom-styles/colors';
import Header from '../components/Header'
import SearchBox from '../components/SearchBox'
import LiveOrderCard from '../components/LiveOrder/LiveOrderCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import { Model } from '../components/Model';

import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useState } from 'react';
import { useEffect } from 'react';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-9529146124037412/2924314419';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const SellerOrder = ({ navigation }) => {
  const [loaded , setLoaded] = useState(false)

  const { result, visible, setResult, startVoiceSearch } = useVoiceSearch();

  const LoadRAd =()=>{
    rewarded.load()

    setLoaded(true)

    rewarded.load()
  
    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true)
      console.log('rewarded load')
      rewarded.show();
   
  
    });
  }

  useEffect(() => {
    rewarded.load();

    LoadRAd()

     navigation.addListener('focus', () => {
      LoadRAd()
    rewarded.load();



  
    });
    
   
  
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <SearchBox
          value={result}
          onChangeText={text => setResult(text)}
          onPress={startVoiceSearch}
          placeholder="Search all Inventory"
        />
        <View style={styles.text}>
          <Text style={styles.headerText}>Live Orders</Text>
          <Text style={styles.midText}>{`Review and Confirm Your Product 
            that has been Purchased`}</Text>
        </View>
        <View>
          <View style={
            styles.lebelText
          }>
          
{/*       
      <TouchableOpacity onPress={() => {
          setLoaded(true)
          if (loaded == true) {
            // return null;
            rewarded.show();
            setLoaded(false)
      console.log('rewarded load con')
          
        }}
      }>
        <View >
          
          <Text style={{fontSize:20,borderWidth:2}}>
            Testing ad
          </Text>
        </View>
      </TouchableOpacity> */}
            <Text style={styles.orderText}>ORDER_NO</Text>
            <Text style={styles.yesText}>YES</Text>
            <Text style={styles.noText}>NO</Text>
          </View>
          <LiveOrderCard />
          <LiveOrderCard />
          <LiveOrderCard />
          <LiveOrderCard />

        </View>
      </View>
      <Model visible={visible}/>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerText: {
    fontFamily: 'Sansation',
    fontSize: 20,

    marginVertical: 20,
    color: COLOR.primary,
  },
  text: {
    alignItems: "center"
  },
  midText: {
    fontFamily: 'Sansation',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '700',
  },
  lebelText: {
    flexDirection: "row",


  },
  orderText: {
    color: COLOR.primary,
    marginLeft: wp('10%')

  },
  yesText: {
    color: COLOR.primary,
    marginLeft: 30,
    position: "absolute",
    right: wp('6%'),
  },
  noText: {
    color: COLOR.primary,
    position: "absolute",
    right: wp('19%'),
  }
})


export default SellerOrder
