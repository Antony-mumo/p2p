// Expo Libraries
import * as SecureStore from "expo-secure-store";

//keys
const authKey = "authUser";
const languageKey = "lang"


const storeAuth = async (authUser) => {
  try {
    await SecureStore.setItemAsync(authKey, JSON.stringify(authUser));
  } catch (error) {
    console.log(error)
    // TODO add error storing
  }
};

const getAuth = async () => {
  try {
    return await SecureStore.getItemAsync(authKey);
  } catch (error) {
    console.log(error)
    // TODO add error storing
  }
};

const removeAuth = async () => {
  try {
    return await SecureStore.deleteItemAsync(authKey);
  } catch (error) {
    console.log(error)
    // TODO add error storing
  }
};


const updateAuth = async (authUser) => {
  try {
    return getAuth()
    .then(auth => {
      return SecureStore.storeAuth({...JSON.parse(auth), ...authUser});
    })
  } catch (error) {
    console.log(error)
    // TODO add error storing
  }
};


const setLanguage = async (code) => {
  console.log("setting language")
  console.log(code)
  try {
    await SecureStore.setItemAsync(languageKey, code);
  } catch (error) {
    console.log(error)
    // TODO add error storing
  }
};

const getLanguageCode = async () => {
   try {
    return await SecureStore.getItemAsync(languageKey);
  } catch (error) {
    console.log(error)
    // TODO add error storing
  }
};

export { 
  storeAuth, 
  getAuth, 
  removeAuth, 
  updateAuth,
  setLanguage, 
  getLanguageCode 
};
