import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erros, setErros] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validar = () => {
    const novosErros = {};
    if (!email.includes('@')) novosErros.email = 'E-mail inválido';
    if (senha.length < 6) novosErros.senha = 'Senha deve ter mínimo 6 caracteres';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleLogin = async () => {
    if (validar()) {
      setLoading(true);
      try {
        const usersStr = await AsyncStorage.getItem('users');
        const users = usersStr ? JSON.parse(usersStr) : [];
        const user = users.find(u => u.email === email && u.senha === senha);
        if (user) {
          await AsyncStorage.setItem('userToken', user.id);
          Alert.alert('Sucesso!', `Bem-vindo, ${user.nome}! 🎉`, [
            { text: 'OK', onPress: () => router.replace('/(tabs)') }
          ]);
        } else {
          Alert.alert('Erro', 'E-mail ou senha incorretos!');
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha no login.');
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
      <Text style={styles.titulo}>🔐 Login</Text>
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
      <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Entrar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.linkBotao} 
        onPress={() => router.push('/(auth)/cadastro')}
      >
        <Text style={styles.linkTexto}>Não tem conta? Cadastrar</Text>
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
