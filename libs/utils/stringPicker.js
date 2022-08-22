const en = require("../assets/languages/en.json");
const ks = require("../assets/languages/ks.json");

import * as Storage from "./localStorage";

const code = "en";

Storage.getLanguageCode().then(
  _code=>{
    if(_code){
      console.log("code changed")
      console.log(code)
      code = _code
    }
  }
)

const defaultLng = code;
// Do not edit/remove/add anything below this line!!!


//  General String
const __ = (keyString, selectedLanguage) => {
  // let data = `${defaultLng}.${keyString}`;
  let data = `${selectedLanguage}.${keyString}`;
  return `${eval(data)}`;
};



export {
  __,
  defaultLng,
}