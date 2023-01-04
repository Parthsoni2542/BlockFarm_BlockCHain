import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../custom-styles/colors';
import SearchBox from '../components/SearchBox';
import FarmerHeader from '../components/FarmerHeader';

import DocumentPicker from 'react-native-document-picker';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-9529146124037412/2924314419';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const NewUPC = ({navigation}) => {
  
  const [loaded , setLoaded] = useState(false)
  const [ID, setID] = useState();
  const onTakePhoto = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log(res, 'res');

    setID({
      uri: res[0].uri,
      name: res[0].name,
      type: res[0].type,
      size: res[0].size,
    });
    navigation.navigate('New Product Qr code');
  };

  const LoadRAd =()=>{
    rewarded.load();

    setLoaded(true);

    rewarded.load();
  
    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true)
      console.log('rewarded load')
   
  
    });
  }

  useEffect(() => {
    rewarded.load();

    LoadRAd()

     navigation.addListener('focus', () => {
      LoadRAd()
  
    });
    
   
  
  }, []);

  return (
    <View style={styles.container}>
      <FarmerHeader navigation={navigation} />
      <SearchBox placeholder="Search all Inventory" />
      <Text style={styles.text}>Create a new UPC Code for Your Product</Text>
      <TouchableOpacity 
        onPress={() => {
          setLoaded(true)
          if (loaded == true) {
            // return null;
            rewarded.show();
            setLoaded(false)
      console.log('rewarded load con')
          
        }}
      }
      activeOpacity={0.7}>
        <LinearGradient
          style={styles.btnStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.linearStart, COLOR.linearEnd]}>
          <Text style={styles.btnText}>Enter Product name and Discription</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTakePhoto()}>
        <View style={styles.uploadpic}>
          <Image source={require('../assets/images/upload.png')} />
          <Text style={styles.fieldInputStyle}>
            Upload Photo of New product
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>{
          setLoaded(true)
          if (loaded == true) {
            // return null;
            rewarded.show();
            setLoaded(false)
      console.log('rewarded load con')
      navigation.navigate('New UPC code')
        }
        }}>
        <LinearGradient
          style={styles.btnStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[COLOR.linearStart, COLOR.linearEnd]}>
          <Text style={styles.btnText}>Approve your UPC Code</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  btnStyle: {
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 60,
    marginHorizontal: 8,
    // marginTop: 10,
  },
  btnText: {
    fontFamily: 'Sansation',
    backgroundColor: 'transparent',
    elevation: 2,
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  descText: {
    fontFamily: 'Sansation',
    fontWeight: '700',
    color: '#767676',
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 15,
    textAlign: 'center',
  },
  uploadpic: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 6,
    elevation: 4,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
    paddingLeft: 20,
    width: '90%',
    alignSelf: 'center',

    paddingRight: 20,
    height: 50,
  },
  fieldInputStyle: {
    paddingLeft: 10,
    flex: 1,
    color: '#000',
    fontWeight: 'bold',
  },
  text: {
    paddingTop: 20,
    alignSelf: 'center',
    paddingBottom: 20,
    color: '#808080',
  },
});

export default NewUPC;
