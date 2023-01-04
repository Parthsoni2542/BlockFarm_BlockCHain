import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import Text from './Text';
import PinLockImage from '../assets/images/pinLock.png';

function PinInput(props) {
  const pinInput = React.useRef(null);

  function checkCode(value) {
    if (value !== props.validity) {
      pinInput.current.shake().then(() => props.onTextChange(''));
    }
  }

  return (
    <>
      {!props.disableImage && (
        <View style={styles.imageWrapper}>
          <Image source={PinLockImage} style={styles.image} />
        </View>
      )}
      <View style={styles.text}>
        <Text text="Enter your PIN" />
      </View>
      <View style={styles.input}>
        <SmoothPinCodeInput
          password
          mask="﹡"
          ref={pinInput}
          maskDelay={200}
          cellSpacing={15}
          value={props.value}
          restrictToNumbers={true}
          keyboardType="number-pad"
          cellStyle={styles.cellStyle}
          textStyle={styles.textStyle}
          onFulfill={props.validity && checkCode}
          cellStyleFocused={styles.cellStyleFocused}
          textStyleFocused={styles.textStyleFocused}
          onBackspace={() => console.log('No more back.')}
          onTextChange={(value) => props.onTextChange(value)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    marginBottom: 20,
  },
  image: {
    resizeMode: 'contain',
  },
  text: {
    marginBottom: 10,
  },
  cellStyle: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#0072CC',
    backgroundColor: 'transparent',
    // elevation: 0.
  },
  cellStyleFocused: {
    backgroundColor: 'white',
    borderColor: '#0072CC',
    elevation: 5
  },
  textStyle: {
    fontSize: 24,
    color: '#F9A339',
  },
  textStyleFocused: {
    color: 'black',
  },
});

export default PinInput;
