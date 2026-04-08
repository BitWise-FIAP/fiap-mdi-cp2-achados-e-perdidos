import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👤 Perfil</Text>
      <Text style={styles.descricao}>Informações do usuário</Text>

      <View style={styles.info}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>João Silva</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>joao.silva@email.com</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Telefone:</Text>
        <Text style={styles.value}>(11) 99999-9999</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center',
  },
  info: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 80,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});