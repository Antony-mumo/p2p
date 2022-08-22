import * as Font from "expo-font";

export default useFonts = async () => {
   await Font.loadAsync({
      "poppins-medium" : require("../../assets/fonts/Poppins-Medium.ttf"),
      "poppins-semibold" : require("../../assets/fonts/Poppins-SemiBold.ttf"),
      "poppins-bold" : require("../../assets/fonts/Poppins-Bold.ttf"),
      "poppins-extrabold" : require("../../assets/fonts/Poppins-ExtraBold.ttf")

      
      // All other fonts here
    });
};