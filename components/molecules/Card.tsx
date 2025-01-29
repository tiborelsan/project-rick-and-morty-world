import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, useColorScheme, Image, TouchableOpacity } from 'react-native';

import { SimpleText } from '../atoms/SimpleText';
import { View } from '../organisms/Themed';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '@/store/favorites';
import { RootState } from '@/store/store';
import Favorite from '@/models/favorite';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';

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
    const animation = useRef<LottieView>(null);

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

        if (favorites.find(favorite => favorite.id === props.id)) {
            animation.current?.play(60, 0);
            dispatch(removeFavorite(favorite));
        }
        else {
            animation.current?.play();
            dispatch(addFavorite(favorite));
        }
    }

    return (
        <Link href={{ pathname: "/detail", params: { id: props.id, title: props.name } }} key={props.id}>
            <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].primary, flexDirection: props.isReverse ? 'row-reverse' : 'row' }]}>
                <Image source={{ uri: props.image }} style={{ width: 50, height: 50 }} />
                <View style={styles.info}>
                    <SimpleText>{props.name}</SimpleText>
                    <SimpleText>{props.species}</SimpleText>
                    <SimpleText>{props.gender}</SimpleText>
                </View>

                <LottieView
                    ref={animation}
                    autoPlay={false}
                    loop={false}
                    style={{
                        width: 46,
                        height: 46,
                        position: 'absolute',
                        top: -16.5,
                        right: -16.5,
                    }}
                    source={require('../../assets/lottie/favorite.json')}
                />

                <TouchableOpacity activeOpacity={0.7} style={styles.favorite} onPress={toggleFavorite}>
                    <FontAwesome name={isFavorite ? "star" : "star-o"} size={30} color={Colors[colorScheme ?? 'light'].favorite} />
                </TouchableOpacity>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        borderRadius: 16,
        padding: 16,
        paddingHorizontal: 24
    },
    info: {
        flex: 1,
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
