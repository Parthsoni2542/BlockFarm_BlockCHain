import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../custom-styles/colors';
const SocialIcon = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      style={styles.btnStyle}>
      <LinearGradient
        style={styles.btnStyle}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[COLOR.linearStart, COLOR.linearEnd]}>
        <Image source={props.imageSource} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: 30,
    width: 30,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'White',
    borderWidth: 10,
  },
});

export default SocialIcon;
