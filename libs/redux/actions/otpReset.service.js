import api from './api'

const requestOtp = (phoneNumber) => {
    console.log('requesting otp code ',phoneNumber)
    return api
    .post("sms/otp/request",{
        phoneNumber
    })
    .then(response =>{
        return response.data;
    } )
    .catch(err=>Promise.reject(err.response.data))
    ;
}

const verifyOtp = (phoneNumber, otpCode) => {
    console.log('verifying your otp code ')
    return api
    .post("sms/otp/confirm",{
        phoneNumber,
        otpCode
    })
    .then(response => {
        return response.data
    })
    .catch(err=>Promise.reject(err.response.data))
    ;

}

export{
    requestOtp,
    verifyOtp
}