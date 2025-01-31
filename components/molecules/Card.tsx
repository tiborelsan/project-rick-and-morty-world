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
            animation.current?.play(0, 60);
            dispatch(addFavorite(favorite));
        }
    }

    return (
        <Link href={{ pathname: "/detail", params: { id: props.id, title: props.name } }} key={props.id} style={{ padding: 8 }} testID='card-test'>
            <View style={[styles.card, { width: '100%' }]}>
                <View style={{ zIndex: 5, width: 100, height: 100, position: 'relative' }}>
                    <Image source={{ uri: props.image }} style={{ width: 100, height: 100, borderRadius: 180, borderWidth: 5, borderColor: Colors[colorScheme ?? 'light'].secondary }} />

                    <LottieView
                        ref={animation}
                        autoPlay={false}
                        loop={false}
                        style={{
                            width: 56,
                            height: 56,
                            position: 'absolute',
                            top: -12,
                            right: -12
                        }}
                        source={require('../../assets/lottie/favorite.json')}
                    />
                    <TouchableOpacity activeOpacity={0.7} style={styles.favorite} onPress={toggleFavorite}>
                        <FontAwesome name={isFavorite ? "star" : "star-o"} size={40} color={Colors[colorScheme ?? 'light'].favorite} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.info, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}>
                    <SimpleText style={{ fontSize: 16 }} bold>{props.name}</SimpleText>
                    <SimpleText><SimpleText bold>Species :</SimpleText> {props.species}</SimpleText>
                    <SimpleText><SimpleText bold>Gender :</SimpleText> {props.gender}</SimpleText>
                </View>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    info: {
        borderRadius: 16,
        backgroundColor: 'transparent',
        paddingHorizontal: 16,
        paddingTop: 50,
        marginTop: -45,
        paddingBottom: 16,
        width: '100%'
    },
    favorite: {
        position: 'absolute',
        right: -3,
        top: -3,
        elevation: 5,
    },
    reversed: {

    },
});
