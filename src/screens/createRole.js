import React, {useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ButtonComponent from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import HeaderImage from '../components/headerLogo';
import {COLOR} from '../custom-styles/colors';
const CreateAccountScreen = () => {
  const [nextPressed, setNexPressed] = useState(false);
  return (
    <View style={styles.container}>
      <HeaderImage />
      <View style={styles.contentContainer}>
        <Image
          style={{height: 200}}
          source={require('../assets/images/onBoard1.png')}
        />
        <View style={styles.contentTextContainer}>
          <Text style={styles.textTitle}>
            Please create an account or sign in
          </Text>
          <Text style={styles.textDescrtiption}>
            Please choose if you would like to signin or signup as a Farmer or
            Wholesaler
          </Text>
        </View>
      </View>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20}}
        colors={['#FFFFFF00', '#E3EFF8']}>
        {nextPressed == true ? (
          <View style={styles.buttonContainer}>
            <ButtonComponent
              onPress={() => setNexPressed(true)}
              title="CREATE ACCOUNT"
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.btnStyle}>
              <Text style={styles.btnSignInTextStyle}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <ButtonComponent title="AS A FARMER" />
            <ButtonComponent title="AS A WHOLESALER" />
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  logoContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1.7,
    justifyContent: 'center',
  },
  contentTextContainer: {
    marginHorizontal: 26,
    marginVertical: 10,
  },
  textTitle: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: '19%',
    color: COLOR.primary,
  },
  textDescrtiption: {
    textAlign: 'center',
    fontSize: 15,
    color: COLOR.textColor,
    paddingHorizontal: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  btnStyle: {
    padding: 13,
    borderRadius: 6,
    marginHorizontal: 8,
    borderStyle: 'solid',
    borderColor: '#C52B72',
    borderWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
  btnSignInTextStyle: {
    color: '#C52B72',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CreateAccountScreen;
