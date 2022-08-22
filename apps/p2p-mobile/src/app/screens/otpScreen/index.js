import React, { useEffect, useState } from 'react';
import { View, StatusBar, SafeAreaView, StyleSheet, Text, Pressable} from 'react-native';
import { useStateValue } from '_utils/StateProvider';
import { Colors } from '_styles';
import { __ } from '_utils/stringPicker';
import { Field, Formik } from 'formik';
import * as yup from 'yup';
import { requestOtp, verifyOtp } from '_services/otpReset.service';

import * as actions from '_services/actions'; 
import { AntDesign } from '@expo/vector-icons';
import { DEEP_BLUE, GRAY_MEDIUM, ORANGE, PRIMARY } from '_styles/colors';
import CustomText from '_components/atoms/CustomText.atom';
import { defaultMediumLargeText, defaultSmallText, FONT_SIZE_8 } from '_styles/typography';
import OtpInputMole from '_components/molecules/OtpInput.mole ';
import { margin, padding } from '_styles/mixins';
import ClickableUnderlinedTextAtom from '_components/atoms/clickableUnderlinedText.atom';
import CustomFloatingContent from '_components/atoms/CustomFloatingContent.atom';
import { storeAuth } from '_utils/localStorage';



const OtpScreen = ({ navigation }) => {

  const [ { appSettings, error, auth_token, loggedIn }, dispatch ] = useStateValue();

  const [requestSent, resendRequest] = useState(false)
  const [otpTimer, setOtpTimeOut] = useState(30)
  const [phoneNo , setPhoneNumber] = useState(auth_token.user.phoneNumber)

  useEffect(()=>{
    // requestUserOTP();
    setTimeout(()=>{
        if(otpTimer>0)
          setOtpTimeOut(otpTimer - 1)
      },1000)
  },[otpTimer])
  
  const otpValidationSchema = yup.object().shape({
    code: yup
      .string()
      .min(6, ({ min }) => `incomplete code`)
      .required('Field requiered'),
  })
 
  const requestUserOTP = (phoneNumber) => {
    dispatch({
      type : actions.OTP_REQUEST,
      otp: {phoneNumber : phoneNumber}
    })
    requestOtp(phoneNumber)
    .then(() => {
      dispatch({
        type: actions.OTP_REQUEST_SUCCESSFUL
      })
      setPhoneNumber(phoneNumber)
    }).catch(err=>{
      dispatch({
        type : actions.OTP_REQUEST_ERROR,
        error: err.message
      })
    }

    )
  }

  const verifyUserOtp = (otpCode) => {
    dispatch({
      type: actions.VERIFY_OTP
    })
    verifyOtp(phoneNo, otpCode)
    .then((res) =>{
      console.log(res)
      dispatch({
        type: actions.VERIFY_OTP_SUCCESFUL
      })
      const user = auth_token;
      user.user.isNumberVerified=true;
      storeAuth(user).then(()=>{
          console.log('updated')
          navigation.navigate('Home')
        }
      )
    }).catch(err=>{
      dispatch({
        type : actions.VERIFY_OTP_ERROR,
        error: err.message
      })

    })
  }

  useEffect(()=>{
    // requestUserOTP();
    loggedIn && loggedIn === true && requestUserOTP(auth_token.user.phoneNumber)

  },[])

return (
  
  <SafeAreaView style={styles.container}>
      <CustomFloatingContent>
          <Pressable style={padding(5,5,5,5)} onPress={()=>navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={DEEP_BLUE} />
          </Pressable>
      </CustomFloatingContent>
    <StatusBar barStyle="dark-content" translucent={false} backgroundColor={PRIMARY} />
    <View style={styles.main}>
      <CustomText
      text={'PASSWORD RESET'}
      styling={{...defaultMediumLargeText(GRAY_MEDIUM,'center')}}
      />
    </View>
    <View>
      <CustomText styling={{...margin(10,0,20,0)}}>
        Enter OTP sent to 254.......{phoneNo.substr(phoneNo.length - 4)}
      </CustomText>
    </View>
    <Formik
            validationSchema={otpValidationSchema}
            initialValues={{ code: '' }}
            onSubmit={values => verifyUserOtp(values.code) }
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
      <>

        <View style={styles.inputField}>

        <Field 
                    component = {OtpInputMole}
                    name = 'code'
                    placeholder = { '******' }
                    styling={styles.fullInputArea}
                    keyboardType="numeric"
                />
      </View>

      {error.verfiyingOtp_error && <CustomText styling={{ color: ORANGE, ...defaultSmallText, fontSize: FONT_SIZE_8}}>{error.verfiyingOtp_error}</CustomText>}

      { otpTimer > 0 &&
      <CustomText styling={margin(20,0,20,0)}>
        {`Resend OTP in ${otpTimer}s`}
      </CustomText>}
      {
        otpTimer == 0 && 
        <ClickableUnderlinedTextAtom action={requestUserOTP} styling={margin(20,0,20,0)}>
            Resend OTP
        </ClickableUnderlinedTextAtom>
      }

      <Pressable style={styles.button}  onPress={handleSubmit} >
          <Text style= {styles.btnText}>Submit</Text>
      </Pressable>
    
    
   </>
        )}
      </Formik>
  </SafeAreaView>
            
);

}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: "100%",
      alignItems: "center",
      backgroundColor: Colors.PRIMARY,
    },
    statusbar: {
      height: StatusBar.currentHeight,
      width: "100%",
      backgroundColor: Colors.PRIMARY,
    },
  
    main: {
      width: "100%",
      marginTop: 10,
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
    textEnter1: {
      backgroundColor: Colors.GRAY,
      width: 290,
      height: 50,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
      marginStart: 30,
      marginEnd: 30,
    },
    textEnter2: {
      backgroundColor: Colors.GRAY,
      width: 290,
      height: 50,
      borderTopEndRadius: 20,
      borderTopStartRadius: 20,
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
      marginTop: 20,
      marginStart: 30,
      marginEnd: 30,
    },
  
    button: {
      marginTop: 110,
      width: 290,
      height: 50,
      backgroundColor: Colors.DEEP_BLUE,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      elevation: 10,
    },
    btnText: {
      fontSize: 20,
      color: Colors.WHITE,
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
  

export default OtpScreen;
