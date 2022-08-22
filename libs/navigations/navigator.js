import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "_scenes/loginScreen";
import SignupScreen from "_scenes/signupScreen";
import ForgotPasswordScreen from "_scenes/forgotpasswordScreen";
import OtpScreen from "_scenes/otpScreen";

const NavigatorConfig = {
  initialRouteName: "Login",
  header: null,
  headerMode: "none",
};

const RouteConfigs = {
  Login: LoginScreen,
  Signup: SignupScreen,
  ForgotPassword: ForgotPasswordScreen,
  Otp : OtpScreen
  
};

const ScreenNavigator = createStackNavigator(RouteConfigs, NavigatorConfig);

export default ScreenNavigator;
