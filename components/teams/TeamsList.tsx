import { FlatList } from 'react-native';
import { Text } from '@/components/Themed';
import { TeamItem } from '@/components/teams/TeamItem';
import { useAppStore } from '@/store/useAppStore';


export function TeamsList() {
    const teams = useAppStore(state => state.teams)

    return (
        <FlatList
            data={teams}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingVertical: 20 }}
            renderItem={({ item }) => (
                <TeamItem team={item} />
            )}
            ListEmptyComponent={
                <Text style={{ textAlign: 'center', color: '#666' }}>
                    Žádné týmy
                </Text>
            }
        />
    )
}
