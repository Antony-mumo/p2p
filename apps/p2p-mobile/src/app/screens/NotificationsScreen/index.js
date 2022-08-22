import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet} from "react-native";
import { Colors } from "_styles";
import { __ } from "_utils/stringPicker";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { padding } from "_styles/mixins";
import NotificationTopNavigatorComponent from "_navigations/notification-navigator";
import CustomText from "_components/atoms/CustomText.atom";
import { largeBoldText } from "_styles/typography";
import { DEEP_BLUE } from "_styles/colors";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const NotificationsScreen_texts = {
  greetings2: "Notifications",
  Order_Alerts: "Order Alerts",
  Transacitonal: "Transactional",
  Promotions: "Promotions"

};
 

const NotificationsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container} >
      <View style={{width:'100%', height: '100%'}}>
      <View style={{...padding(0,3,0,3)}}>
        <View style={styles.statusbar} />
           <StatusBar
                style="light"
                translucent={true}
                backgroundColor={Colors.PRIMARY}
              />
          <View>
              <View
                 style={styles.topWrapper}             
              >
              <TouchableOpacity>
                <Entypo name="menu" size={24} color={Colors.DEEP_BLUE} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons name="search" size={24} color={Colors.DEEP_BLUE} />
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
              text={NotificationsScreen_texts.greetings2}
              styling={largeBoldText(DEEP_BLUE,'left')}
              />
          </View>
         

         
      </View>
      <View style={{flex:1}} >
        <NotificationTopNavigatorComponent />
      </View>
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
  topWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  statusbar: {
    height: StatusBar.currentHeight,
    backgroundColor: Colors.PRIMARY,
  },
  
});

export default NotificationsScreen;
