import * as React from "react";
import {
	StyleSheet,
	ScrollView,
	Image,
	View,
	Alert,
	TouchableOpacity,
	TextInput,
	Dimensions,
	Text
} from "react-native";
import { useSelector } from "react-redux";

import GLOBALS from "../../globals";
import Texter from "../../components/Text";
import Loading from "../../components/Loading";
import { debounce } from "lodash";
import Wrapper from "../../components/Wrapper";
import GlobalHeader from "../../components/GlobalHeader";
import WalletHeader from "../../components/walletHeader/WalletHeader";

const fetchData = async (query, token, cb) => {
	const response = await fetch(
		`${GLOBALS.Constants.SEARCH_USERS}/?name=${query}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${GLOBALS.Constants.TOKEN}`,
				"Content-Type": "application/json"
			}
		}
	);

	if (!response.ok) {
		throw await response.json();
	}
	let data = await response.json();
	data = data.data.filter((e) => e.userBasicDetails.status === "active");
	cb(data);
};
console.log(
	debounce((query, token, cb) => {
		fetchData(query, token, cb);
	}, 500)
);
const debouncedFetchData = debounce((query, token, cb) => {
	fetchData(query, token, cb);
}, 500);
const WidthDimension = Dimensions.get("window").width;
const HeightDimension = Dimensions.get("window").height;
function SelectUser(props) {
	const store = useSelector((state) => state);

	const [users, setUsers] = React.useState([]);
	const [query, setQuery] = React.useState();
	const [loading, setLoading] = React.useState(true);
	console.log(query);
	React.useEffect(() => {
		fetchUsers();
	}, [query]);

	const fetchUsers = async () => {
		try {
			debouncedFetchData(query, store.token, (res) => {
				setUsers(res);
				setLoading(false);
			});
		} catch (er) {
			Alert.alert("Error", "There was an error!");
		}
	};

	return loading == true ? (
		<View style={styles.loader}>
			<Loading />
		</View>
	) : (
		<Wrapper>
			<GlobalHeader />
			<WalletHeader navigation={props.navigation} />
			<View style={styles.container}>
				<View style={styles.input}>
					<TextInput
						value={query}
						style={{
							width: WidthDimension * 0.9,
							borderRadius: 5,
							borderColor: "gray",
							borderWidth: 1,
							marginVertical: HeightDimension * 0.008,
							textAlign: "center",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 1 },
							shadowOpacity: 0.8,
							shadowRadius: 2,
							color: "black"
						}}
						placeholder="Search by name"
						placeholderTextColor={"black"}
						onChangeText={(value) => setQuery(value)}
					/>
				</View>

				<Texter
					bold
					textAlign="left"
					style={styles.text}
					text={`${users.length} Results`}
				/>

				<View
					style={{
						flex: 1
					}}
				>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.scrollView}
					>
						{users.map((user) => (
							<TouchableOpacity
								activeOpacity={0.8}
								style={styles.userButton}
								key={user.userBasicDetails._id}
								onPress={() =>
									props.navigation.navigate("Send", {
										user
									})
								}
							>
								<View style={{ position: "relative" }}>
									<Image
										source={require("../../assets/images/creditCards.png")}
										style={styles.userImage}
									/>
									{user.userBasicDetails.isOnline && (
										<View style={styles.userOnlineDot} />
									)}
								</View>
								<Text style={styles.userButtonText}>
									{user.userBasicDetails.email}
								</Text>
								{/* <Text
									text={user.userBasicDetails.email}
									style={styles.userButtonText}
								/> */}
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</View>
		</Wrapper>
	);
}

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		backgroundColor: "#f5f5f7"
	},
	container: {
		flexGrow: 1,
		// paddingVertical: 30,
		paddingHorizontal: 20,
		backgroundColor: "white"
	},
	text: {
		marginVertical: 20,
		textDecorationColor: "#000",
		textDecorationLine: "underline"
	},
	marginVertical: {
		marginVertical: 8
	},
	marginBottom: {
		marginBottom: 20
	},
	input: {
		alignItems: "center"
	},
	scrollView: {
		flexGrow: 1
	},
	//
	userButton: {
		height: 55,
		elevation: 2,
		borderRadius: 6,
		marginVertical: 8,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		backgroundColor: "#fff",
		justifyContent: "flex-start"
	},
	userImage: {
		width: 40,
		height: 40,
		borderWidth: 1,
		borderRadius: 75,
		resizeMode: "cover"
	},
	userOnlineDot: {
		right: 0,
		width: 10,
		bottom: 3,
		height: 10,
		borderRadius: 10,
		position: "absolute",
		backgroundColor: "#52DE40"
	},
	userButtonText: {
		fontSize: 15,
		marginLeft: 15,
		color: "#1D2126",
		fontWeight: "bold"
	}
});

export default SelectUser;
