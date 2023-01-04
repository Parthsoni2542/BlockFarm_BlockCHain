import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({text}) => {
    return (
        <View>
            <LinearGradient 
                style={styles.btnStyle}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
                colors={['#E12160', '#3F5CC8']}>
                <Text style={styles.btnTextStyle}>{text}</Text>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    btnStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 26,
        borderRadius: 6,
        margin: 10,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        elevation: 4,
    },
    
    btnTextStyle: {
        fontFamily: 'Nunito-ExtraBold',
        color: '#FFF',
        fontSize: 16,
    },
})

export default GradientButton;