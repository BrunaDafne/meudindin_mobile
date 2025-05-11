import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Budget() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Orçamento</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
});
