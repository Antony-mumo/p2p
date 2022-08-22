import React from "react";
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import { useStateValue } from "_utils/StateProvider";
import { useEffect } from 'react/cjs/react.development';
import { Colors } from "_styles";
import { __ } from "_utils/stringPicker";
import { Checkbox } from "react-native-paper";
import { Formik, Field } from "formik";
import TextInputMole from "_components/molecules/TextInput.mole";
import PasswordInputMole from "_components/molecules/PasswordInput.mole";
import * as yup from 'yup';
import * as actions from '_services/actions';

import { AntDesign } from '@expo/vector-icons';
import { signup } from '_services/authentication.service';
import ErrorTextAtom from "_components/atoms/ErrorText.atom";
import ClickableTextAtom from "_components/atoms/clickableText.atom";
import { ScrollView } from "react-native-gesture-handler";
import ButtonAtom from "_components/atoms/Button.atom";
import CustomText from "_components/atoms/CustomText.atom";
import { margin, padding } from "_styles/mixins";
import { defaultMediumSmallText } from "_styles/typography";
import { DEEP_BLUE, PRIMARY } from "_styles/colors";
import CustomFloatingContent from "_components/atoms/CustomFloatingContent.atom";
import LogoAtom from "_components/atoms/Logo.atom";


  const company = 'Youse'

const signup_screen_texts = {
  email_address: 'Email Address',
  password: 'password',
  sign_in : 'Sign in',
  forgot_password : 'Forgot password?',
  please_enter_full_name: 'Please enter Full name',
  email_is_required : 'Email is required',
  password_is_required : 'Password is required',
  please_enter_a_valid_email : 'Please enter a valid email',
  enter_a_valid_phone_number : 'Enter a valid phone number',
  passwords_do_not_match : 'Passwords do not match',
  enter_phone_number : 'Enter phone number',
  please_confirm_password : 'Please confirm password',
  register_a_youse_account_to_continue: `Register your ${company} account ${'\n'} to continue`,
  firstname : 'First Name',
  lastname : 'Last Name',
  phoneNumber : 'Phone Number',
  confirmPassword : 'Confirm Password',
  register : 'Register',
  i_already_have_an_account : 'I already have an account',

}


const SignupScreen = ({ navigation }) => {
  const [checked, setChecked] = React.useState(false);

  const [ { appSettings, signingUp, signedUp, error }, dispatch ] = useStateValue();

  useEffect(()=>{
    signedUp && signedUp===true && navigation.navigate('Login')
  })

  const signupUser = ( values ) => {
    dispatch({
      type : actions.SIGNUP_REQUEST
    })
    signup(values.fName, values.lName, values.email, values.phoneNumber, values.password)
    .then( res => {
      dispatch({
        type : actions.SIGNUP_REQUEST_SUCCESSFUL,
        auth : res
      })
    })
    .catch(err=>{
      dispatch({
        type : actions.SIGNUP_REQUEST_ERROR,
        error: err.message
      })
    })
  }


  const signUpalidationSchema = yup.object().shape({
    fName: yup
      .string()
      .required( signup_screen_texts.please_enter_full_name )
      ,
    lName: yup
      .string()
      .required( signup_screen_texts.please_enter_full_name )
      ,
    email: yup
      .string()
      .email( signup_screen_texts.please_enter_a_valid_email )
      .required( signup_screen_texts.email_is_required ),
    phoneNumber: yup
      .string()
      .matches(/(\d){10}\b/, )
      .required( signup_screen_texts.enter_phone_number ),
    password: yup
      .string()
      // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      // .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required( signup_screen_texts.password_is_required ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')],  signup_screen_texts.passwords_do_not_match )
      .required( signup_screen_texts.please_confirm_password ),
  })

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" translucent={false} backgroundColor={PRIMARY} />
      <CustomFloatingContent>
          <Pressable style={padding(5,5,5,5)} onPress={()=>navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={DEEP_BLUE} />
          </Pressable>
      </CustomFloatingContent>
      <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.middle}>
      <LogoAtom styling={{marginTop : 10}}/>

      <View style={styles.middle}>
        <Text style={styles.signuptxt}>{ signup_screen_texts.register_a_youse_account_to_continue }</Text>
      </View>
      <Formik
            validationSchema={signUpalidationSchema}
            initialValues={{
              fName: '',
              lName: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => signupUser(values)}
      >
        {({ handleSubmit, isValid }) => (
        <>
          <View
            style={{flexDirection: "row", alignContent: 'flex-start'  }}
            padding={5}
          >
              <Field
                component = { TextInputMole }
                name = 'fName'
                placeholder = { signup_screen_texts.firstname }
                styling={styles.halfInputArea}
                container={{width : "40%"}}
              />

            <Field
                component = { TextInputMole }
                name = 'lName'
                placeholder = { signup_screen_texts.lastname }
                styling={styles.halfInputArea}
                container={{width : "40%"}}
              />

          </View>
          <View>

          <Field
              component = { TextInputMole }
              name = 'email'
              placeholder = { signup_screen_texts.email_address }
              styling={styles.fullInputArea}
              keyboardType="email-address"
            />

          <Field
              component = { TextInputMole }
              name = 'phoneNumber'
              placeholder =  { signup_screen_texts.phoneNumber }
              styling={styles.fullInputArea}
              keyboardType='numeric'
            />
          <Field
              component = { PasswordInputMole }
              name = 'password'
              placeholder = { signup_screen_texts.password }
              styling={styles.fullInputArea}
            />
          <Field
              component = { PasswordInputMole }
              name = 'confirmPassword'
              placeholder = { signup_screen_texts.confirmPassword }
              styling={styles.fullInputArea}
            />

            {/* {error.signup_error &&  <Text>{error.signup_error}</Text>} */}
          </View>

          <View style={styles.checkMark} flexDirection="row">
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color={Colors.DEEP_BLUE}
            />

            <CustomText styling={{...styles.terms_conditions,...defaultMediumSmallText(DEEP_BLUE, 'center')}}>
              {" "}
              I have gone through and agree with the{" "}
              <CustomText styling={{...styles.underline,...defaultMediumSmallText(DEEP_BLUE, 'center')}}>terms and conditions </CustomText>
               and <CustomText styling={{...styles.underline,...defaultMediumSmallText(DEEP_BLUE, 'center')}}>privacy policy</CustomText>
            </CustomText>
          </View>

          <View>
            <ErrorTextAtom error = {error.signup_error}/>

            <ButtonAtom styling ={styles.button} active = { isValid && !signingUp } text = { signup_screen_texts.register } action = {handleSubmit}/>
{/* 
            <TouchableOpacity
              disabled={!checked && !isValid && signingUp}
              style={[
                styles.button,
                {
                  backgroundColor: checked ? Colors.DEEP_BLUE : Colors.GRAY_MEDIUM,
                },
              ]} 
              onPress= { handleSubmit } 
            >
              <Text style={styles.btnText}>  </Text>
            </TouchableOpacity> */}
          </View>
        </>
        )}
      </Formik>
      <ClickableTextAtom
        action = {() => navigation.navigate("Login")}
        text = { signup_screen_texts.i_already_have_an_account }
        styling = {styles.bottomestTxt}
      />
      </View>
     </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  statusbar: {
    height: StatusBar.currentHeight,
    width: "100%",
    backgroundColor: Colors.PRIMARY,
  },
  middle: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  signuptxt: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "serif",
    color: Colors.DEEP_BLUE,
  },

  halfInputArea: {
    width: 150,
  },

  fullInputArea: {
    width: 310,
  },

  button: {
    marginTop: 30,
    width: 290,
    height: 50,
    // backgroundColor: Colors.GRAY_MEDIUM,
    backgroundColor: Colors.DEEP_BLUE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 10,
  },
  btnText: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  underline: {
    textDecorationLine: "underline",
  },
  checkMark: {
    ...margin(10,20,10,20)
  },
  terms_conditions: {
    marginTop: 5,
    color: Colors.DEEP_BLUE,
  },
  bottomestTxt: {
    marginBottom: 20,
    color: Colors.DEEP_BLUE,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default SignupScreen;
