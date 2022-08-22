import { getAuth } from '_utils/localStorage';
import api from './api'

const login = (email, password) => {
    console.log('logging in')
    return api
      .post("oauth2/token", {
        email,
        password
      })
      .then(response => {
        return response.data;
      })
      .catch(err=>Promise.reject(err.response.data))
      ;
  }


  const logout = () => {
    console.log('logging out')
    try {
      return getAuth()
      .then(auth=>{
          return api.get(`user/customer/logout?session=${JSON.parse(auth).session_id}`)
          .then(res =>{
            console.log(res.data)
            return res.data
          })
          .catch(err=>{
            console.log(err)
            Promise.reject(err.response.data)
          })
      })
    } catch (_error) {
      return Promise.reject(_error);
    }
  }


  const signup = (fName, lName, email, phoneNumber, password) => {
    console.log('signing up')
    return api
      .post("customer/signup", {
        fName,
        lName,
        email,
        phoneNumber,
        password
      })
      .then(response => {
        return response.data;
      })
      .catch(err=>Promise.reject(err.response.data))
      ;
  }


  const uploadFirebaseToken = (token) => {
    console.log('Posting firebase token')
    return api
      .post("user/customer/firebase/token", {
        token
      })
      .then(response => {
        return response.data;
      })
      .catch(err=>Promise.reject(err.response.data))
      ;
  }



  export {
    login,
    signup,
    logout,
    uploadFirebaseToken
  }