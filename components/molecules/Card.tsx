import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme, Image, TouchableOpacity } from 'react-native';

import { SimpleText } from '../atoms/SimpleText';
import { View } from '../organisms/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '@/store/favorites';
import { RootState } from '@/store/store';
import Favorite from '@/models/favorite';

interface ICardProps {
    id: number;
    name: string;
    species: string;
    gender: string;
    image: string;
    isReverse?: boolean;
}

export default (props: ICardProps) => {
    const colorScheme = useColorScheme();
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const dispatch = useDispatch();

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(favorites.find(favorite => favorite.id === props.id) ? true : false);
    }, [favorites]);

    const toggleFavorite = () => {
        const favorite: Favorite = {
            id: props.id,
            name: props.name,
            species: props.species,
            image: props.image,
            gender: props.gender
        };

        if (favorites.find(favorite => favorite.id === props.id))
            dispatch(removeFavorite(favorite));
        else
            dispatch(addFavorite(favorite));
    }

    return (
        <View key={props.id} style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].primary, flexDirection: props.isReverse ? 'row-reverse' : 'row' }]}>
            <Image source={{ uri: props.image }} style={{ width: 50, height: 50 }} />
            <View style={styles.info}>
                <SimpleText>{props.name}</SimpleText>
                <SimpleText>{props.species}</SimpleText>
                <SimpleText>{props.gender}</SimpleText>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.favorite} onPress={toggleFavorite}>
                <FontAwesome name={isFavorite ? "star" : "star-o"}  size={30} color={Colors[colorScheme ?? 'light'].favorite} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        borderRadius: 16,
        padding: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'flex-end'
    },
    favorite: {
        position: 'absolute',
        top: -8,
        right: -8,
        elevation: 5,
    }
});
