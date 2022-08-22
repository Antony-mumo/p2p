import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import notificationData from '_assets/data/notificationdata';
 import CustomText from '_components/atoms/CustomText.atom';
import { DEEP_BLUE, BLACK,WHITE } from '_styles/colors';
import { padding, defaultMargin } from "_styles/mixins";
import {  mediumLargeBoldText, mediumSmallExtraBoldText } from '_styles/typography';
const PromotionalScreen = () => {
  return (
    <SafeAreaView>
       <ScrollView
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{
           ...padding(3,5,3,5),
           height: "auto",}}
       >
        {notificationData.map((item) => (
         <View style={styles.PromotionalContainer}>
            <CustomText
              key="{item.title}"
              text={item.title}
              styling={mediumLargeBoldText(DEEP_BLUE, 'left')}
            />
             <CustomText
              key="{item.message}"
              text={item.message}
              styling={mediumSmallExtraBoldText(DEEP_BLUE, 'left')}
            />

         </View>
         ))}
       </ScrollView>


    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  PromotionalContainer: {
    padding: 5,
    backgroundColor: WHITE,
    ...defaultMargin(),
     borderRadius:10,
    width: "95%",
    flex: 1, 
    alignSelf: "center",
    minWidth: 100,
    height: "auto",
    elevation: 20,
    shadowColor: BLACK,
  }
});
export default PromotionalScreen;