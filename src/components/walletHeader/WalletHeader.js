import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
	StatusBar
} from "react-native";
import Icon2 from "react-native-vector-icons/dist/AntDesign";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { backarrow } from "../theme/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import Dots from "react-native-vector-icons/dist/Entypo";

function WalletHeader({ navigation }) {
	return (
		<>
			{/* <StatusBar backgroundColor="black" /> */}
			<View>
				<View
					style={{
						flexDirection: "row",
						// height: 50,
						padding: 3,
						// marginTop: 19,
						backgroundColor: "#0072CC",
						marginBottom: 30
					}}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
					>
						<Icon2
							name="arrowleft"
							style={{ marginLeft: 5, padding: 10 }}
							size={24}
							color="#FFFFFF"
						/>
					</TouchableOpacity>

					<Text
						style={{
							fontSize: 20,
							fontFamily: "Sansation",
							marginLeft: 18,
							marginTop: 7,
							color: "#FFFFFF"
							// fontWeight: "bold",
						}}
					>
						BLOCKFARM WALLET
					</Text>

					<TouchableOpacity
						onPress={() =>
							navigation.dispatch(DrawerActions.openDrawer())
						}
					>
						<Dots
							style={{
								marginLeft: "40%",
								fontSize: 24,
								color: "#FFFFFF",
								marginTop: 12
								// fontWeight: "100",
							}}
							name="dots-three-vertical"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
}

export default WalletHeader;
