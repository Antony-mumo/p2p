import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

 import CustomText from '_components/atoms/CustomText.atom';
import { DEEP_BLUE, BLACK,WHITE } from '_styles/colors';
import { padding, defaultMargin } from "_styles/mixins";
import {  mediumLargeBoldText, mediumSmallExtraBoldText } from '_styles/typography';

const notificationData = [
  {
      id: 1,
      title: "On my way",
      message: "John Otieno will be there in 15 minutes"
  },
  {
      id: 2,
      title: "Task Complete",
      message: "John Otieno has completed the task as promsed"
  },
  {
      id: 3,
      title: "John Otieno Says",
      message: "I'll be there in 15 minutes"
  },
  {
      id: 4,
      title: "John Otieno Says",
      message: "I'll be there in 15 minutes"
  },
  {
      id: 5,
      title: "John Otieno Says",
      message: "I'll be there in 15 minutes"
  },
  {
      id: 6,
      title: "John Otieno Says",
      message: "I'll be there in 15 minutes"
  },
  {
  
      id: 7,
      title: "John Otieno Says",
      message: "I'll be there in 15 minutes"
  },
  {
      id: 8,
      title: "John Otieno Says",
      message: "I'll be there in 15 minutes"
  
  }
  ]

const OrderAltertsScreen = ({navigation}) => {
  return (
    <SafeAreaView>
       <ScrollView
         showsVerticalScrollIndicator={false}
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={{
           ...padding(3,5,3,5),
           height: "auto",}}
       >
        {notificationData.map((item, index) => (
         <View style={styles.OrdercardContainer} key={index}>
            <CustomText
              text={item.title}
              styling={mediumLargeBoldText(DEEP_BLUE, 'left')}
            />
             <CustomText
              text={item.message}
              styling={mediumSmallExtraBoldText(DEEP_BLUE, 'left')}
            />

         </View>
         ))}
       </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  OrdercardContainer: {
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

export default OrderAltertsScreen;