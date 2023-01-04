import * as React from "react";
import {
	StyleSheet,
	ScrollView,
	Image,
	TextInput,
	Alert,
	TouchableOpacity,
    Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import GLOBALS from "../../globals";
import Card from "../../components/CardInput";
import LoadingIndicator from "../../components/Loading";
import * as actionTypes from "../../redux/actions/actionTypes";
import LinearGradient from "react-native-linear-gradient";
import GlobalHeader from "../../components/GlobalHeader";

function Actions(props) {
	const store = useSelector((state) => state);
	const dispatch = useDispatch();

	const [amount, setAmount] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const onSubmit = async () => {
		try {
			if (amount === "" || amount === 0) {
				Alert.alert("Invalid Value", "Amount cannot be empty!");
			} else if (parseInt(amount) > parseInt(store.wallet.balance)) {
				Alert.alert(
					"Invalid Value",
					"You don't have this much balance!"
				);
			} else {
				setLoading(true);
				const response = await fetch(GLOBALS.Constants.SEND_BALANCE, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${store.token}`
					},
					body: JSON.stringify({
						balanceSent: amount,
						balanceCurrency: "USD",
						senderAppId: GLOBALS.Constants.APP_ID,
						toUserId: props.route.params.user.userBasicDetails._id
					})
				});
				if (!response.ok) {
					throw await response.json();
				}
				dispatch({
					type: actionTypes.SET_WALLET,
					wallet: {
						...store.wallet,
						balance:
							parseInt(store.wallet.balance) - parseInt(amount)
					}
				});
				props.navigation.navigate("Success", {
					message: "Your tokens have been sent successfully",
					amount
				});
			}
		} catch (err) {
			setLoading(false);
			Alert.alert("Error", "There was an error!");
		}
	};

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<GlobalHeader />
			<Card
				input={
					<TextInput
						maxLength={4}
						value={amount}
						autoFocus={true}
						placeholder="00"
						editable={!loading}
						style={styles.input}
						keyboardType="number-pad"
						placeholderTextColor="#fff"
						onChangeText={(value) => setAmount(value)}
					/>
				}
				amount={store.wallet.balance}
				style={styles.marginBottom}
				text="You wish to send"
			/>
			<WalletVerification
				onPress={onSubmit}
				disabled={loading}
				style={styles.marginVertical}
				text={`Send your tokens to user ${props.route.params.user.userProfileDetails.firstName} ${props.route.params.user.userProfileDetails.lastName}`}
				rightIcon={
					loading ? (
						<LoadingIndicator />
					) : (
						<Image
							source={require("../../assets/images/rightArrow.png")}
							style={styles.rightArrow}
						/>
					)
				}
			/>
		</ScrollView>
	);
}
function WalletVerification(props) {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={props.onPress}
			disabled={props.disabled}
			style={{ elevation: 3 }}
		>
			<LinearGradient
				colors={["#FFFFFF", "#FFFFFF", "#FFFFFF"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={[
					{
						height: 55,
						borderRadius: 6,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						borderWidth: 1,
						borderColor:'#d5d5d5'
					},
					props.style
				]}
			>
				{props.loading ? (
					<Loading color="#fff" />
				) : (
					<Text
						style={{ fontSize: 14, color: "#1D2126", padding: 15 }}
					>
						{props.text}
					</Text>
				)}
				<Image
					source={require("../../assets/images/rightArrow.png")}
					style={{ resizeMode: "contain", margin: 15 }}
				/>
			</LinearGradient>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingVertical: 30,
		paddingHorizontal: 20,
		backgroundColor: "white"
	},
	rightArrow: {
		resizeMode: "contain"
	},
	input: {
		fontSize: 60,
		color: "#000",
		lineHeight: 60,
		textAlign: "center"
	},
	marginVertical: {
		marginVertical: 8
	},
	marginBottom: {
		marginBottom: 20
	}
});

export default Actions;
