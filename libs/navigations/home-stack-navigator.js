import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "_scenes/homeScreen";
import AssignProvisionScreen from "_scenes/homeScreen/assignProvisionScreen";
import MapHomeScreen from "_scenes/homeScreen/mapScreen";
import OrderPaymentScreen from "_scenes/homeScreen/orderPayment";
import PaymentDetailScreen from "_scenes/homeScreen/paymentDetailScreen";
import ServiceProviderScreen from "_scenes/homeScreen/serviceProvision";

const HomeNavigator = createStackNavigator(
  {
    mainHome: HomeScreen,
    Map: MapHomeScreen,
    ServiceProvider: ServiceProviderScreen,
    OrderPayment: OrderPaymentScreen,
    AssignProvision: AssignProvisionScreen,
    OrderPayment: OrderPaymentScreen,
    PaymentDetail: PaymentDetailScreen,
  },
  {
    headerMode: "none",
  }
);

HomeNavigator.navigationOptions = () => {
  let tabBarVisible = true;

  return {
    tabBarVisible,
  };
};

export default HomeNavigator;
