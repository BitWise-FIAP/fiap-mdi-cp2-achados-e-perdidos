import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CardPerdido() {
  const router = useRouter();

  return (
    <View>
      

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Perdeu algum item?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/itens')}
        >
          <Ionicons name="search-outline" size={20} color="#111" style={styles.icon} />
          <Text style={styles.buttonText}>Procurar item perdido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  card: {
    backgroundColor: '#EC0E7A',
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 85 ,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#F1F1F1',
    borderRadius: 14,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});