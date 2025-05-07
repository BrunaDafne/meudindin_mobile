import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  console.log('entrou na tela de login')
  const { login } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>
      <Button title="Entrar" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});
