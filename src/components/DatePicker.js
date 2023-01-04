import React, {useState, useEffect} from 'react';
import {Text, View, Animated} from 'react-native';
import DatePicker from 'react-native-datepicker';
import styles from '../theme/theme';
import {DOB} from '../redux/slices/RegisterSlice';
import {useDispatch, useSelector} from 'react-redux';

const DateSelect = () => {
  const [date, setDate] = useState();
  const animatedValue = new Animated.Value(0);

  const today = new Date();

  const dispatch = useDispatch();

  // const dob = useSelector(state => state.register.dob);
  // console.log(dob);

  // const value = new Date(date).getTime();
  dispatch(DOB(date));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <DatePicker
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
          date={date}
          mode="date"
          placeholder="Select Date"
          format="DD/MM/YYYY"
          minDate="01-01-1980"
          maxDate={today}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateText: {
              color: '#fff',
              fontFamily: 'Sansation_Regular',
              fontSize: 15,
              flex: 1,
            },
            placeholderText: {
              color: 'white',
            },
            dateInput: {
              borderColor: '#212332',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            },
          }}
          onDateChange={date => {
            setDate(date);
          }}
        />
      </View>
    </View>
  );
};

export default DateSelect;
