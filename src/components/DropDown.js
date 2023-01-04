import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker'

export const Dropdown = ({ selectedValue, onValueChange, children }) => {
    return (
        <Picker
            dropdownIconColor={'blue'}
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            mode="dropdown"
            style={styles.picker}
        >
            {children}
        </Picker>
    )
}

const styles = StyleSheet.create({
    picker: {
        marginVertical: 30,
        width: 90,
        padding: 10,
        borderWidth: 1,
        borderColor: "#666",
    },
})