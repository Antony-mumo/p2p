import { Platform } from "react-native";
import * as actions from "_services/actions";
import { getAuth } from "_utils/localStorage";
import { getLanguageCode } from "_utils/localStorage";
import { defaultLng } from "_utils/stringPicker";

let auth = null

getAuth().then(_auth => (auth = _auth));

export const initialState = {
    ios: Platform.OS === "ios",
    loggedIn : !!auth,
    auth_token: auth || null,
    user: auth ? auth.user : null ,
    appSettings: {
      lng: defaultLng,
    },
    services: [],
    notifications: [],
    selectedService : null,
    error: {},
}


const reducer = (state, action) => {
  console.log(action)
    switch(action.type){
        case "SET_SETTINGS":
            return {
              ...state,appSettings: action.appSettings,
            };
        case actions.LOGIN_REQUEST:
            return {
              ...state,loggingIn: true, error: {}
            };
        case actions.LOGIN_REQUEST_ERROR:
            return {
              ...state,loggingIn: false, error : { loggin_error : action.error }
            };
        case actions.LOGIN_REQUEST_SUCCESSFUL:
          return {
            ...state,loggingIn: false, error : {}, auth_token : action.auth, loggedIn : true,
          };
          case actions.SIGNUP_REQUEST:
              return {
                ...state,signingUp: true, error: {}
              };
          case actions.SIGNUP_REQUEST_ERROR:
              return {
                ...state,signingUp: false, error : { signup_error : action.error }
              };
        case actions.SIGNUP_REQUEST_SUCCESSFUL:
          return {
            ...state,signingUp: false, error : {}, signedUp : true,
          };
          // case actions.LOGOUT_REQUEST:
          //     return {
          //       ...state,loggingOut: true, error: {}
          //     };
          // case actions.LOGOUT_REQUEST_ERROR:
          //     return {
          //       ...state,loggingOut: false, error : { logout_error : action.error }
          //     };
          // case actions.LOGOUT_REQUEST_SUCCESSFUL:
          //   return {otpRequestSentEST:
            return {
              ...state,loggingOut: true, error: {}
            };
        case actions.LOGOUT_REQUEST_ERROR:
            return {
              ...state,loggingOut: false, error : { loggout_error : action.error }
            };
        case actions.LOGOUT_REQUEST_SUCCESSFUL:
          return {
            ...state,loggingOut: false, error : {}, auth_token : null, loggedIn : false,
          };
        case actions.ORDER_IN_PROGRESS: 
        return{
          ...state, inprogress: true, error: {}
        }
        case actions.ORDER_DONE: 
        return{
          ...state, done: true, error: {}
        };
        case actions.ORDER_CANCELLED: 
        return{
          ...state, cancelled: true, error: {}
        }
        case actions.OTP_REQUEST:
          return{
            ...state, requestingOtauthop: true, error: {}
          };
        case actions.OTP_REQUEST_ERROR:
          return{
            ...state, requestingOtp: false, error: {otpRequest_error: action.error }
          };
        case actions.OTP_REQUEST_SUCCESSFUL:
          return{
            ...state, requestingOtp: false, error: {}, 
          };
        case actions.VERIFY_OTP:
          return{
            ...state, verfiyingOtp: true, error: {}, otpRequestSent : false,
          };
        case actions.VERIFY_OTP_ERROR: 
          return{
            ...state, verifyingOtp: false, error: {verfiyingOtp_error: action.error }, otpRequestSent : false,
          };
        case actions.VERIFY_OTP_SUCCESFUL: 
          return{
            ...state, verifyingOtp: false, error: {}, otpRequestSent : true,
          }
          case actions.SERVICES_REQUEST:
            return {
              ...state,loadingServices : true, error: {}
            };
        case actions.SERVICES_REQUEST_ERROR:
            return {
              ...state,loadingServices: false, error : { services_error : action.error }
            };
        case actions.SERVICES_REQUEST_SUCCESSFUL:
          return {
            ...state,loadingServices: false, error : {}, services : action.services,
          };
        case actions.POST_JOB:
          return {
            ...state,postingJob : true, error: {},postingJobSuccessful : false,
          };
        case actions.POST_JOB_ERROR:
            return {
              ...state,postingJob: false, error : { job_post_error : action.error },postingJobSuccessful : false,
            };
        case actions.POST_JOB_SUCCESSFUL:
          return {
            ...state,postingJob: false, error : {}, postingJobSuccessful : true, posted_job: action.postedJob,
          };
        case actions.SET_FIREBASE_TOKEN:
          return {
            ...state,settingFirebaseToken : true, error: {}
          };
        case actions.SET_FIREBASE_TOKEN_ERROR:
            return {
              ...state,settingFirebaseToken: false, error : { settingFirebaseToken_error : action.error }
            };
        case actions.SET_FIREBASE_TOKEN_SUCCESSFUL:
          return {
            ...state,settingFirebaseToken: false, error : {}, auth_token : action.auth,
          };
        case actions.GET_NOTIFICATION:
          return {
            ...state, gettingNotifications: true, error: {}
          };
        case actions.GET_NOTIFICATION_SUCCESFUL:
          return {
            ...state, gettingNotifications: false, error: {}, notifications: action.notifications,
          };  
        case actions.GET_NOTIFICATION_ERROR:
        return {
          ...state, gettingNotifications: false, error: {notifications_error: action.error}
        };

        default:
            return state;
    }
    
}

export default reducer;