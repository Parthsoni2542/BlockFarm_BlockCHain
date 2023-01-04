import { required } from 'joi';
import React from 'react';
import {View, Image} from 'react-native';
// import {gobalHeaderImage} from '../../src/theme/theme';
import gobalHeaderImage from '../assets/images/appLogo.png';

import styles from '../theme/theme';

const GlobalHeader = () => {
  return (
    <View style={styles.globalHeader}>
      <Image source={gobalHeaderImage}  />
    </View>
  );
};

export default GlobalHeader;
