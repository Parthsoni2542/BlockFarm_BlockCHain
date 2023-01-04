import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const LoadingButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <LinearGradient
          colors={['#3F5CC8', '#E12160']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          style={styles.buttonHeader}>
          <ActivityIndicator color="white" size={35} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default LoadingButton;
