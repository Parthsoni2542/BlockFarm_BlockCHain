import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import {COLOR} from '../custom-styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import ButtonComponent from '../components/button';
import FarmerHeader from '../components/FarmerHeader';
import DocumentPicker from 'react-native-document-picker';


const NewPckSeed = ({navigation}) => {
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

  return (
    <View style={{flex: 1}}>
      <FarmerHeader navigation={navigation} />
      <View style={styles.container}>
        <Image
          source={require('../assets/images/pckSeed.png')}
          style={styles.img}
        />
        <Text style={styles.descText}>
          Please turn your camera on and adjust the lens to focus on plant tag
          in the box or field row where the new seeds have been inserted into
          the soil and scan the QR code
        </Text>
        <LinearGradient
          style={styles.btnStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#DCEBF6', '#FFFFFF']}>
          <ButtonComponent onPress={() => onTakePhoto()} title="Take Photo" />
        </LinearGradient>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 13,
    alignItems: 'center',
  },
  bottomHeading: {
    marginBottom: 20,
    color: COLOR.primary,
    fontWeight: '700',
    textAlign: 'center',
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
  img: {
    width: 201.7,
    height: 238.29,
    marginTop: 70,
  },
  descText: {
    fontFamily: 'Sansation',
    fontWeight: '700',
    color: '#767676',
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 15,
    textAlign: 'center',
    width: 313,
    paddingTop: 40,
  },
  btnStyle: {
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 6,
    marginHorizontal: 8,
    position: 'absolute',
    bottom: 0,
    // marginTop: 10,
  },
});

export default NewPckSeed;
