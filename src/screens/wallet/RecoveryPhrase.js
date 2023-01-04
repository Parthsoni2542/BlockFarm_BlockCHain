import * as React from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

import GLOBALS from '../../globals';
import Text from '../../components/Text';
import Button from '../../components/button';
// import Button from "../../components/Button";
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Dots from 'react-native-vector-icons/dist/Entypo';
// import Snackbar from 'react-native-snackbar';
import GlobalHeader from '../../components/GlobalHeader';
import Wrapper from '../../components/Wrapper';
import NavBar from '../../components/NavBar';
import {DrawerActions} from '@react-navigation/native';
import WalletHeader from '../../components/walletHeader/WalletHeader';
// import ButtonGradient from '';

export default function RecoverPhrase(props) {
  const store = useSelector(state => state);

  const [phrase, setPhrase] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  console.log(phrase);
  const onSubmit = async () => {
    // props.navigation.reset({
    // 	index: 0,
    // 	routes: [{ name: "Main" }]
    // });
    try {
      setLoading(true);
      let response = await fetch(GLOBALS.Constants.CREATE_SEEDPHRASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GLOBALS.Constants.TOKEN}`,
        },
        body: JSON.stringify({
          appId: GLOBALS.Constants.APP_ID,
          seedPhrase: phrase,
        }),
      });
      if (!response.ok) {
        throw await response.json();
      }
      Alert.alert(
        'The recovery phrase has been created and can be viewed in your Wallet.',
      );
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    } catch (er) {
      setLoading(false);
      Alert.alert('Error', 'There was an error!');
    }
  };

  const WidthDimension = Dimensions.get('window').width;
  const HeightDimension = Dimensions.get('window').height;
  return (
    <Wrapper>
      {/* <Header back={() => props.navigation.goBack()} />
       */}
      <GlobalHeader />
      {/* <NavBar
				onOpen={() =>
					props.navigation.dispatch(DrawerActions.openDrawer())
				}
				onBack={() => props.navigation.goBack()}
			/> */}
      <WalletHeader navigation={props.navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View>
          <View style={styles.text}>
            <Text
              text="Please create your Seed Phrase (a phrase that you only you can remember and use to access your money)"
              color="green"
            />
          </View>

          <View style={styles.input}>
            <TextInput
              style={{
                width: WidthDimension * 0.9,
                borderRadius: 5,
                borderColor: 'black',
                borderWidth: 1,
                marginVertical: HeightDimension * 0.008,
                textAlign: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                color: 'black',
                // elevation: 1.01,
              }}
              value={phrase}
              placeholder="Seed Phrase"
              placeholderTextColor={'gray'}
              onChangeText={value => setPhrase(value)}
            />
          </View>
        </View>
        {/* <ButtonGradient
        text={'SUBMIT'}
        loading={loading}
        onPress={onSubmit}
        disabled={loading}
      /> */}
        <Button
          name={'SUBMIT'}
          // loading={loading}
          onPress={onSubmit}
          // disabled={loading}
        />
      </ScrollView>
    </Wrapper>
  );
}

const Header = ({back}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          // marginTop: 19,
          backgroundColor: 'white',
          // marginBottom: 30,
          // borderWidth: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <TouchableOpacity onPress={back}>
          <Icon name="arrowleft" style={{}} size={24} color="#1D2126" />
        </TouchableOpacity>

        <Text text={'Main Menu'} />

        <TouchableOpacity>
          <Dots
            style={{
              // marginLeft: "48%",
              fontSize: 24,

              // marginTop: 12

              // fontWeight: "100",
            }}
            name="dots-three-vertical"
            size={24}
            color="#1D2126"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  text: {
    marginBottom: 50,
    paddingHorizontal: 25,
  },
  input: {
    alignItems: 'center',
  },
});
