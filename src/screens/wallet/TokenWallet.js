import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import WalletHeader from "../../components/walletHeader/WalletHeader";
import GlobalHeader from "../../components/GlobalHeader";
import Wrapper from "../../components/Wrapper";
import Icon from "react-native-vector-icons/dist/AntDesign";
import Button from "../../components/Button";

import styles from "../../theme/theme";
import { backgroundbg, dropdown } from "../../theme/theme";

const TokenWallet = ({ navigation }) => {
  return (
    <>
      <Wrapper>
        <GlobalHeader />
        <WalletHeader navigation={navigation} />
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
          <View
            style={{ justifyContent: "center", margin: 5, marginBottom: 20 }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                textAlign: "center",
                fontFamily: "Sansation",
                top: 10,
                fontSize: 15,
                fontStyle: "normal",
                lineHeight: 17,
              }}
            >
              You have completed KYC of the Block M Wallet and now you can
              transfer, exchange , send and cash out your EARN tokens!
            </Text>
          </View>

          <MethodButton
            tittle="Transfer tokens"
            next={() => navigation.navigate("ConvertToken")}
          />
          <MethodButton tittle="Exchange tokens" />
          <MethodButton tittle="Send tokens" />
          <MethodButton tittle="Cash out tokens" />
        </ScrollView>
      </Wrapper>
    </>
  );
};

const MethodButton = ({ tittle, next }) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.selectHeader} onPress={next}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: "bold",
                fontFamily: "Sansation",
                textAlign: "center",
                top: 10,
              }}
            >
              {tittle}
            </Text>
          </View>
          <View style={{ marginLeft: "90%", bottom: 10 }}>
            {/* <Icon name="arrowleft" size={20} color="#FFFFFF" /> */}
            <Image source={dropdown} style={{ height: 20, width: 20 }} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TokenWallet;

// const styles = StyleSheet.create({});
