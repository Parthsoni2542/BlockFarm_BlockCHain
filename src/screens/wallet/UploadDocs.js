import * as React from 'react';
import {StyleSheet, View, Image, Alert, Text as Texter} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';

import GLOBALS from '../../globals';
import Text from '../../components/Text';
// import Button from '../../components/Button';
import Button from '../../components/button';
import GlobalHeader from '../../components/GlobalHeader';
import HeaderImage from '../../components/headerLogo';
// import ButtonGradient from '../../components/ButtonGradient';

function WalletVerification(props) {
  const store = useSelector(state => state);
  console.log(store.token,'store.token')
  const [ID, setID] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  console.log(ID,'ID',address,'address')

  const _pickImage = async action => {
    try {
      // Pick a single file
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log(res, 'res');
      if (action === 'ID') {
        setID({
          uri: res[0].uri,
          name: res[0].name,
          type: res[0].type,
          size: res[0].size,
        });
      }
      if (action === 'Address') {
        setAddress({
          uri: res[0].uri,
          name: res[0].name,
          type: res[0].type,
          size: res[0].size,
        });
      }
    } catch (err) {
      Alert.alert('Error', 'Kindly retry.');
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      var formdata = new FormData();
      formdata.append('file', {
        uri: ID.uri,
        name: ID.name,
        type: ID.type,
      });
      if (address) {
        formdata.append('file', {
          uri: address.uri,
          name: address.name,
          type: address.type,
        });
      }

      await fetch(GLOBALS.Constants.UPLOAD_KYC, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
        body: formdata,
        redirect: 'follow',
      });

      props.navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'There was an error submitting your documents.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{margin: 10}}>
          <HeaderImage />
          <Texter style={{color: '#0172CC', fontSize: 25, textAlign: 'center',margin: 20,fontWeight:'bold'}}>
            Business Document
          </Texter>
        </View>
        <View style={styles.text}>
          <Text
            text="In order that we can redeem your Tokens so that you can use it for
            different purposes, please complete your Know Your Consumer (KYC)
            steps. Have your Goverment ID or Proof of Address Documents ready
            for these steps."
          />
        </View>
        <Button
          onPress={() => _pickImage('ID')}
          style={styles.marginVertical}
          name="Upload your Goverment ID"
          rightIcon={
            ID === '' ? (
              <Image
                source={require('../../assets/images/upload.png')}
                style={styles.uploadImg}
              />
            ) : (
              <Icon name="check" color="green" size={20} />
            )
          }
        />
        <Button
          onPress={() => _pickImage('Address')}
          style={styles.marginVertical}
          name="Upload your Proof of Address"
          rightIcon={
            address === '' ? (
              <Image
                source={require('../../assets/images/upload.png')}
                style={styles.uploadImg}
              />
            ) : (
              <Icon name="check" color="green" size={20} />
            )
          }
        />
      </View>
      <Button
        onPress={() => {
          if (ID !== '') {
            onSubmit();
          } else {
            Alert.alert('Error', 'Your Government ID is required to continue.');
          }
        }}
        // disabled={loading}
        // loading={loading}
        name={'SUBMIT'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: GLOBALS.Styles.backgroundColor,
  },
  text: {
    marginBottom: 20,
  },
  uploadImg: {
    resizeMode: 'contain',
  },
  marginVertical: {
    marginVertical: 8,
  },
});

export default WalletVerification;
