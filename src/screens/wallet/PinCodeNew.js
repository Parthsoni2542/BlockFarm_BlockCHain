import * as React from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import Text from '../../components/Text';
import PinInput from '../../components/PinInput';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Dots from 'react-native-vector-icons/dist/Entypo';
import Button from '../../components/button';
// import Button from "../../components/Button";
import Global from '../../globals/Constants';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import Snackbar from "react-native-snackbar";
import Wrapper from '../../components/Wrapper';
import GlobalHeader from '../../components/GlobalHeader';
import NavBar from '../../components/NavBar';

export default function PinCodeNew(props) {
  const [token, setToken] = React.useState();
  React.useEffect(() => {
    getToken();
  }, [token]);
  const getToken = async () => {
    setToken(await AsyncStorage.getItem('otptoken'));
  };

  console.log('in PinCodeNew');
  // const store = useSelector((state) => state);
  const store = useSelector(state => state);
  const [code, setCode] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // console.log(store, "jgjgb");
  const onSubmit = async () => {
    // console.log(code, Global.APP_ID);

    try {
      setLoading(true);
      const response = await fetch(Global.CREATE_PINCODE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODMzNmZhN2Y2YTc4MDAxNzZmOTBiMSIsImlhdCI6MTY1MDYzMDMxMSwiZXhwIjoxNjUzMjIyMzExfQ.i0vu0Gei0BWQHN3Fhn1fUb-iH3KsjzAH5QxVM38Strc'}`,
        },
        body: JSON.stringify({
          appId: Global.APP_ID,
          pinCode: code,
        }),
      });
      if (!response.ok) {
        throw await response.json();
      }
      Alert.alert('Success: Your PIN has now been created.');
      // Snackbar.show({
      // 	backgroundColor: "green",
      // 	text: "Your PIN has now been created.",
      // 	duration: Snackbar.LENGTH_SHORT
      // });
      setLoading(false);
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    } catch (er) {
      console.error(er);
      setLoading(false);
      // Alert.alert("Error", "There was an error!");
    }
  };

  return (
    <Wrapper>
      {/* <Header back={() => props.navigation.goBack()} /> */}
      <GlobalHeader />
      <NavBar
        onOpen={() => props.navigation.goBack()}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View>
          <View style={styles.text}>
            <Text text="You are requested to create your" />
            <Text text="Wallet PIN" bold />
          </View>
          <View style={styles.input}>
            <PinInput
              disableImage
              value={code}
              onTextChange={value => setCode(value)}
            />
          </View>
        </View>
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
    backgroundColor: 'white',
  },
  text: {
    marginBottom: 50,
  },
  input: {
    alignItems: 'center',
  },
});
