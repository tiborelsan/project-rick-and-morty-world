import { StyleSheet, useColorScheme } from 'react-native';

import { Text, View } from '@/components/organisms/Themed';
import { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import Card from '@/components/molecules/Card';
import { SimpleText } from '@/components/atoms/SimpleText';
import { CharacterApi } from '@/api';
import Colors from '@/constants/Colors';

export default function TabOneScreen() {
    const colorScheme = useColorScheme();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        _getCharacters();
    }, [page]);

    useEffect(() => {
        // Reset page to 1 when search change
        setPage(1);
        setDatas([]);

        _getCharacters();
    }, [search]);

    const _getCharacters = async () => {
        setError("");

        CharacterApi.getCharacters(page, search)
            .then((data: any) => {
                setDatas(data.results);
            })
            .catch((error: any) => {
                setError(error);
            });
    }

    const renderItem = ({item, index}: any) => {
        return <Card id={item.id} name={item.name} species={item.species} gender={item.gender} image={item.image} isReverse={index % 2 != 0} />
    }

    const renderEmpty = () => (
        <SimpleText>{error ?? 'No data'}</SimpleText>
    )

    return (
        <View style={[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].secondary}]}>
            <FlashList
                contentContainerStyle={{ padding: 16, paddingHorizontal: 24 }}
                renderItem={renderItem}
                data={datas}
                ItemSeparatorComponent={() => <View style={{ height: 16, backgroundColor: Colors[colorScheme ?? 'light'].secondary }} />}
                ListEmptyComponent={renderEmpty}
                keyExtractor={(item: any) => item.id.toString()}
                estimatedItemSize={100} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
