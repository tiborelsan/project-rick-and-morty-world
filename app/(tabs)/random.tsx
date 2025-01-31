import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { View } from '@/components/organisms/Themed';
import { SimpleText } from '@/components/atoms/SimpleText';
import Colors from '@/constants/Colors';
import DetailCharacter from '@/components/organisms/DetailCharacter';
import { useEffect, useState } from 'react';
import { CharacterApi } from '@/api';

export default function TabRandomScreen() {
    const colorScheme = useColorScheme();

    const [id, setId] = useState(0);
    const [maxLength, setMaxLength] = useState(100);

    useEffect(() => {
        getMaxLength();
    }, []);

    const getMaxLength = () => {
        CharacterApi.getCharacters(1, "").then((data: any) => {
            setMaxLength(data.info.count);
        });
    }

    const getRandomId = () => {
        setId(Math.floor(Math.random() * maxLength) + 1);
    }

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].secondary }]}>
            {id > 0 && <DetailCharacter id={id} style={{alignItems: 'center', padding: 16}} />}
            <TouchableOpacity onPress={getRandomId} activeOpacity={0.7} style={{ padding: 10, paddingHorizontal: 16, borderRadius: 8, backgroundColor: Colors[colorScheme ?? 'light'].primary }}>
                <SimpleText bold style={{fontSize: 17}}>Random</SimpleText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
