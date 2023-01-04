import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLOR} from '../custom-styles/colors';
const ButtonComponent = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      // style={styles.row}
    >
      <LinearGradient
        style={styles.btnStyle}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[COLOR.linearStart, COLOR.linearEnd]}>
        <Text style={styles.btnText}>{props.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    width: '100%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 6,
    marginHorizontal: 8,
    marginTop: 10,
  },
  btnText: {
    fontFamily: 'Sansation_Bold_Italic',
    backgroundColor: 'transparent',
    elevation: 2,
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ButtonComponent;
