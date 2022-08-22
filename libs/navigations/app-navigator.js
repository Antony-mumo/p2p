import { TouchableOpacity , StyleSheet, View, Text} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createTopTabNavigator} from 'react-navigation-tabs';
import HistoryScreen from '_scenes/HistoryScreen';

import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '_scenes/homeScreen';
import { DEEP_BLUE, GRAY_LIGHT, GRAY_MEDIUM, ORANGE, PRIMARY, WHITE } from '_styles/colors';

import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { border, boxShadow, margin, padding } from '_styles/mixins';
import ProfileScreen from '_scenes/ProfileScreen';
import NotificationsScreen from '_scenes/NotificationsScreen';
import SettingsScreen from '_scenes/SettingsScreen';
import HomeNavigator from './home-stack-navigator';
import NotificationNavigator from './notification-stack-navigator';
import OrderAltertsScreen from '_scenes/NotificationsScreen/OrderAlertsScreeen';
import PromotionalScreen from '_scenes/NotificationsScreen/PromotionalScreen';
import TransactionsScreen from '_scenes/NotificationsScreen/TransactionsScreen';
import NormalBlackText from '_components/atoms/NormalBlackText.atom';
import NotificationTopNavigator from './notification-navigator';

export  const HomeTabBarButton = ({ routeName, onPress, activeIndex}) => {

  console.log("Key ", activeIndex)

  const notify = true;

  return(
    routeName == 'Home' ?
    <View style={{flex : 1, justifyContent:'center', alignItems: 'center'}}>
      <TouchableOpacity style={[styles.button,activeIndex == 0 && {backgroundColor: GRAY_MEDIUM,}]} onPress={onPress } >
          <Entypo name="home" size={26} color={DEEP_BLUE} />
      </TouchableOpacity>
    </View>
    : routeName == 'History' ?
    <View style={{flex : 1, justifyContent:'center', alignItems: 'center'}}>
        <TouchableOpacity style={[styles.button,activeIndex == 1 && {backgroundColor: GRAY_MEDIUM,}]} onPress={onPress}>
            <MaterialIcons name="history" size={26} color={DEEP_BLUE} />
        </TouchableOpacity>
    </View>
    :routeName == 'Profile'?
    <View style={[styles.button, styles.refPosition]}>
      <TouchableOpacity style={styles.floatButton} onPress={onPress}>
          <Ionicons name="person-circle-outline" size={70} color={GRAY_LIGHT} />     
      </TouchableOpacity>
    </View>
    :routeName == 'Notification' ?
    <View style={{flex : 1, justifyContent:'center', alignItems: 'center'}}>
      <TouchableOpacity style={[{...styles.button,position: 'relative'},activeIndex == 3 && {backgroundColor: GRAY_MEDIUM,}]} onPress={onPress}>
          {notify && <View style={styles.notification}></View>}
          <MaterialIcons name="notifications-none" size={26} color={DEEP_BLUE} />
      </TouchableOpacity>
  </View> 
  :
  <View style={{flex : 1, justifyContent:'center', alignItems: 'center'}}>
    <TouchableOpacity style={[styles.button,activeIndex == 4 && {backgroundColor: GRAY_MEDIUM,}]} onPress={onPress}>
        <Ionicons name="settings-outline" size={26} color={DEEP_BLUE} />
    </TouchableOpacity>
  </View>
  )
}



const AppNavigator = createBottomTabNavigator(
  {
    Home:HomeNavigator,
    History:HistoryScreen,
    Profile:ProfileScreen,
    Notification: NotificationsScreen,
    Settings:SettingsScreen,

  },
  {
    defaultNavigationOptions: ({ navigation })=>({
      tabBarButtonComponent: (props) =>(
        <HomeTabBarButton
        routeName={navigation.state.routeName}
        activeIndex={navigation.state.index}
        {...props}
        />
      )
    }),
    initialRouteName: 'Home',
    tabBarOptions: {
      style: {
        ...border(10,10,10,10,.5,DEEP_BLUE),
        ...margin(10,1,10,1),
        elevation: 40
      }
    }
  }
  );

export default AppNavigator;



const styles = StyleSheet.create({
  container: {
   width: '100%',
          ...boxShadow(GRAY_MEDIUM)
  },
  main:{
      ...margin(1,1,30,1),
      ...border(10,10,10,10,1,DEEP_BLUE),
      
  },
  section:{
   flexDirection: "row",
   justifyContent:'space-evenly'
  },
  button:{
      height: 50,
      justifyContent: 'center',
      ...padding(5,5,5,5),
      ...border(9,9,9,9,0,WHITE),
      minWidth: 70,
      alignItems: 'center',
  },
  refPosition:{
      position: 'relative'
  },
  floatButton:{
      position: 'absolute',
      top: -40,
      backgroundColor: PRIMARY,
      height: 70,
      width:70,
      ...border(35,35,35,35,0,WHITE),
      alignItems: 'center',
      justifyContent:'center'
  },
  notification:{
   position: 'absolute',
   ...border(3,3,3,3,1,ORANGE),
   top: "33%",
   right: "33%",
   width: 6,
   height: 6,
   backgroundColor: ORANGE   
  }
 
})
