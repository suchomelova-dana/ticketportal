import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { QuoteType } from '../../types/Quote';

export default function HomePage() {

  const ENDPOINT_URL = "https://dummyjson.com/quotes/1";

  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(ENDPOINT_URL);
        const jsonRes = await res.json() as QuoteType;
        setQuote(jsonRes.quote)
        console.log(jsonRes);
      } catch (error) {
        console.error('Chyba při načítání citátu:', error);
      }
    }

    fetchQuote();
  }, []) 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Homepage</Text>
      <Text style={styles.quote}>{quote}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  quote: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
