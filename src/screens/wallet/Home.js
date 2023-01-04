import * as React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";


import Loading from "../../components/Loading";

import Icon from "react-native-vector-icons/dist/AntDesign";
import Dots from "react-native-vector-icons/dist/Entypo";
import Wrapper from "../../components/Wrapper";
import GlobalHeader from "../../components/GlobalHeader";
import NavBar from "../../components/NavBar";
import { DrawerActions } from "@react-navigation/native";

function Home(props) {
	console.log("in home");
	const store = useSelector((state) => state);

	const [show, setShow] = React.useState(false);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		props.route.params?.pinSuccess && setShow(true);
		checkRecoveryCode();
	}, []);

	const checkRecoveryCode = async () => {
		if (store.wallet) {
			setLoading(false);
		} else {
			props.navigation.navigate("RecoverPhrase");
		}
	};
	console.log(store.wallet,'hheg');
	return loading == true ? (
		<View style={styles.loader}>
			<Loading />
		</View>
	) : (
		<Wrapper>
			<GlobalHeader />
			<NavBar
				onOpen={() => props.navigation.dispatch(DrawerActions.openDrawer())}
				onBack={() => props.navigation.goBack()}
			/>
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity
						onPress={() =>
							props.navigation.navigate(
								store.wallet
									? "Wallet"
									: "UploadDocs"
							)
						}
						activeOpacity={0.8}
					>
						<Text style={styles.item}>Blockm Wallet</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							show
								? setShow(false)
								: props.navigation.navigate("RecoverPhrase")
						}
						activeOpacity={0.8}
					>
						<Text style={[styles.item, { color: "#E6057D" }]}>
							{!show
								? "view recover phrase is_"
								: `the recover phrase is: ${store || "_"}`}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Wrapper>
	);
}

const Header = ({ back }) => {
	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					height: 50,
					// marginTop: 19,
					backgroundColor: "white",
					// marginBottom: 30,
					// borderWidth: 1,
					justifyContent: "space-between",
					alignItems: "center",
					paddingLeft: 10,
					paddingRight: 10
				}}
			>
				<TouchableOpacity onPress={back}>
					<Icon
						name="arrowleft"
						style={{}}
						size={24}
						color="#1D2126"
					/>
				</TouchableOpacity>

				<Text>{"Main Menu"} </Text>

				<TouchableOpacity>
					<Dots
						style={{
							// marginLeft: "48%",
							fontSize: 24

							// marginTop: 12

							// fontWeight: "100",
						}}
						name="dots-three-vertical"
						size={24}
						color="#1D2126"
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	loader: {
		flex: 1,
		backgroundColor: "#f5f5f7"
	},
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	content: {
		flex: 1,
		paddingVertical: 20,
		paddingHorizontal: 20
	},
	item: {
		fontSize: 18,
		color: "#FE0423",
		fontWeight: "500",
		marginVertical: 10
	}
});

export default Home;
