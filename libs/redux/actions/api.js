import axios from "axios";
import { SECURITY_REALM, API_URL } from "_utils/constants";
import { getAuth, storeAuth, updateAuth } from '_utils/localStorage';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    return getAuth()
    .then(auth=>{
      console.log("sendin g request, ", auth)
        if (auth != null) {
          // check if token is expired, if so, renew token first then proceed with request
          // todo
          config.headers["Authorization"] = 'Bearer ' + JSON.parse(auth).access_token;  // if logged in add bearer
          return config;
        }else{
          console.log("no auth")
          config.headers["Authorization"] = SECURITY_REALM
          return config;
        }
    },
    (error) => {
      return Promise.reject(error);
    });
  });

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "oauth2/token" && err.response) {
      // Access Token was expired
      console.log("renewing expired token")
      if (err.response.status === 401 && !originalConfig._retry) {
        console.log("renewing expired token ------------------------")
        originalConfig._retry = true;
        try {
          return getAuth()
          .then(auth=>{
            console.log("saved token: ",JSON.parse(auth))
            if(auth){
              return instance.post("oauth2/token", {
                refresh_token: JSON.parse(auth).refresh_token,
              })
              .then(res =>{
                console.log(res.data)
                let _auth = JSON.parse(auth);
                _auth.access_token=res.data.access_token;
                _auth.refresh_token=res.data.refresh_token;
                return storeAuth(_auth)
                .then(()=>{
                  return instance(originalConfig)
                })
              });
            }else{
              return Promise.reject(err);
            }
          })
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default instance;