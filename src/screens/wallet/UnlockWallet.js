import React, { useCallback, useEffect, useState, useRef } from "react";
import { Text, View, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CodeInput from "react-native-code-input";
// import Instance from "../../utils";
// import Button from "../../components/Button";
import Button from "../../components/button";
import Wrapper from "../../components/Wrapper";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import GlobalHeader from "../../components/GlobalHeader";
// import NavBar from "../../components/NavBar";
import { useNavigationState } from "@react-navigation/native";
import WalletHeader from "../../components/walletHeader/WalletHeader";
export default ({ navigation }) => {
	// const dispatch = useDispatch();
	// const [isLoading, setIsLoading] = useState(false);
	const pinInput = useRef();
	const store = useSelector((state) => state);
	console.log("store.wallet.pinCode===");
	const index = useNavigationState((state) => state);

	const [code, setCode] = React.useState("");
	console.log(store, "store");
	const onSubmit = async () => {
		if (code == "1234") {
			let params = {};

			index.routes[index.routes.length - 2]?.name === "Home" &&
				(params["pinSuccess"] = true);

			navigation.reset({
				index: 0,
				routes: [
					{
						name: "Home",
						params
					}
				]
			});
		} else {
			setCode("");
			Toast.show({ text: "wrong otp", type: "danger" });
		}
	};
	const _onFinishCheckingCode1 = (data) => {
		setCode(data);
	};
	return (
		<Wrapper
		// contentContainerStyle={{
		// 	width: "70%",
		// 	alignSelf: "center"
		// }}
		// navigation={navigation}
		>
			<GlobalHeader />
			{/* <NavBar
				onOpen={() => navigation.dispatch(DrawerActions.openDrawer())}
				onBack={() => navigation.goBack()}
			/> */}
			<WalletHeader navigation={navigation} />
			<FontAwesome
				style={{ textAlign: "center", marginVertical: 24 }}
				name={"unlock-alt"}
				size={60}
				color={"#0072CC"}
			/>
			<Text
				children={"Enter Pin here"}
				style={{
					textAlign: "center",
					color: "#000",
					fontSize: 15,
					marginTop: 6
				}}
			/>
			<View
				style={{
					// marginVertical: 12,
					justifyContent: "center",
					alignItem: "center",
					marginLeft: "20%"
				}}
			>
				<SmoothPinCodeInput
					// ref={"codeInputRef2"}
					ref={pinInput}
					secureTextEntry={true}
					cellSize={55}
					codeLength={4}
					cellStyle={{
						borderWidth: 2,
						// borderRadius: 24,
						borderColor: "#0072CC",
						backgroundColor: "#fff"
					}}
					cellStyleFocused={{
						borderColor: "#0072CC",
						backgroundColor: "#0072CC"
					}}
					textStyle={{
						fontSize: 24,
						color: "black"
					}}
					// activeColor={"white"}
					// inactiveColor={"white"}
					value={code}
					// keyboardType="numeric"
					// autoFocus={true}
					onTextChange={(code) => setCode(code)}
					// codeLength={4}
					// space={16}
					// inputPosition="center"
					// size={45}
					// onFocus={() => alert("haha")}
					onFulfill={_onFinishCheckingCode1}
					containerStyle={{
						marginVertical: 12,
						justifyContent: "center",
						alignItem: "center"
					}}
					codeInputStyle={{}}
				/>
			</View>
			{/* <MyBtn
        isLoading={isLoading}
        title={'SUBMIT'}
        onPress={DispatchCreatePin}
      /> */}
			<View style={{ bottom: -Dimensions.get("screen").height / 3 }}>
				<Button name="SUBMIT" onPress={() => onSubmit()} />
			</View>
		</Wrapper>
	);
};
