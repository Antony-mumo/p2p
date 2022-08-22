import React, { useEffect } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Colors } from "_styles";
import { __ } from "_utils/stringPicker";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Shadow } from "react-native-shadow-2";
import NormalTextBlue from "_components/atoms/NormalBlueText.atom";
import { margin, padding } from "_styles/mixins";
import CustomText from "_components/atoms/CustomText.atom";
import { BoldText, largeBoldText } from "_styles/typography";
import { DEEP_BLUE, GRAY_MEDIUM } from "_styles/colors";
import { removeAuth } from "_utils/localStorage";
import * as actions from "_services/actions";
import { useStateValue } from "_utils/StateProvider";
import { logout } from "_services/authentication.service";

const SettingsScreen_texts = {
  greetings2: "Settings",
};

const SettingsScreen = ({ navigation }) => {
  const [{ loggedIn, auth_token }, dispatch] = useStateValue();

  useEffect(() => {
    if (loggedIn === false && auth_token === null) {
      console.log("navigating to login screen");
      navigation.navigate("Login");
    }
  }, [loggedIn, auth_token]);

  const handleLogout = () => {
    console.log("logging out user");
    dispatch({
      type: actions.LOGOUT_REQUEST,
    });
    logout()
      .then((res) => {
        console.log("logging out ", res);
        removeAuth().then(() => {
          dispatch({
            type: actions.LOGOUT_REQUEST_SUCCESSFUL,
          });
          // navigation.navigate("Login")
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.LOGOUT_REQUEST_ERROR,
          error: err.message,
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ ...padding(0, 3, 0, 3) }}>
          <View style={styles.statusbar} />
          <StatusBar
            style='light'
            translucent={true}
            backgroundColor={Colors.PRIMARY}
          />
          <View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <TouchableOpacity>
                <Entypo name='menu' size={24} color={Colors.DEEP_BLUE} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <CustomText
              text={SettingsScreen_texts.greetings2}
              styling={largeBoldText(DEEP_BLUE, "left")}
            />
          </View>
        </View>
        {/* scrollable pane */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            ...padding(3, 5, 3, 5),
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Shadow distance={5} radius={1000}>
              <FontAwesome name='user-circle-o' size={80} color={GRAY_MEDIUM} />
            </Shadow>
            <View style={{ ...margin(10, 0, 0, 0) }}>
              <Shadow distance={5} radius={5}>
                <Pressable onPress={() => handleLogout()}>
                  <CustomText
                    text={"log out"}
                    styling={{
                      ...BoldText(DEEP_BLUE, "left"),
                      ...padding(10, 10, 10, 10),
                    }}
                  />
                </Pressable>
              </Shadow>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  statusbar: {
    height: StatusBar.currentHeight,
    backgroundColor: Colors.PRIMARY,
  },
});

export default SettingsScreen;
