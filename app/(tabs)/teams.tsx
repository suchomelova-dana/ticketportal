import { Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { TeamsList } from '@/components/teams/TeamsList';
import { AddTeamDialog } from '@/components/teams/AddTeamDialog';
import { commonStyles } from '@/styles/commonStyles';

export default function TeamsPage() {

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Teams</Text>
        <View style={commonStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TeamsList />

        <Pressable style={commonStyles.button} onPress={() => setIsDialogOpen(true)}>
            <Text>Přidat tým</Text>
        </Pressable>

        <AddTeamDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </View>
  );
}
