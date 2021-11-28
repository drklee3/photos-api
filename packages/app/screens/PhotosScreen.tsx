import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function PhotosScreen({
    navigation,
}: RootTabScreenProps<"Photos">) {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Photos</Text>
            <View style={styles.highlight}>
                <Text style={[styles.h4, styles.highlightText]}>
                    Recent Highlights
                </Text>
            </View>
            <Text style={styles.h2}>November</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    h1: {
        fontSize: 40,
        fontWeight: "bold",
    },
    h2: {
        fontSize: 30,
    },
    h3: {
        fontSize: 25,
    },
    h4: {
        fontSize: 18,
    },
    highlight: {
        borderRadius: 20,
        height: 16 * 10,
        width: 9 * 10,
        backgroundColor: "#fff",
    },
    highlightText: {
        color: "#000",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
