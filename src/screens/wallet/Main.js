import * as React from "react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { StyleSheet, Alert, View } from "react-native";

import GLOBALS from "../../globals";
import Loading from "../../components/Loading";
import * as actionTypes from "../../redux/actions/actionTypes";

const Main = (props) => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  checkLogin();
	}, []);
  
	const checkLogin = async () => {
	  console.log('checkLogin');
	  try {
		const token = GLOBALS.Constants.TOKEN;
		setLoading(true);
  
		const response = await fetch(GLOBALS.Constants.PROFILE, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		  },
		});
		if (!response.ok) {
		  throw await response.json();
		}
		const data = await response.json();
  
		let user = { ...data.data.user, ...data.data.profile };
		dispatch({ type: actionTypes.SET_USER, user });
		dispatch({ type: actionTypes.SET_TOKEN, token: token });
  
		try {
		  let walletResponse = await fetch(GLOBALS.Constants.GET_WALLET, {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json',
			  Authorization: `Bearer ${token}`,
			},
		  });
		  if (!response.ok) {
			throw await response.json();
		  }
  
		  walletResponse = await walletResponse.json();
  
		  dispatch({
			type: actionTypes.SET_WALLET,
			wallet: walletResponse.data,
		  });
		  if (walletResponse.data.isPinCodeSet) {
			props.navigation.navigate('UnlockWallet');
		  } else {
			props.navigation.navigate('PinCodeNew');
		  }
		} catch (err) {
		  props.navigation.navigate('PinCodeNew');
		}
	  } catch (er) {
		Alert.alert('Error', 'There was an error!\nRetry?', [
		  {
			text: 'Cancel',
			style: 'cancel',
		  },
		  { text: 'OK', onPress: checkLogin },
		]);
	  }
	};
	console.log("in main");
	return (
		loading && (
			<View style={styles.loader}>
				<Loading />
			</View>
		)
	);
};

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		backgroundColor: "#f5f5f7"
	}
});

export default Main;
