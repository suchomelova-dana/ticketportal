import { FlatList } from 'react-native';
import { Text } from '@/components/Themed';
import { useAppStore } from '@/store/useAppStore';
import { MatchItem } from './MatchItem';


export function MatchesList() {
    const matches = useAppStore(state => state.matches)

    return (
        <FlatList
            data={matches}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingVertical: 20 }}
            renderItem={({ item }) => (
                <MatchItem match={item} />
            )}
            ListEmptyComponent={
                <Text style={{ textAlign: 'center', color: '#666' }}>
                    Žádné zápasy
                </Text>
            }
        />
    )
}
