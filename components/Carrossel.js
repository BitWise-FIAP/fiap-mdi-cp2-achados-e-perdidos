import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const itensRecentes = [
  {
    id: '1',
    nome: 'Faires',
    local: 'R0R0RhÃ',
    data: '08/04/2024',
    imagem: require('../assets/chaves.jpg'),
  },
  {
    id: '2',
    nome: 'Carteira',
    local: 'Biblioteca',
    data: '07/04/2024',
    imagem: require('../assets/carteira.jpg'),
  },
  {
    id: '3',
    nome: 'Garrafa',
    local: 'Sala 201',
    data: '06/04/2024',
    imagem: require('../assets/garrafa.webp'),
  },
];

function ItemCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Image source={item.imagem} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>
          {item.nome}
        </Text>

        <View style={styles.row}>
          <Ionicons name="location-outline" size={13} color="#EC0E7A" />
          <Text style={styles.meta} numberOfLines={1}>
            {item.local}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time-outline" size={13} color="#EC0E7A" />
          <Text style={styles.meta}>{item.data}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward-outline" size={18} color="#888" />
    </TouchableOpacity>
  );
}

export default function RecentItemsCarousel() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itens encontrados recentemente</Text>

      <FlatList
        data={itensRecentes}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => console.log('Abrir item:', item.nome)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 10,
  },
  listContent: {
    paddingRight: 8,
  },
  card: {
    width: 250,
    backgroundColor: '#F3F3F3',
    borderRadius: 14,
    padding: 10,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: '#7A7A7A',
    marginLeft: 4,
  },
});