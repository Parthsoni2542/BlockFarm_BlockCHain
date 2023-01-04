import * as React from "react";
import { StyleSheet, Text } from "react-native";

function TextComponent(props) {
	const styles = StyleSheet.create({
		text: {
			lineHeight: 24,
			color: props.color || "green",
			fontSize: props.fontSize || 16,
			textAlign: props.textAlign || "center",
			fontWeight: props.bold ? "bold" : "300"
		}
	});
	return <Text style={[styles.text, { color: "black" }]}>{props.text}</Text>;
}

export default TextComponent;
