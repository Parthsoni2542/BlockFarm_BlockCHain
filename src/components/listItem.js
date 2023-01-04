import React, {useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
// import ButtonComponent from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import HeaderImage from '../components/headerLogo';
import {COLOR} from '../custom-styles/colors';
import {PROPERTY_TYPES} from '@babel/types';
const ListItem = props => {
  const [nextPressed, setNexPressed] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={props.imageSource} />
      <TouchableOpacity onPress={props.onPress}>
        <Text style={{marginLeft: 20, fontWeight: '700', color: 'black'}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginLeft: 60,
    marginVertical: 15,
  },
});

export default ListItem;
