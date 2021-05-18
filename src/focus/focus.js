import React, { useState } from 'react';
import { StyleSheet, Text, View, nativeEvent } from 'react-native';
import { TextInput, } from "react-native-paper";
import { RoundedButton } from "./roundedButton";
import { fontSizes, spacing } from "../utils/sizes";
import { colors } from "../utils/colors";


export const Focus = ({ addSubject }) => {
    const onPressLearnMore = () => {
        //For generating alert on buttton click
        alert('Add Buttion Clicked');
    }
    const [subject, setSubject] = useState(null)
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}> What would you llike to focuss on?</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={{ flex: 1, marginRight: 20 }}
                        onSubmitEditing={({ nativeEvent }) => { setSubject(nativeEvent.text) }} />
                    <RoundedButton
                        size={50}
                        title="+"
                        onPress={() => {
                            addSubject(subject)
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: .5,
        padding: spacing.md,
        justifyContent: 'center',
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: fontSizes.lg,
    },
    inputContainer: {
        paddingTop: spacing.md,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
