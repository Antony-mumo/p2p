import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Colors } from "_styles";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import CardsMole from "_components/molecules/Card.mole";
import MechanicL from "_assets/mechanics.png";
import HouseCl from "_assets/houseCleaning.png";
import Photography from "_assets/photography.png";
import CarW from "_assets/carwash.png";
import Electrical from "_assets/electrical.png";
import SalonB from "_assets/saloonBarber.png";
import Fumigation from "_assets/fumigation.png";
import Laundry from "_assets/laundry.png";
import Mancar from "_assets/man3.png";
import BlueHeadThreeText from "_components/atoms/BlueHeaderThreeText.atom";
import NormalTextBlue from "_components/atoms/NormalBlueText.atom";
import TransparentButtonAtom from "_components/atoms/TransparentButton.atom";
import BlueText from "_components/atoms/BlueText.atom";
import { border, margin, padding } from "_styles/mixins";
import { WHITE } from "_styles/colors";
import OrangeText from "_components/atoms/OrangeText.atom";
import { FONT_SIZE_16 } from "_styles/typography";
import { useStateValue } from "_utils/StateProvider";
import { getServices } from "_services/services.service";
import {
  SERVICES_REQUEST,
  SERVICES_REQUEST_ERROR,
  SERVICES_REQUEST_SUCCESSFUL,
  SET_FIREBASE_TOKEN,
  SET_FIREBASE_TOKEN_ERROR,
  SET_FIREBASE_TOKEN_SUCCESSFUL,
} from "_services/actions";

import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { uploadFirebaseToken } from "_services/authentication.service";
import { storeAuth } from "_utils/localStorage";
import MapView from "react-native-maps";

const name = "John";
const homescreen_texts = {
  greetings1: `Hi ${name}!`,
  greetings2: "Which service would you like to use today ?",
  aroung_you: "Around You",
  how_to_youse: "How to Youse",
  mechanic: "Mechanics",
  house_cleaning: "House Cleaning",
  photography: "Photography",
  car_wash: "Car Wash",
  electrical: "Electrical",
  saloon_barber: "Salon & Barber",
  fumigation: "Fumigation",
  laundry: "Laundry",
};
const cards = [
  { name: "mechanics", colour: Colors.CARD_PURPLE, image: MechanicL },
  { name: "House Cleaning", colour: Colors.CARD_ORANGE, image: HouseCl },
  { name: "Photography", colour: Colors.CARD_GREEN, image: Photography },
  { name: "Car Wash", colour: Colors.CARD_PURPLE, image: CarW },
  { name: "Electrical", colour: Colors.CARD_DEEPBLUE, image: Electrical },
  { name: "Salon & Barber", colour: Colors.CARD_BROWN, image: SalonB },
  { name: "Fumigation", colour: Colors.CARD_PINK, image: Fumigation },
  { name: "Laundry", colour: Colors.CARD_BLUE, image: Laundry },
];

const item = <FlatList />;

const HomeScreen = ({ navigation }) => {
  const redirectToMapsAction = () => {
    console.log("button clicked");
    navigation.navigate("Map");
  };

  const [{ services, auth_token, firebase_token }, dispatch] = useStateValue();

  // ref https://rnfirebase.io/messaging/server-integration#send-messages-to-topics

  useEffect(() => {
    if ((services && services.length) == 0 || !!services) {
      dispatch({
        type: SERVICES_REQUEST,
      });
      getServices()
        .then((res) => {
          console.log("response: ", res);
          dispatch({
            type: SERVICES_REQUEST_SUCCESSFUL,
            services: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: SERVICES_REQUEST_ERROR,
            error: err,
          });
        });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  async function saveTokenToDatabase(token) {
    // Assume user is already signed in
    const userId = auth_token.user.userId;

    if (
      !!auth_token.token === false ||
      (auth_token.token && token !== auth_token.token)
    ) {
      dispatch({
        type: SET_FIREBASE_TOKEN,
      });

      uploadFirebaseToken(token)
        .then(() => {
          const auth = { ...auth_token, token: token };
          storeAuth(auth).then(() => {
            dispatch({
              type: SET_FIREBASE_TOKEN_SUCCESSFUL,
              auth: auth,
            });
          });
        })
        .catch((err) => {
          dispatch({
            type: SET_FIREBASE_TOKEN_ERROR,
            err: err,
          });
        });
    }
  }

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        return saveTokenToDatabase(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      console.log("firebase token, ", token);
      saveTokenToDatabase(token);
    });
  }, []);

  const [scrollItem, SetScrollItem] = useState(item[0]);

  const NextScroll = () => {
    if (scrollItem.id !== 8) {
      let scroll = item.find((index) => index.id === scrollItem.id + 3);
      if (scroll) {
        SetScrollItem(scroll);
      }
    }
  };

  const PrevScroll = () => {
    if (scrollItem.id !== 3) {
      let scroll = item.find((index) => index.id === scrollItem.id - 3);
      if (scroll) {
        SetScrollItem(scroll);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={{ ...padding(0, 0, 0, 0) }}>
          <View style={styles.statusbar} />
          <StatusBar
            barStyle='dark-content'
            hidden={false}
            translucent={true}
            backgroundColor={Colors.WHITE}
          />
          <View>
            <View
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                ...padding(0, 3, 0, 3),
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
              ...padding(0, 3, 0, 3),
            }}
          >
            <BlueHeadThreeText text={homescreen_texts.greetings1} />
            <NormalTextBlue text={homescreen_texts.greetings2} />
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Entypo
                name='chevron-left'
                size={24}
                color='DEEP_BLUE'
                style={{
                  left: 0,
                  position: "absolute",
                  elevation: 5,
                  backgroundColor: WHITE,
                  ...border(0, 20, 0, 20),
                }}
                onPress={() => {}}
              />
              <FlatList
                style={{ flexGrow: 0 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={cards}
                renderItem={({ item }) => <CardsMole cardV={item} />}
                keyExtractor={(item, index) => index.toString()}
              ></FlatList>
              <Entypo
                name='chevron-right'
                size={24}
                color='DEEP_BLUE'
                style={{
                  position: "absolute",
                  right: 0,
                  backgroundColor: WHITE,
                  ...border(20, 0, 20, 0),
                }}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
        {/* scrollable pane */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            ...padding(3, 5, 3, 5),
            height: "auto",
          }}
        >
          <View>
            <BlueText text={homescreen_texts.aroung_you} />
            <View>
              <TouchableOpacity onPress={redirectToMapsAction}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: -1.286389,
                    longitude: 36.817223,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  top: 100,
                }}
              >
                <TransparentButtonAtom
                  styling={{
                    width: 120,
                  }}
                  text={"Open Map"}
                  active={true}
                  action={redirectToMapsAction}
                />
              </View>
            </View>
          </View>
          <OrangeText
            text={homescreen_texts.how_to_youse}
            styling={{
              textAlign: "center",
              ...margin(20, 0, 10, 0),
              fontSize: FONT_SIZE_16,
            }}
          />
          <View>
            <Image
              style={{
                ...border(10, 10, 10, 10, 0, WHITE),
                width: "100%",
                minHeight: 250,
                ...margin(5, 0, 100, 0),
              }}
              source={Mancar}
            />
          </View>
        </ScrollView>
        {/* Menu */}
        {/* <NavigationMenu /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.WHITE,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  statusbar: {
    height: StatusBar.currentHeight,
    width: "100%",
    backgroundColor: Colors.PRIMARY,
  },
  map: {
    width: "100%",
    minHeight: 250,
  },
  greeting1: {
    color: Colors.DEEP_BLUE,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  greeting2: {
    color: Colors.DEEP_BLUE,
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  cardContainer: {
    width: "100%",
    height: "27%",
  },
  maptxt1: {
    color: Colors.DEEP_BLUE,
    fontSize: 17,
    marginBottom: 10,
  },
  imgtxt: {
    color: Colors.ORANGE,
    fontSize: 25,
    marginTop: 10,
    marginStart: "30%",
  },
  image: {
    resizeMode: "contain",
  },
});

export default HomeScreen;
