import { Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { commonStyles } from '@/styles/commonStyles';
import { MatchesList } from '@/components/matches/MatchesList';
import { AddMatchDialog } from '@/components/matches/AddMatchDialog';
import { useState } from 'react';

export default function MatchesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Matches</Text>
      <View style={commonStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <MatchesList />

      <Pressable style={commonStyles.button} onPress={() => setIsDialogOpen(true)}>
          <Text>Přidat zápas</Text>
      </Pressable>

      <AddMatchDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
    </View>
  );
}
