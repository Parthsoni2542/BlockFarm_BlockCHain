import * as React from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/AntDesign';
import Dots from 'react-native-vector-icons/dist/Entypo';
import GLOBALS from '../../globals';
import Card from '../../components/Card';
import Texter from '../../components/Text';
import {backgroundbg, dropdown} from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../../components/Wrapper';
import GlobalHeader from '../../components/GlobalHeader';
import WalletHeader from '../../components/walletHeader/WalletHeader';

function Wallet(props) {
  const store = useSelector(state => state);
  console.log('in =      ', store.wallet);

  return (
    <Wrapper>
      {/* <Header back={() => props.navigation.goBack()} /> */}
      <GlobalHeader />
      <WalletHeader navigation={props.navigation} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Card style={styles.marginBottom} amount={store.wallet.balance} />
        <View style={styles.text}>
          <Texter text="You have completed KYC of My Wallet and now you can Send, Exchange and Cash out your tokens!" />
        </View>
        <MethodButton
          text="Send tokens"
          style={styles.marginVertical}
          onPress={() => props.navigation.navigate('SelectUser')}
          rightIcon={
            <Image source={dropdown} style={{height: 20, width: 20}} />
          }
        />

        <MethodButton
          style={styles.marginVertical}
          text="Exchange tokens"
          onPress={() => Alert.alert('Warning', 'Action not available')}
          rightIcon={
            <Image source={dropdown} style={{height: 20, width: 20}} />
          }
        />
        <MethodButton
          style={styles.marginVertical}
          text="Cash out tokens"
          onPress={() => Alert.alert('Warning', 'Action not available')}
          rightIcon={
            <Image source={dropdown} style={{height: 20, width: 20}} />
          }
        />
      </ScrollView>
    </Wrapper>
  );
}
const MethodButton = props => {
  return (
    // <TouchableOpacity
    // 	activeOpacity={0.8}
    // 	onPress={props.onPress}
    // 	disabled={props.disabled}
    // 	style={styles.elevation}
    // >
    // 	<LinearGradient
    // 		colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
    // 		start={{ x: 0, y: 0 }}
    // 		end={{ x: 1, y: 1 }}
    // 		style={[styles.container, props.style]}
    // 	>
    // 		{props.loading ? (
    // 			<Loading color="#fff" />
    // 		) : (
    // 			<Text style={styles.text}>{props.text}</Text>
    // 		)}
    // 		{/* <Image
    // 			source={require("../assets/rightArrow.png")}
    // 			style={styles.rightArrow}
    // 		/> */}
    // 		 <Image source={dropdown} style={{ height: 20, width: 20 }} />
    // 	</LinearGradient>
    // </TouchableOpacity>
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          //   alignItems: 'flex-start',
          padding: 10,
          backgroundColor: '#fff',
          borderRadius: 5,
            width: Dimensions.get('window').width * 0.9,
          // height: HeightDimension * 0.08,
          //   height: 52,
          marginVertical: 10,
          borderWidth: 1,
          borderColor: '#D5d5d5',
        }}
        onPress={props.onPress}>
        <View style={{flexDirection: 'row'}}>
          {props.loading ? (
            <Loading color="#fff" />
          ) : (
            <Text style={[styles.text]}>{props.text}</Text>
          )}
        </View>
        <View style={{}}>
          {/* <Icon name="arrowleft" size={20} color="#FFFFFF" /> */}
          <Image source={dropdown} style={{height: 20, width: 20}} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  text: {
    marginBottom: 10,
    paddingHorizontal: 25,
    color: 'black',
    top: 5,
  },
  rightArrow: {
    resizeMode: 'contain',
  },
  marginVertical: {
    marginVertical: 8,
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default Wallet;
