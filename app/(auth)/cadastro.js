import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [repetirSenhaVisivel, setRepetirSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validar = () => {
    const novosErros = {};
    if (nome.trim().length < 2) novosErros.nome = 'Nome deve ter pelo menos 2 caracteres';
    if (!email.includes('@') || !email.includes('.')) novosErros.email = 'E-mail inválido';
    if (senha.length < 6) novosErros.senha = 'Senha deve ter mínimo 6 caracteres';
    if (senha !== repetirSenha) novosErros.repetirSenha = 'Senhas não coincidem';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleCadastro = async () => {
    if (validar()) {
      setLoading(true);
      try {
        // Load existing users
        const usersStr = await AsyncStorage.getItem('users');
        const users = usersStr ? JSON.parse(usersStr) : [];
        // Check if email exists
        if (users.find(u => u.email === email)) {
          Alert.alert('Erro', 'E-mail já cadastrado!');
          return;
        }
        // Add new user
        const newUser = {
          id: Date.now().toString(),
          nome,
          email,
          senha // In real app, hash password
        };
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        // Auto-login
        await AsyncStorage.setItem('userToken', newUser.id);
        Alert.alert('Sucesso!', `Bem-vindo, ${nome}! 🎉`, [
          { text: 'OK', onPress: () => router.replace('/(tabs)') }
        ]);
      } catch (error) {
        Alert.alert('Erro', 'Falha no cadastro.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.titulo}>📝 Cadastro</Text>
      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      {erros.email && <Text style={styles.erro}>{erros.email}</Text>}
      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={!senhaVisivel}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
        />
        <Text
          onPress={() => setSenhaVisivel(!senhaVisivel)}
          style={styles.olho}
        >
          {senhaVisivel ? '🙈' : '👁️'}
        </Text>
      </View>
      {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}
      <View style={styles.senhaContainer}>
        <TextInput
          placeholder="Repetir senha"
          value={repetirSenha}
          onChangeText={setRepetirSenha}
          secureTextEntry={!repetirSenhaVisivel}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
        />
        <Text
          onPress={() => setRepetirSenhaVisivel(!repetirSenhaVisivel)}
          style={styles.olho}
        >
          {repetirSenhaVisivel ? '🙈' : '👁️'}
        </Text>
      </View>
      {erros.repetirSenha && <Text style={styles.erro}>{erros.repetirSenha}</Text>}
      <TouchableOpacity style={styles.botao} onPress={handleCadastro} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.linkBotao} 
        onPress={() => router.push('/(auth)/login')}
      >
        <Text style={styles.linkTexto}>Já tem conta? Fazer login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
    padding: 24, backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 32, fontWeight: 'bold',
    textAlign: 'center', marginBottom: 32, color: '#333',
  },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',
    borderRadius: 10, padding: 14, marginBottom: 8, fontSize: 16,
  },
  senhaContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd',
    borderRadius: 10, marginBottom: 8,
  },
  olho: { padding: 14, fontSize: 20 },
  erro: { color: 'red', marginBottom: 8, marginLeft: 4 },
  botao: {
    backgroundColor: '#6c47ff', borderRadius: 10,
    padding: 16, marginTop: 16, alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  linkBotao: {
    marginTop: 16, alignItems: 'center',
  },
  linkTexto: { 
    color: '#6c47ff', fontSize: 16, fontWeight: '600' 
  },
});
