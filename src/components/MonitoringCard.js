import React, {useState} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MonitoringCard = ({text}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <MaterialIcons name="keyboard-arrow-down" color="#0072CC" size={28} />

      <Switch
        trackColor={{false: '#767577', true: '#0072CC'}}
        thumbColor="#f4f3f4"
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingStart: wp('2%'),
    width: wp('92%'),
    height: hp('7%'),
    alignSelf: 'center',
    borderRadius: 5,
    elevation: 5,
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: wp('3%'),
  },
  switch: {
    position: 'absolute',
    right: 15,
  },
  text: {
    paddingRight: wp('3%'),
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MonitoringCard;
