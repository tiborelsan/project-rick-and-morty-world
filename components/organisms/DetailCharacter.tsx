import { StyleSheet, useColorScheme, Dimensions, Animated, TouchableOpacity } from 'react-native';

import { View } from '@/components/organisms/Themed';
import { SimpleText } from '@/components/atoms/SimpleText';
import { useEffect, useRef, useState } from 'react';
import { CharacterApi } from '@/api';
import { format } from 'date-fns';
import Colors from '@/constants/Colors';
import { SimpleLoading } from '../atoms/SimpleLoading';

export default function DetailCharacter({id, style} : {id: number, style?: any}) {
    const colorScheme = useColorScheme();

    const [character, setCharacter] = useState<any>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const colorText = Colors[colorScheme ?? 'light'].textLight;

    const rotation = useRef(new Animated.Value(0)).current;

    const { width } = Dimensions.get('window');

    useEffect(() => {
        _getCharacterDetail();
    }, [id]);

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

        CharacterApi.getCharacterDetail(id)
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
            <View>
                <SimpleText style={styles.title}>{error}</SimpleText>
            </View>
        );
    }

    if (loading) {
        return (
            <View>
                <SimpleLoading />
            </View>
        );
    }

    if (character === null) {
        return (
            <View>
                <SimpleText style={styles.title}>No data</SimpleText>
            </View>
        );
    }

    return (
        <View style={style}>
            <TouchableOpacity onPress={handleImagePress} activeOpacity={1}>
                <Animated.Image
                    source={{ uri: character.image }}
                    style={{ width: width / 2, height: width / 2, transform: [{ rotate: spin }], borderRadius: 180 }}
                />
            </TouchableOpacity>

            <SimpleText style={styles.title} color={colorText}>{character.name}</SimpleText>
            <SimpleText style={styles.info} color={colorText}><SimpleText bold color={colorText}>Species :</SimpleText>{character.species}</SimpleText>
            <SimpleText style={styles.info} color={colorText}><SimpleText bold color={colorText}>Gender :</SimpleText> {character.gender}</SimpleText>
            <SimpleText style={styles.info} color={colorText}><SimpleText bold color={colorText}>Number of episode :</SimpleText> {character.episode.length}</SimpleText>
            <SimpleText style={styles.info} color={colorText}><SimpleText bold color={colorText}>Location :</SimpleText> {character.location.name}</SimpleText>
            <SimpleText style={styles.info} color={colorText}><SimpleText bold color={colorText}>Created date :</SimpleText> {format(character.created, "PPP")}</SimpleText>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
    }
});
