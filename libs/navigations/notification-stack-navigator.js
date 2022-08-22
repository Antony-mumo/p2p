import { createStackNavigator } from 'react-navigation-stack';
import { createTabNavigator } from 'react-navigation-tabs';

import NotificationsScreen from '_scenes/NotificationsScreen';
import OrderAltertsScreen from '_scenes/NotificationsScreen/OrderAlertsScreeen';
import PromotionalScreen from '_scenes/NotificationsScreen/PromotionalScreen';
import TransactionsScreen from '_scenes/NotificationsScreen/TransactionsScreen';

const NotificationNavigator = createTabNavigator({
  mainNotification: NotificationsScreen,
  Orders: OrderAltertsScreen,
  Promotions: PromotionalScreen,
  Transactions: TransactionsScreen
},
{
  headerMode: 'none'
});

NotificationNavigator.navigationOptions = () => {
  let tabBarVisible = true
  
  return {
    tabBarVisible
  }
  
}

export default NotificationNavigator;
