import React from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MonitoringCard from '../components/MonitoringCard'
import FarmerHeader from '../components/FarmerHeader';


const FarmerMonitering = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <FarmerHeader navigation={navigation} />
            <MonitoringCard text="Height" />
            <MonitoringCard text="Weight" />
            <MonitoringCard text="Temperature" />
            <MonitoringCard text="Air" />
            <MonitoringCard text="Water" />
            <MonitoringCard text="Soil" />
            <MonitoringCard text="Pressure" />
            <MonitoringCard text="PH Levels" />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: wp('8%'),
        flexDirection: "column",


    }
})


export default FarmerMonitering
