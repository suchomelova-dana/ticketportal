import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { commonStyles } from '@/styles/commonStyles';

export default function AboutPage() {
  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>About</Text>
      <View style={commonStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
