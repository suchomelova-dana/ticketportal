import { Pressable } from "react-native";
import { View, Text } from "../Themed";
import { Match } from "@/types/Match";
import { useAppStore } from "@/store/useAppStore";
import { commonStyles } from "@/styles/commonStyles";

type Props = {
    match: Match,
}

export function MatchItem({match}: Props) {

    const removeMatch = useAppStore(state => state.removeMatch);
    const teams = useAppStore(state => state.teams);

    const teamAName = teams.find(t => t.id === match.teamA)
    const teamBName = teams.find(t => t.id === match.teamB)

    return (
        <View style={{ paddingBottom: 10, flexDirection: "row"  }}>
            <Text>{teamAName?.name} vs {teamBName?.name}</Text>
            <Pressable onPress={() => removeMatch(match.id)}>
                <Text style={{ ...commonStyles.button, color: "red"}}>Odstranit</Text>
            </Pressable>
        </View>
    )
}