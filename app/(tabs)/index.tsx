import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { QuoteType } from '../../types/Quote';
import { commonStyles } from '@/styles/commonStyles';

const ENDPOINT_URL = "https://dummyjson.com/quotes/1";

export default function HomePage() {

  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(ENDPOINT_URL);
        const jsonRes = await res.json() as QuoteType;
        setQuote(jsonRes.quote)
      } catch (error) {
        console.error('Chyba při načítání citátu:', error);
      }
    }

    fetchQuote();
  }, []) 

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Homepage</Text>
      <Text style={{ fontSize: 20 }}>{quote}</Text>
      <View style={commonStyles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}
