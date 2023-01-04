import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FarmerHeader from '../components/FarmerHeader';


import { IronSourceRewardedVideo } from '@wowmaking/react-native-iron-source';
const PlantStatus = ({navigation}) => {

 

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
  return (
    <View style={styles.container}>
      <FarmerHeader navigation={navigation} />
      {/* <ScrollView> */}
      <TouchableOpacity
       onPress={() => {
        showRewarded()
       }}
      //  onPress={() => navigation.navigate('farmerMonitering')}
      >
        <Image
          source={require('../assets/images/plantStatus.png')}
          style={styles.img}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>Sprouting</Text>
        <Text style={styles.text}>Transplant Due in 25 Days</Text>
      </View>
      <View style={styles.button}>
        <LinearGradient
          style={styles.btnStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#473692', '#87BB40']}>
          <Text style={styles.textbtn}>Transplant Early</Text>
        </LinearGradient>
        <LinearGradient
          style={styles.btnStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#473692', '#87BB40']}>
          <Text style={styles.textbtn}>Force Harvest</Text>
        </LinearGradient>
      </View>
      <Text style={styles.text}>History</Text>
      <Image
        source={require('../assets/images/calendar.png')}
        style={styles.calendar}
      />
      <ScrollView>
        <Image
          source={require('../assets/images/card.png')}
          style={styles.card}
        />
        <Image
          source={require('../assets/images/card.png')}
          style={styles.card}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

    flex: 1,
  },
  calendar: {
    width: '80%',
    height: '20%',
    alignSelf: 'center',
    marginTop: '4%',
    borderRadius: 15,
  },
  card: {
    marginTop: 15,
    alignSelf: 'center',
  },
  textbtn: {
    color: '#fff',
  },
  button: {
    flexDirection: 'row',
    height: '10%',
  },
  btnStyle: {
    width: '30%',
    height: '50%',
    alignSelf: 'center',
    marginLeft: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
    borderRadius: 8,
  },
  img: {
    alignSelf: 'center',
    borderRadius: 5,
    width: '95%',
  },
  headerText: {
    fontFamily: 'Sansation',
    fontWeight: '700',
    color: '#1D2126',
    marginTop: 10,
    left: 20,
    fontSize: 15,
  },
  text: {
    fontFamily: 'Sansation',
    fontWeight: '400',
    color: '#1D2126',
    left: 20,
    fontSize: 15,
  },
});

export default PlantStatus;
