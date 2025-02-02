import { Keyboard, StyleSheet, useColorScheme } from 'react-native';

import { View } from '@/components/organisms/Themed';
import { useCallback, useEffect, useState } from 'react';
import { MasonryFlashList } from '@shopify/flash-list';
import Card from '@/components/molecules/Card';
import { SimpleText } from '@/components/atoms/SimpleText';
import { CharacterApi } from '@/api';
import Colors from '@/constants/Colors';
import { SimpleInput } from '@/components/molecules/SimpleInput';
import useDebounce from '@/hooks/useDebounce';
import { NoData } from '@/components/molecules/NoData';
import { BlurView } from 'expo-blur';
import { SimpleLoading } from '@/components/atoms/SimpleLoading';

export default function TabOneScreen() {
    const colorScheme = useColorScheme();

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const debounceSearch = useDebounce(search, 1000);

    useEffect(() => {
        if (page > 1)
            _getCharacters();
    }, [page]);

    useEffect(() => {
        // Reset page to 1 when search change
        setPage(1);
        setDatas([]);

        Keyboard.dismiss();

        _getCharacters(true);
    }, [debounceSearch]);

    const _getCharacters = (reset: boolean = false) => {
        if (loading || !hasMore) return;

        setLoading(true);
        setError("");

        CharacterApi.getCharacters(page, search)
            .then((data: any) => {
                setDatas(prevDatas => reset ? data.results : [...prevDatas, ...data.results]);
                setHasMore(data.results.length > 0);
            })
            .catch((error: any) => {
                setError(error.response.data.error || "An error occurred");
            })
            .finally(() => {
                setLoading(false);
                if (reset) setRefreshing(false);
            });
    }

    // Fonction pour rafraîchir la liste
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setPage(1);
        _getCharacters(true);
    }, []);

    const renderItem = ({ item, index }: any) => {
        return <Card id={item.id} name={item.name} species={item.species} gender={item.gender} image={item.image} isReverse={index % 2 != 0} />
    }

    const renderEmpty = () => (
        loading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><SimpleLoading /></View>:
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SimpleText color={Colors[colorScheme ?? 'light'].textLight}>{error ?? "An error occured"}</SimpleText>
            <NoData />
        </View>
    )

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].secondary }]}>
            <MasonryFlashList
                contentContainerStyle={{ padding: 16, paddingHorizontal: 24, paddingBottom: 81 }}
                renderItem={renderItem}
                data={datas}
                numColumns={2}
                ListEmptyComponent={renderEmpty}
                keyExtractor={(item: any) => item.id.toString()}
                onEndReached={() => setPage(prevPage => prevPage + 1)} // Next page
                onEndReachedThreshold={0.3} // Load at 30% before the end
                refreshing={refreshing}
                onRefresh={handleRefresh}
                estimatedItemSize={100} />

            <BlurView experimentalBlurMethod='dimezisBlurView' intensity={5} style={{ position: 'absolute', bottom: 0, width: '100%', height: 65 }}>
                <SimpleInput onChangeText={setSearch} placeholder='Search here..' placeholderTextColor={'#FFF'} style={{backgroundColor: 'rgba(45, 45, 45, .2)', color: '#FFF', height: 65, paddingHorizontal: 24}} />
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
