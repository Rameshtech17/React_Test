import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const fromatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
    minutes = 0,
    isPaused,
    onProgress,
    onEnd,
}) => {
    const intervel = React.useRef(null);
    const countDown = () => {
        setMillis((time) => {
            if (time === 0) {
                clearInterval(intervel.current);
                onEnd();
                return time;
            }
            const timeLeft = time - 1000;
            onProgress(timeLeft / minutesToMillis(minutes))
            return timeLeft;
        })
    }

    useEffect(() => {
        setMillis(minutesToMillis(minutes))
    }, [minutes])


    useEffect(() => {
        if (isPaused) {
            if (intervel.current) clearInterval(intervel.current);
            return;
        }
        intervel.current = setInterval(countDown, 1000);
        return () => clearInterval(intervel.current)
    }, [isPaused])

    const [millis, setMillis] = useState(minutesToMillis(minutes));
    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconts = Math.floor(millis / 1000) % 60;
    return (
        <Text style={style.text}>{fromatTime(minute)}:{fromatTime(seconts)}</Text>
    )
}

const style = StyleSheet.create({
    text: {
        color: colors.white,
        fontSize: fontSizes.xxl,
        fontWeight: 'bold',
        padding: spacing.lg,
        backgroundColor: colors.lightBlue,
    }
})