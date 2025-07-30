import { Text, View } from '@/components/Themed';
import { useAppStore } from '@/store/useAppStore';
import { commonStyles } from '@/styles/commonStyles';
import { Team } from '@/types/Team';
import { useMemo } from 'react';
import { Pressable } from 'react-native';

type Props = {
    team: Team
}

export function TeamItem({team}: Props) {

    const removeTeam = useAppStore(state => state.removeTeam);
    const playersCount = useMemo(() => team.players.length, [team])

    return (
        <View style={{ paddingBottom: 10, flexDirection: "row", gap: 10  }}>
            <Text>{team.name}</Text>
            <Text>{playersCount}</Text>
            <Pressable onPress={() => removeTeam(team.id)}>
                <Text style={{ ...commonStyles.button, color: "red"}}>Odstranit</Text>
            </Pressable>
        </View>
    )
}