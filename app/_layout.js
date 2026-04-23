import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.log('Erro ao verificar auth:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const limparItens = async () => {
      try {
        await AsyncStorage.removeItem('itens');
        console.log('Itens cadastrados foram apagados ao abrir o app.');
      } catch (error) {
        console.log('Erro ao limpar itens:', error);
      }
    };

    limparItens();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/cadastro" />
      </Stack>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/cadastro" />
      <Stack.Screen name="suporte" options={{ title: 'Suporte' }} />
    </Stack>
  );
}
