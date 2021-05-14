import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet,  View, Platform } from 'react-native';
import { Focus } from './src/focus/focus';
import {Timer} from './src/timer/timer';
import {spacing} from './src/utils/sizes';
import {colors} from './src/utils/colors';
 
export default function App() {
  const [focusSubject, setFocuseSubject] = useState("hello");
  console.log("focus:", focusSubject);
  return (
    <View style={styles.container}>
      {focusSubject ? (<Timer focusSubject={focusSubject} onTimerEnd={()=>{
        setFocuseSubject(null);
      }}/>
      ) : (
          <Focus addSubject={setFocuseSubject} />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:Platform.OS ==='ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

});
