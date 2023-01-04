import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../theme/theme';
import InstagramLogin from 'react-native-instagram-login';

const ImageButton = ({name, image, onPress}) => {
  return (
    <>
      <View style={styles.imageButtonHeader}>
        <TouchableOpacity style={styles.imageButtonContainer} onPress={onPress}>
          <View style={styles.imageButton}>
            <Image source={image} style={styles.imageButtonImage} />
            <Text style={styles.imageButtonText}>{name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ImageButton;
