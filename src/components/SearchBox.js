import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const SearchBox = ({ onPress, placeholder, onChangeText, value }) => {

  return (
    <View style={styles.search}>
      <Image source={require('../assets/images/search.png')} />
      <TextInput
        style={styles.fieldInputStyle}
        placeholderTextColor="black"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onPress}>
        <Image source={require('../assets/images/mic.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 2,
    marginTop: 10,
    marginBottom: 2,
    alignItems: 'center',
    paddingLeft: 20,
    width: '90%',
    alignSelf: 'center',

    paddingRight: 20,
    height: 50,
  },
  fieldInputStyle: {
    paddingLeft: 10,
    flex: 1,
  },
});

export default SearchBox;
