import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const HeaderImage = () => {
  return (
    <Image
      style={styles.headerImage}
      source={require('../assets/images/appLogo.png')}
    />
  );
};

const styles = StyleSheet.create({
  headerImage: {
    marginTop: 30,
    alignSelf: 'center',
    borderWidth: 1
 
  },
});

export default HeaderImage;
