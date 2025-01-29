import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, useColorScheme, Image, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';

import { View } from '@/components/organisms/Themed';
import { SimpleText } from '@/components/atoms/SimpleText';
import Colors from '@/constants/Colors';
import { useEffect, useRef, useState } from 'react';
import { CharacterApi } from '@/api';
import { useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns';

export default function DetailScreen() {
    const colorScheme = useColorScheme();
    const params: any = useLocalSearchParams();

    const [character, setCharacter] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const rotation = useRef(new Animated.Value(0)).current;

    const { width } = Dimensions.get('window');

    useEffect(() => {
        _getCharacterDetail();
    }, []);

    const handleImagePress = () => {
        setClickCount(prev => prev + 1);

        if (clickCount + 1 === 5) {
            Animated.timing(rotation, {
                toValue: 1,
                duration: 600, // Durée de l'animation
                useNativeDriver: true
            }).start(() => {
                rotation.setValue(0);
                setClickCount(0); // Reset après l'animation
            });
        }
    }

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const _getCharacterDetail = () => {
        setLoading(true);

        CharacterApi.getCharacterDetail(params.id)
            .then((data: any) => {
                setCharacter(data);
            })
            .catch((error: any) => {
                setError(error.message || "An error occurred");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (error && error !== "") {
        return (
            <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                <SimpleText style={styles.title}>{error}</SimpleText>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                <SimpleText style={styles.title}>Loading ...</SimpleText>
            </View>
        );
    }

    if (character === null) {
        return (
            <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                <SimpleText style={styles.title}>No data</SimpleText>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
            <TouchableOpacity onPress={handleImagePress} activeOpacity={1}>
                <Animated.Image
                    source={{ uri: character.image }}
                    style={{ width: width / 2, height: width / 2, transform: [{ rotate: spin }] }}
                />
            </TouchableOpacity>

            <SimpleText style={styles.title}>{character.name}</SimpleText>
            <SimpleText style={styles.info}>{character.species}</SimpleText>
            <SimpleText style={styles.info}>{character.gender}</SimpleText>
            <SimpleText style={styles.info}>Number of episode : {character.episode.length}</SimpleText>
            <SimpleText style={styles.info}>Location : {character.location.name}</SimpleText>
            <SimpleText style={styles.info}>Created date : {format(character.created, "PPP")}</SimpleText>

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
    }
});
