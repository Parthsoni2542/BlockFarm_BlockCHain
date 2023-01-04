import { StyleSheet, Dimensions } from "react-native";

// export const splash = require("../../assets/Splash/splash.png");
// export const screen1logo = require("../../assets/Screen1/screen1logo.png");
// export const screen1round = require("../../assets/Screen1/screen1round.png");
// export const triangleIcon = require("../../assets/Screen1/triangleIcon.png");
// export const gobalHeaderImage = require("../../assets/Screen2/gobalHeaderImage.png");
// export const facebookIcon = require("../../assets/Screen2/facebook.png");
// export const googleIcon = require("../../assets/Screen2/google.png");
// export const instagramIcon = require("../../assets/Screen2/instagram.png");
// export const youtubeIcon = require("../../assets/Screen2/youtube.png");
// export const verifyIcon = require("../../assets/Screen4a/verifyIcon.png");
// export const circle = require("../../assets/Screen5b/circle.png");
// export const tick = require("../../assets/Screen5b/tick.png");
// export const arrow = require("../../assets/Screen7b/arrow.png");
// export const dots = require("../../assets/Screen7b/dots.png");
// export const facebook = require("../../assets/Screen7b/facebook.png");
// export const youtube = require("../../assets/Screen7b/youtube.png");
// export const google = require("../../assets/Screen7b/google.png");
// export const instagram = require("../../assets/Screen7b/instagram.png");
// // export const qrcode = require('../../assets/QRCode.png');

// export const megaphone = require("../../assets/drawer/megaphone.png");
// export const coupon = require("../../assets/drawer/coupon.png");
// export const add = require("../../assets/drawer/add.png");
// export const book = require("../../assets/drawer/bookicon.png");
// export const motocross = require("../../assets/drawer/motocross.png");
// export const payment = require("../../assets/drawer/payment.png");
// export const coin = require("../../assets/drawer/coin.png");
// export const coins = require("../../assets/drawer/coins.png");
// export const email = require("../../assets/drawer/email.png");
// export const user = require("../../assets/drawer/user.png");
// export const logout = require("../../assets/drawer/logout.png");
// export const medal = require("../../assets/ScreenMenue/medal.png");
// export const backgroundbg = require("../../assets/ScreenMenue/backgroundbg.png");
// export const Upload = require("../../assets/ScreenMenue/upload.png");
export const dropdown = require("../assets/images/rightArrow.png");
// export const backarrow = require("../../assets/ScreenMenue/arrow.png");

export const passwordIcon = require("../assets/images/passwordIcon.png");

const WidthDimension = Dimensions.get("window").width;
const HeightDimension = Dimensions.get("window").height;

export default styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "Sansation_Regular",
    fontSize: 15,
    padding: 20,
    color: "white",
  },
  policyText: {
    color: "white",
    fontSize: 10,
    fontFamily: "Sansation_Regular",
  },
  roundImage: {
    // width: WidthDimension * 0.4,
    // height: HeightDimension * 0.3,
    margin: HeightDimension * 0.03,
  },
  languages: {
    textAlign: "right",
    color: "#fff",
    fontFamily: "Sansation_Bold",
    marginVertical: WidthDimension * 0.02,
    fontSize: 14,
    marginHorizontal: WidthDimension * 0.03,
  },
  languageContainer: {
    width: WidthDimension * 0.45,
    backgroundColor: "white",
    position: "absolute",
    zIndex: 1,
    top: HeightDimension * 0.05,
    right: 0,
  },
  language: {
    textAlign: "left",
    color: "#4D4D4D",
    fontFamily: "Sansation_Bold",
    marginVertical: WidthDimension * 0.02,
    fontSize: 18,
    marginHorizontal: WidthDimension * 0.03,
  },
  buttonHeader: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'rgba(225,33,96,100)',
    borderRadius: 5,
    width: WidthDimension * 0.9,
    // height: HeightDimension * 0.08,
    height: 52,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Sansation_Regular",
    color: "white",
  },
  imageButtonHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  imageButtonContainer: {
    width: WidthDimension * 0.9,
    // height: HeightDimension * 0.1,
    height: 52,
    backgroundColor: "#212332",
    justifyContent: "center",
    borderRadius: 5,
  },
  imageButton: {
    flexDirection: "row",
    left: 20,
    alignItems: "center",
  },
  imageButtonImage: {
    width: 30,
    height: 30,
  },
  imageButtonText: {
    fontSize: 15,
    color: "white",
    fontFamily: "Sansation_Regular",
    left: 10,
  },
  text: {
    color: "white",
    fontFamily: "Sansation_Regular",
    fontSize: 15,
    marginLeft: 20,
  },
  subText: {
    color: "white",
    fontFamily: "Sansation_Regular",
    textAlign: "center",
    marginVertical: 15,
  },
  globalHeader: {
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    width: WidthDimension * 0.9,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
  mobileNumberText: {
    textAlign: "center",
    fontFamily: "Sansation_Regular",
    color: "white",
    fontSize: 20,
  },
  mobileNumberSubText: {
    textAlign: "center",
    fontFamily: "Sansation_Regular",
    color: "white",
    fontSize: 16,
  },
  forgotText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Sansation_Regaular",
  },
  resend: {
    color: "white",
    textAlign: "center",
  },
  textResend: {
    color: "#4267B2",
  },
  verificationImage: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  verificationButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  passwordText: {
    fontFamily: "Sansation_Regular",
    color: "#E12161",
    padding: 20,
    fontSize: 13,
    textAlign: "center",
  },
  terms: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  termsText: {
    fontFamily: "Sansation_Regular",
    color: "white",
    fontSize: 15,
  },
  selectContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  selectHeader: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "#212332",
    borderRadius: 5,
    width: WidthDimension * 0.9,
    // height: HeightDimension * 0.08,
    height: 52,
    marginVertical: 10,
  },
  selectHeadertrue: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "#212332",
    borderRadius: 5,
    width: WidthDimension * 0.9,
    // height: HeightDimension * 0.08,
    height: 52,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  selectText: {
    fontSize: 15,
    fontFamily: "Sansation_Regular",
    color: "white",
  },
  datePickerContianer: {
    marginStart: 10,
  },
  date: {
    backgroundColor: "#212332",
    width: WidthDimension * 0.9,
    height: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  signUpheading: {
    color: "white",
    fontSize: 15,
    fontFamily: "Sansation_Bold",
    textAlign: "center",
    marginVertical: 20,
    marginBottom: 35,
  },
  signUpSubText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Sansation_Bold",
    textAlign: "center",
    marginHorizontal: WidthDimension * 0.1,
  },
  signUpSelect: {
    marginVertical: 20,
  },
  signUpSelectText: {
    fontFamily: "Sansation_Bold",
    color: "white",
    fontSize: 15,
    left: 20,
    marginVertical: HeightDimension * 0.018,
  },
  inputTextHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  inputTextContainer: {
    backgroundColor: "#212332",
    width: WidthDimension * 0.9,
    borderRadius: 5,
    elevation: 5,
  },
  inputText: {
    color: "white",
    padding: 10,
  },
  signUp2SelectText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Sansation_Bold",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  notification: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
  },
  setting: {
    color: "white",
    fontSize: 15,
    fontFamily: "Sansation_Bold",
    textAlign: "center",
  },
  profileSubText: {
    color: "white",
    fontSize: 15,
    left: 20,
    fontFamily: "Sansation_Bold",
    marginVertical: HeightDimension * 0.015,
  },
  textBoxContianer: {
    backgroundColor: "#212332",
    width: WidthDimension * 0.9,
  },
  socialButtonContainerv: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
  socialButtonContainer: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    backgroundColor: "#212332",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  navbarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  skip: {
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    top: HeightDimension * 0.15,
  },
  skipText: {
    color: "black",
    fontSize: 18,
  },
  qr: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  menus: {
    padding: 15,
    flexDirection: "row",
    margin: 10,
    borderRadius: 10,
  },
});

import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  background-color: black;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: "Lato-Regular";
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: "Lato-Regular";
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;
