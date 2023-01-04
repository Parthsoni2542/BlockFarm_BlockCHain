import { View, Text, Modal, StyleSheet, Image } from 'react-native'
import React from 'react'

export const Model = ({ visible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}>
      <View style={styles.alertDialogStyle}>
        <View style={{ ...styles.modalStyle, margin: 20 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/images/mic.png')} />
            <Text
              style={{
                ...styles.textMedium,
                fontWeight: 'bold',
                color: '#000',
                textAlign: 'center',
                marginTop: 10,
              }}>
              listening.....
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}



const styles = StyleSheet.create({
  alertDialogStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  modalStyle: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
  },
  labelTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: Constants.AppColors.Font.QuestionnaireLabelColor,
  },
})