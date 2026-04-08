import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [data, setData] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = async () => {
    if (!nome || !descricao || !local || !data) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const newItem = {
      id: Date.now(), // Simple ID
      nome,
      descricao,
      local_perdido: local,
      data,
      imagem: imagem || 'https://via.placeholder.com/300', // Default image
    };

    try {
      const storedItens = await AsyncStorage.getItem('itens');
      const itens = storedItens ? JSON.parse(storedItens) : [];
      itens.push(newItem);
      await AsyncStorage.setItem('itens', JSON.stringify(itens));
      Alert.alert('Sucesso', 'Item cadastrado com sucesso!');
      // Reset form
      setNome('');
      setDescricao('');
      setLocal('');
      setData('');
      setImagem('');
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o item.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📝 Cadastrar Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do item"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Local perdido"
        value={local}
        onChangeText={setLocal}
      />

      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={data}
        onChangeText={setData}
      />

      <TextInput
        style={styles.input}
        placeholder="URL da imagem (opcional)"
        value={imagem}
        onChangeText={setImagem}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.voltar}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E83D84',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  voltar: {
    fontSize: 16,
    color: '#E83D84',
    fontWeight: '600',
    textAlign: 'center',
  },
});