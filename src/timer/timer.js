import React, { useState } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { colors } from "../utils/colors";
import { spacing } from '../utils/sizes';
import { Countdown } from '../focus/Countdown';
import { RoundedButton } from "../focus/roundedButton";
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd}) => {
    useKeepAwake();

    const interval = React.useRef(null);
    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);

    const onProgress = (progress) => {
        setProgress(progress)
    }

    const vibrate = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setInterval(() => clearInterval(interval), 1000);
        }
        else {
            Vibration.vibrate(1000);
            console.log('Vibration: Android')
        }
    };
    const onEnd = () => {
        vibrate();
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
        onTimerEnd();
    };
    const changeTime = (min) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    };
    return (
        <View style={style.container}>
            <View style={style.countdown}>
                <Countdown
                    minutes={minutes}
                    isPaused={!isStarted}
                    onProgress={onProgress}
                    onEnd={onEnd} />
            </View>
            <View style={ {paddingTop: spacing.xxl }}>
                <Text style={style.title}> Focusing On:</Text>
                <Text style={style.task}>{focusSubject} </Text>
            </View>
            <View style={ {paddingTop: spacing.sm }}> 
            <ProgressBar
                progress={progress}
                color='#6B84B2'
                style={{ height: 10 }} />
            </View>
            <View style={style.buttonWrapper}>
                <Timing onchangeTime={changeTime} />

            </View>
            <View style={style.buttonWrapper}>
                {isStarted ? (<RoundedButton title="Pause" size={50} onPress={() => setIsStarted(false)} />
                ) : (<RoundedButton title="Start" size={50} onPress={() => setIsStarted(true)} />
                    )}

            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'white'
    },
    title: {
        color: colors.white,
        textAlign: 'center',
        // backgroundColor:'white'

    },
    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    countdown:
    {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',

    }
})