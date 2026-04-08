import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import CardPerdido from '../components/CardPerdido';
import CardHome from '../components/CardHome';
import Carossel from '../components/Carrossel';


export default function Home() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      
        <CardPerdido></CardPerdido>
      <View style={styles.section}> 
        <Carossel></Carossel>
      </View>
      
      <View style={styles.section}> 
       <View style={styles.actions}>
        <CardHome
          icon="cube-outline"
          title="Cadastrar item encontrado"
          onPress={() => router.push('/cadastro')}
        />

        <CardHome
          icon="eye-outline"
          title="Ver todos os itens"
          onPress={() => router.push('/itens')}
        />

        <CardHome
          icon="chatbubble-outline"
          title="Falar com suporte"
          onPress={() => router.push('/suporte')}
        />
        </View>
      </View>

      {/* <Text style={styles.titulo}>🏠 Home</Text> */}
     <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button}>
    <Text style={styles.buttonText} onPress={() => router.push('/perfil')}>Ir para Perfil</Text>
  </TouchableOpacity>
</View>
      
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  // titulo:    { fontSize: 32, fontWeight: 'bold', marginBottom: 24 },
   content: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginTop: 50,
  },
  botao:     { backgroundColor: '#E83D84', padding: 16, borderRadius: 12, alignItems: "center" },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },

  button: {
    backgroundColor: '#EC0E7A',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

 
  
});