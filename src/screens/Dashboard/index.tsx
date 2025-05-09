import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { logout } = useAuth();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <Button title="Sair" onPress={logout} />

      <Text style={styles.welcomeText}>Bem vindo(a), Bruna Dafne</Text>

      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.incomeCard]}>
          <Text style={styles.cardTitle}>Receita mensal</Text>
          <Text style={styles.cardValue}>R$ 5773</Text>
          <TouchableOpacity style={[styles.cardButtonReceita]}>
            <Text style={styles.cardButtonTextReceita}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.expenseCardColor]}>
          <Text style={styles.cardTitle}>Despesa mensal</Text>
          <Text style={styles.cardValue}>R$ 573</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximas despesas</Text>
          <Icon name="alert-circle" size={30} color="#FBBF24" />
        </View>

        <View style={styles.expenseCard}>
          <Text style={styles.expenseTitle}>Fatura Abril 2025</Text>
          <Text style={styles.expenseSub}>Cartão nubank - 25/04</Text>
          <Text style={styles.expenseAmount}>R$ 350,00</Text>
        </View>

        <View style={styles.expenseCard}>
          <Text style={styles.expenseTitle}>Fatura Abril 2025</Text>
          <Text style={styles.expenseSub}>Cartão nubank - 25/04</Text>
          <Text style={styles.expenseAmount}>R$ 350,00</Text>
        </View>

        <Icon name="chevron-down" size={24} color="#000" style={styles.dropdownIcon} />
      </View>

      <View style={styles.graphCard}>
        <Text style={styles.graphText}>
          GRÁFICO DE COLUNAS COM TOP 3 - 5 CATEGORIAS MAIS GASTAS COM PORCENTAGEM
        </Text>
      </View>

      <View style={styles.balanceHeader}>
        <Text style={styles.sectionTitle}>Saldos</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="plus" size={16} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="eye" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.balanceScroll}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Conta bradesco</Text>
          <Text style={styles.balanceValue}>R$ 2430,50</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Conta nubank</Text>
          <Text style={styles.balanceValue}>R$ 240,50</Text>
        </View>
      </ScrollView>

      <Text style={styles.sectionTitle}>Orçamento</Text>
      <View style={styles.budgetContainer}>
        {['Educação', 'Lazer', 'Educação'].map((label, index) => (
          <View key={index} style={styles.budgetCard}>
            <Text style={styles.budgetTitle}>{label}</Text>
            <Text style={styles.budgetMeta}>Meta: R$ 350,00</Text>
            <Text style={styles.budgetSpent}>Gasto: R$ 350,00</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
