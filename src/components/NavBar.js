import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/dist/AntDesign";
import Dots from "react-native-vector-icons/dist/Entypo";
import styles from "../theme/theme";
import { DrawerActions } from "@react-navigation/native";

const NavBar = ({ onOpen, onBack }) => {
	return (
		<View
			style={{
				backgroundColor: "white",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				height: 50,
				padding: 10
			}}
		>
			<TouchableOpacity onPress={onBack}>
				<Icon name="arrowleft" size={24} color="black" />
			</TouchableOpacity>
			<Text style={styles.navbarText}>BLOCK FARM PROFILE</Text>
			<TouchableOpacity
				style={{
					// borderWidth: 1,
					// borderColor: "white",
					width: 50,
					paddingLeft: 10
				}}
				onPress={onOpen}
			>
				<Dots name="dots-three-vertical" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default NavBar;
