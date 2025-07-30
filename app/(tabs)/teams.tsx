import { FlatList, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { TeamsList } from '@/components/teams/TeamsList';
import { AddTeamDialog } from '@/components/teams/AddTeamDialog';

export default function TeamsPage() {

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Teams</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <TeamsList />

        <Pressable style={styles.button} onPress={() => setIsDialogOpen(true)}>
            <Text>Přidat</Text>
        </Pressable>


        <AddTeamDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    padding: 10,
  }
});
