import React, {useEffect} from 'react';
import {View, Image, StyleSheet, StatusBar} from 'react-native';

const SplashScreen = props => {
  useEffect(() => {
    splashTimeout();
  }, []);
  const splashTimeout = async () => {
    setTimeout(() => {
      props.navigation.reset({index: 0, routes: [{name: 'createAccount'}]});
    }, 3000);
  };
  return (
    <View style={styles.viewStyle}>
      {/* <StatusBar hidden={true} /> */}
      <View style={styles.logoViewStyle}>
        <Image
          style={styles.logoImageStyle}
          source={require('../assets/images/splash.png')}
        />
        <Image
          style={styles.appLogo}
          source={require('../assets/images/appLogo.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#F5F5F7',
    width: '100%',
    padding: 10,
    flex: 1,
  },
  logoViewStyle: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoImageStyle: {
    width: 150,
    height: 150,
  },
  appLogo: {
    marginVertical: 20,
  },
});

export default SplashScreen;
