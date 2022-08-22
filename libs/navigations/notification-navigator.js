import { TouchableOpacity , StyleSheet, View} from 'react-native';
import OrderAltertsScreen from '_scenes/NotificationsScreen/OrderAlertsScreeen';
import PromotionalScreen from '_scenes/NotificationsScreen/PromotionalScreen';
import TransactionsScreen from '_scenes/NotificationsScreen/TransactionsScreen';
import { DEEP_BLUE, GRAY_MEDIUM, GRAY_TRANSPARENT, ORANGE, PRIMARY, WHITE } from '_styles/colors';
import { border, boxShadow, margin, padding } from '_styles/mixins';

import CustomText from '_components/atoms/CustomText.atom';
import { NavigationContainer } from '@react-navigation/native';



import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

export const NotificationTopTabBarButton = (props) => {

    const { onPress,  LeftComponent, RightComponent,navigation, ...others} = props

    const index= navigation.getState().index  

    const routeName = index == 0? 'Order' :index == 1? 'Promotion' : 'Transaction';

    return(
      <>
      <View style={{flexDirection : 'row', alignItems: 'center', justifyContent:'space-around', width: '100%'}}>
            <View style={{flexDirection : 'row',  ...margin(5,5,5,5)}}>
                <TouchableOpacity style={[styles.button,{backgroundColor:routeName == 'Order' ? GRAY_TRANSPARENT : PRIMARY, ...padding(3,5,3,5)}]} onPress={()=> {routeName!='Order' && navigation.navigate('Order')}} >
                <CustomText text={'Order Alerts'} styling={{color:routeName == 'Order' ? DEEP_BLUE : GRAY_MEDIUM}} />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection : 'row', ...margin(5,5,5,5)}}>
            <TouchableOpacity style={[styles.button,{backgroundColor:routeName == 'Promotion' ? GRAY_TRANSPARENT : PRIMARY, ...padding(3,5,3,5)}]} onPress={()=> {routeName!='Promotion' && navigation.navigate('Promotion')}}>
                <CustomText text={'Promotional'} styling={{color:routeName == 'Promotion' ? DEEP_BLUE : GRAY_MEDIUM}} />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection : 'row', ...margin(5,5,5,5)}}>
                <TouchableOpacity style={[styles.button,{backgroundColor:routeName == 'Transaction' ? GRAY_TRANSPARENT : PRIMARY, ...padding(3,5,3,5)}]} onPress={()=> {routeName!='Transaction' && navigation.navigate('Transaction')}}>
                    <CustomText text={'Transactions'} styling={{color:routeName == 'Transaction' ? DEEP_BLUE : GRAY_MEDIUM}} />
                </TouchableOpacity>
            </View>
        </View>
      </>
    );
  }

  const NotificationTopNavigatorComponent = () =>{
    return (
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <NotificationTopTabBarButton {...props} />}>
          <Tab.Screen name="Order" component={OrderAltertsScreen} />
          <Tab.Screen name="Promotion" component={PromotionalScreen} />
          <Tab.Screen name="Transaction" component={TransactionsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  }

  export default NotificationTopNavigatorComponent;


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
        backgroundColor: 'yellow',
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