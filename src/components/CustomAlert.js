import { View } from 'react-native'
import React, { useRef } from 'react'
import DropdownAlert from 'react-native-dropdownalert';

export const CustomAlert = () => {
    let dropDownAlertRef = useRef();
    return (
        <View>
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
        </View>
    )
}

