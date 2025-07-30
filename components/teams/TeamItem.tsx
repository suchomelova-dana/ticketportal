import { Text, View } from '@/components/Themed';
import { useAppStore } from '@/store/useAppStore';
import { Team } from '@/types/Team';
import { FlatList, Pressable } from 'react-native';

type Props = {
    team: Team
}

export function TeamItem({team}: Props) {

    const removeTeam = useAppStore(state => state.removeTeam);

    return (
        <View style={{ paddingBottom: 10 }}>
            <Text>{team.name}</Text>
            <FlatList
                data={team.players}
                keyExtractor={(item) => item}
                contentContainerStyle={{ paddingVertical: 20 }}
                renderItem={({ item }) => (
                    <Text>{item}</Text>
                )}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', color: '#666' }}>
                        Žádní hráči
                    </Text>
                }
                style={{marginLeft: 10}}
            />
            <Pressable onPress={() => removeTeam(team.id)}>
                <Text style={{ color: "red"}}>Odstranit</Text>
            </Pressable>
        </View>
    )
}