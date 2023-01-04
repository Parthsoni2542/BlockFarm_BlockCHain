import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	Dimensions,
	ScrollView,
  Pressable,
} from "react-native";
import WalletHeader from "../../components/walletHeader/WalletHeader";
import GlobalHeader from "../../components/GlobalHeader";
import Wrapper from "../../components/Wrapper";
import Icon from "react-native-vector-icons/dist/AntDesign";
import Button from "../../components/Button";

import styles from "../../theme/theme";
import { backgroundbg, dropdown } from "../../theme/theme";

const WidthDimension = Dimensions.get("window").width;
const HeightDimension = Dimensions.get("window").height;

const ConvertToken = ({ navigation }) => {
	return (
		<>
			<Wrapper>
				<GlobalHeader />
				<WalletHeader navigation={navigation}/>
				<ScrollView>
					<View>
						<ImageBackground
							style={{
								height: 150,
								resizeMode: "cover",
								justifyContent: "center",
							}}
							source={backgroundbg}
						>
							<Text
								style={{
									marginLeft: 140,
									color: "#FFFFFF",
									fontFamily: "Sansation",
									marginVertical: -15,
									fontSize: 63,
									fontWeight: "bold",
								}}
							>
								715
							</Text>
							<Text
								style={{
									marginLeft: 140,
									color: "white",
									fontFamily: "Sansation",
									fontSize: 18,
									fontWeight: "bold",
								}}
							>
								Token you have
							</Text>
						</ImageBackground>
					</View>
					<View style={{ marginTop: 30 }}>
						<MethodButton
							next={() => navigation.navigate("ConvertedToken")}
							tittle="Request your EARN token to convert to ERC-20 Ethereum"
						/>
						<MethodButton tittle="Request your EARN token to convert to Fiat currency(Taka)" />
						<MethodButton tittle="Request your EARN token to another phone, user " />
					</View>
				</ScrollView>
			</Wrapper>
		</>
	);
};

const MethodButton = ({ tittle, next }) => {
	return (
		<>
			<View style={styless.container}>
				<Pressable style={styless.selectHeader} onPress={next}>
					<View style={{ flexDirection: "row" }}>
						<Text
							style={{
								color: "#FFFFFF",
								fontSize: 15,
								fontWeight: "bold",
								// fontFamily: "Sansation",
								// textAlign: "center",
								// alignSelf: "auto",
								// top: 10,
								width: "95%",
							}}
						>
							{tittle}
						</Text>
					</View>
					<View
						style={{
							width: "10%",
							justifyContent: "center",
							alignItems: "center",
              // borderColor: 'white',
              // borderWidth:
              
						}}
					>
						<Image
							source={dropdown}
							style={{ height: 20, width: 20 }}
						/>
					</View>
				</Pressable>
			</View>
		</>
	);
};

export default ConvertToken;

const styless = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
    
	},
	selectHeader: {
		// justifyContent: "center",
		// alignItems: "flex-start",
		padding: 18,
    paddingRight: 18,

		backgroundColor: "#212332",
		borderRadius: 5,
		width: WidthDimension * 0.9,
		// height: HeightDimension * 0.08,
		// height: 72,
		marginVertical: 10,
		flexDirection: "row",
	},
});
