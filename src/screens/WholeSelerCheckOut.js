import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SearchBox from '../components/SearchBox';
import ProductSelectionCard from '../components/ProductSelectionCard';
import {COLOR} from '../custom-styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CouponCard from '../components/CouponCard';
import Header from '../components/Header';
import {useVoiceSearch} from '../hooks/useVoiceSearch';
import {Model} from '../components/Model';
import DocumentPicker from 'react-native-document-picker';
import {useState} from 'react';


import { IronSourceRewardedVideo } from '@wowmaking/react-native-iron-source';
import { useEffect } from 'react';



const WholeSelerCheckOut = ({navigation}) => {
  const {result, visible, setResult, startVoiceSearch} = useVoiceSearch();
  const [ID, setID] = useState();

  const showRewarded = () =>{
    IronSourceRewardedVideo.isRewardedVideoAvailable().then((available) => {
      if (available) {
        IronSourceRewardedVideo.showRewardedVideo();
        // navigation.navigate('SignUpCompleted');
        IronSourceRewardedVideo.initializeRewardedVideo();
      } else {
        // navigation.navigate('SignUpCompleted');
        // throw new Error('No video available');
        IronSourceRewardedVideo.initializeRewardedVideo();
  
        console.log('No a')
      }
    })
  }
  
  useEffect(()=>{
    IronSourceRewardedVideo.initializeRewardedVideo();
    IronSourceRewardedVideo.addEventListener('ironSourceRewardedVideoAdRewarded', res => {
      console.warn('Rewarded!', res)
    });
  },[])
  const onOrderPic = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    setID({
      uri: res[0].uri,
      name: res[0].name,
      type: res[0].type,
      size: res[0].size,
    });
  };
  return (
    <ScrollView>
      <View style={StyleSheet.container}>
        <Header navigation={navigation} />
        <SearchBox
          value={result}
          onChangeText={text => setResult(text)}
          onPress={startVoiceSearch}
          placeholder="Search all farms..."
        />
        <View style={styles.totalView}>
          <Text style={styles.normalText}>Order Number</Text>
          <Text style={styles.normalText}>SGN56768</Text>
        </View>
        <View style={styles.totalView}>
          <Text style={styles.normalText}>Delivery Status</Text>
          <Text style={styles.normalText}>In progress</Text>
        </View>
        <Text style={styles.orderText}>Cancel Order (Before Delivery)</Text>
        <TouchableOpacity activeOpacity={0.9}
        //  onPress={() => onOrderPic()}
        onPress={() => {
          showRewarded()
          onOrderPic()
         }}
        
        >
          <CouponCard title="Return Order (Upload Photos of Items)" />
        </TouchableOpacity>

        <View style={styles.card}>
          <ProductSelectionCard title="East SEED1" number="55.5" />
          <ProductSelectionCard title="East SEED1" number="55.5" />
          <ProductSelectionCard title="East SEED1" number="55.5" />
          
        </View>

        <View
          style={{
            width: wp('90%'),
            height: hp('4%'),
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',

            justifyContent: 'space-between',
            paddingHorizontal: wp('3%'),
            // borderWidth: 1,
            marginTop: '-15%',
            borderTopWidth: 0.3,
            // padding: 5
          }}>
          <Text style={styles.text}>Total</Text>
          <Text style={styles.text}>$105</Text>
        </View>

        <Model visible={visible} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),

    backgroundColor: 'white',
  },
  card: {
    height: hp('50%'),
  },
  totalView: {
    width: wp('90%'),
    height: hp('4%'),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
    // borderWidth: 1,
    marginTop: 5,
  },
  bottomView: {
    width: wp('90%'),
    height: hp('4%'),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
    justifyContent: 'space-between',
    paddingHorizontal: wp('3%'),
  },
  midContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('15%'),
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0072CC',
  },
  normalText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.black,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.black,
    marginVertical: 30,
    width: wp('85%'),
    alignSelf: 'center',
  },
});

export default WholeSelerCheckOut;
