import { StyleSheet, useColorScheme } from 'react-native';

import { View } from '@/components/organisms/Themed';
import { SimpleText } from '@/components/atoms/SimpleText';
import Card from '@/components/molecules/Card';
import { FlashList } from '@shopify/flash-list';
import Colors from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function TabFavoriteScreen() {
    const colorScheme = useColorScheme();
    const favorites = useSelector((state: RootState) => state.favorites.items);

    const renderItem = ({ item, index }: any) => {
        return <Card id={item.id} name={item.name} species={item.species} gender={item.gender} image={item.image} isReverse={index % 2 != 0} />
    }

    const renderEmpty = () => (
        <SimpleText>No favorite(s)</SimpleText>
    )

    return (
        <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].secondary }]}>
            <FlashList
                contentContainerStyle={{ padding: 16, paddingHorizontal: 24 }}
                renderItem={renderItem}
                data={favorites}
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
