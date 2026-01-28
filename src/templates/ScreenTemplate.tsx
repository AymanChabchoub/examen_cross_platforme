import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    children: ReactNode;
}

function ScreenTemplate({ children }: Props) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
});

export default ScreenTemplate;