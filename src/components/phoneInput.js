import React, {useState} from 'react';
import {View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import styles from '../theme/theme';

const Input = ({value, onChangeText, onChangeFormattedText}) => {
  return (
    <View style={styles.inputContainer}>
      <PhoneInput
        defaultValue={value}
        defaultCode="PK"
        layout="first"
        placeholder="Mobile Number"
        placeholderTextColor="green"
        onChangeText={onChangeText}
        onChangeFormattedText={onChangeFormattedText}
        withDarkTheme
        withShadow
        // autoFocus
        containerStyle={styles.input}
        textInputProps={{
          placeholderTextColor: 'black',
        }}
        textContainerStyle={styles.input}
        textInputStyle={{
          color: 'black',
          height: 50,
        }}
        codeTextStyle={{color: 'black',height: 25}}
        // ref={ref}
      />
    </View>
  );
};

export default Input;
