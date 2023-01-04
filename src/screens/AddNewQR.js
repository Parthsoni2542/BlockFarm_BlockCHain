import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView, Alert} from 'react-native';
import ButtonComponent from '../components/button';
import HeaderImage from '../components/headerLogo';

import {COLOR} from '../custom-styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {baseURL} from '../utils';


const AddNewQR = ({navigation}) => {
  const [data, setData] = useState();
  const [companyName, setCompanyName] = useState('');
  const [Designation, setDesignation] = useState('');
  const [establishmentYear, setEstablishmentYear] = useState('');
  const [bankInformation, setBankInformation] = useState('');
  const [address, setAddress] = useState('');

  const store = useSelector(state => state.login);
  console.log(store, 'store');

  const onSubmit = () => {
    // let formdata = new FormData();
    // formdata.append('type', store?.roles[0]?.name);
    // formdata.append('companyName', companyName);
    // formdata.append('address', store?.roles[0].name);
    // formdata.append('url', 'www.smithbro.org');
    // formdata.append('contactPerson', {
    //   name: 'Mr. John White',
    //   phone: store?.user?.phone,
    //   email: store?.user?.email,
    // });
    // formdata.append('establishmentYear', establishmentYear);
    // formdata.append('bankInformation', bankInformation);
    const data = {
      type: store?.roles[0]?.name,
      companyName: companyName,
      address: address,
      url: 'www.smithbro.org',
      contactPerson: {
        name: 'Mr. John White',
        phone: store?.user?.phone,
        email: store?.user?.email,
      },
      establishmentYear: establishmentYear,
      bankInformation: bankInformation,
      documents: [[]],
    };
    fetch(`${baseURL}/api/v1/rp/seller`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${store?.token}`,
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
        if(response.success == true){

          navigation.navigate('Pick of seed')
        } 
        else{
          Alert.alert(response.error)
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <HeaderImage />
        <Text style={styles.headerText}>Business Info</Text>
        <Text style={styles.descText}>{`We just need some more information about
      your business.`}</Text>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Key Contact Person Name"
          placeholderTextColor={'black'}
          // onChangeText={text => setCompanyName(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Contact"
          placeholderTextColor={'black'}
          keyboardType={'phone-pad'}
          // onChangeText={text => (text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Company Name"
          placeholderTextColor={'black'}
          onChangeText={text => setCompanyName(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="NID Name"
          placeholderTextColor={'black'}
          // onChangeText={text => setFirstName(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Designation"
          placeholderTextColor={'black'}
          onChangeText={text => setDesignation(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Year of Establishment"
          placeholderTextColor={'black'}
          onChangeText={text => setEstablishmentYear(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Address"
          placeholderTextColor={'black'}
          // keyboardType={'decimal-pad'}
          onChangeText={text => setAddress(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Bank Name & Branch"
          placeholderTextColor={'black'}
          // onChangeText={text => setFirstName(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Account Name"
          placeholderTextColor={'black'}
          // onChangeText={text => setFirstName(text)}
        />
        <TextInput
          style={styles.textInputStyle}
          placeholder="Bank Information"
          placeholderTextColor={'black'}
          onChangeText={text => setBankInformation(text)}
        />

        <LinearGradient
          style={styles.btnStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#DCEBF6', '#FFFFFF']}>
          <ButtonComponent onPress={() => onSubmit()} title="NEXT" />
        </LinearGradient>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  headerText: {
    fontFamily: 'Sansation',
    fontSize: 20,
    marginTop: 30,
    color: COLOR.primary,
    alignSelf: 'center',
    fontWeight: '700',
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
  textInputStyle: {
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 6,
    elevation: 4,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1D2126',
  },
  btnStyle: {
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 6,
    marginHorizontal: 8,
    // marginTop: 10,
  },
});

export default AddNewQR;
