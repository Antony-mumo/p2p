import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { useStateValue } from "_utils/StateProvider";
import { Colors } from "_styles";
import { __ } from "_utils/stringPicker";
import { Formik, Field } from "formik";
import * as yup from "yup";

import * as actions from "_services/actions";
import { login } from "_services/authentication.service";
import { useEffect } from "react/cjs/react.development";
// import { TouchableOpacity } from 'react-native-gesture-handler';

import TextInputMole from "_components/molecules/TextInput.mole";
import PasswordInputMole from "_components/molecules/PasswordInput.mole";
import ErrorTextAtom from "_components/atoms/ErrorText.atom";
import ButtonAtom from "_components/atoms/Button.atom";
import { getAuth, storeAuth } from "_utils/localStorage";
import LogoAtom from "_components/atoms/Logo.atom";
import CustomText from "_components/atoms/CustomText.atom";
import { defaultText } from "_styles/typography";
import { DEEP_BLUE } from "_styles/colors";
import { margin } from "_styles/mixins";
import ClickableUnderlinedTextAtom from "_components/atoms/clickableUnderlinedText.atom";

const company = "Youse";

const login_screen_texts = {
  login_to: `Login to ${company} Account`,
  email_address: "Email Address",
  password: "password",
  sign_in: "Sign in",
  forgot_password: "Forgot password?",
  i_dont_have_an_account: "I don't have an account",
  email_is_required: "Email is required",
  password_is_required: "Password is required",
  please_enter_a_valid_email: "Please enter a valid email",
};

const LoginScreen = ({ navigation }) => {
  const [{ appSettings, loggedIn, auth_token, loggingIn, error }, dispatch] =
    useStateValue();

  useEffect(() => {
    // fetch user from localstorage
    getAuth().then((auth) => {
      // console.log('autho',auth)
      if (auth && auth.length != 0) {
        dispatch({
          type: actions.LOGIN_REQUEST_SUCCESSFUL,
          auth: JSON.parse(auth),
        });
      }
    });
  }, []);

  useEffect(() => {
    if (loggedIn && loggedIn === true) {
      console.log("out user is +++++++++ ", auth_token.user);
      const user = auth_token.user;
      const isNumberVerified = true;
      // !!user.isNumberVerified && user.isNumberVerified & true;
      console.log("number verified ", isNumberVerified);
      isNumberVerified
        ? navigation.navigate("Home")
        : navigation.navigate("Otp");
    }
  }, [loggedIn]);

  const loginUser = (email, password) => {
    dispatch({
      type: actions.LOGIN_REQUEST,
    });
    login(email, password)
      .then((res) => {
        storeAuth(res).then(() => {
          getAuth().then((auth) => {
            dispatch({
              type: actions.LOGIN_REQUEST_SUCCESSFUL,
              auth: JSON.parse(auth),
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: actions.LOGIN_REQUEST_ERROR,
          error: err.message,
        });
      });
  };

  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(login_screen_texts.please_enter_a_valid_email)
      .required(login_screen_texts.email_is_required),
    password: yup
      .string()
      // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      // .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required(login_screen_texts.password_is_required),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar
          barStyle='dark-content'
          translucent={true}
          backgroundColor={Colors.PRIMARY}
        />
        <View style={styles.middle}>
          <LogoAtom />
          <CustomText
            styling={{
              ...defaultText(DEEP_BLUE, "center"),
              ...margin(10, 0, 10, 0),
            }}
            text={login_screen_texts.login_to}
          />
        </View>
        <Formik
          validationSchema={signInValidationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => loginUser(values.email, values.password)}
        >
          {({ handleSubmit, isValid }) => (
            <>
              <View style={styles.inputField}>
                <Field
                  component={TextInputMole}
                  name='email'
                  placeholder={login_screen_texts.email_address}
                  styling={styles.fullInputArea}
                  keyboardType='email-address'
                />

                <Field
                  component={PasswordInputMole}
                  name='password'
                  placeholder={login_screen_texts.password}
                  styling={styles.fullInputArea}
                />
              </View>

              <Pressable
                style={styles.forgotContainer}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgotText}>
                  {" "}
                  {login_screen_texts.forgot_password}{" "}
                </Text>
              </Pressable>

              <ButtonAtom
                styling={styles.button}
                active={isValid && !loggingIn}
                text='Sign in'
                action={handleSubmit}
              />

              <ErrorTextAtom
                error={error.loggin_error ? error.loggin_error : " "}
              />

              <ClickableUnderlinedTextAtom
                action={() => navigation.navigate("Signup")}
                text={login_screen_texts.i_dont_have_an_account}
                styling={styles.noAccounttxt}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  statusbar: {
    height: StatusBar.currentHeight,
    width: "100%",
    backgroundColor: Colors.PRIMARY,
  },

  middle: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logintxt: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "serif",
    color: Colors.DEEP_BLUE,
  },
  inputField: {
    marginTop: 50,
  },

  fullInputArea: {
    width: 310,
  },

  button: {
    marginTop: 70,
    width: 290,
  },
  forgotContainer: {
    marginTop: 20,
    width: 290,
    alignItems: "flex-end",
  },
  forgotText: {
    color: "#b8b8b8",
    fontFamily: "serif",
  },
  noAccount: {
    marginTop: 20,

    fontSize: 15,
  },
  noAccounttxt: {
    fontSize: 15,
    color: Colors.DEEP_BLUE,
  },
});

export default LoginScreen;
