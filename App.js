import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Focus } from './src/focus/focus';
import { Timer } from './src/timer/timer';
import { spacing } from './src/utils/sizes';
import { colors } from './src/utils/colors';
import { FocusHistory } from './src/focus/focusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocuseSubject] = useState();
  const [focusHistory, setFocusHistoy] = useState([]);

  // useEffect(() => {
  //   if (focusSubject) {
  //     setFocusHistoy([...focusHistory, focusSubject])
  //   }
  // }, [focusSubject])

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistoy([...focusHistory, { key:String(focusHistory.length +1), subject, status }])
  }
  const onClear = () => {
    setFocusHistoy([]);
  }
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);

    }
  }
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistoy(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  }, [])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])

  console.log("focus:", focusHistory);
  return (
    <View style={styles.container}>
      {focusSubject ? (<Timer focusSubject={focusSubject} onTimerEnd={() => {
        addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
        setFocuseSubject(null);
      }}
        clearSubject={() => {
          addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
          setFocuseSubject(null)
        }}
      />
      ) : (
          <>
            <Focus addSubject={setFocuseSubject} />
            <FocusHistory focusHistory={focusHistory} onClear={onClear} />

          </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

});
