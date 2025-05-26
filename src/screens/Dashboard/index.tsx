import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useAuth} from '../../contexts/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Categories} from '../../constants/categories';
import {TypeTransation} from '../../constants/transation';
import {Budget} from '../../redux/slices/budgetSlice';
import {PieChart} from 'react-native-gifted-charts';
import {Plus} from 'phosphor-react-native';

type DrawerParamList = {
  Dashboard: undefined;
  Orçamento: undefined;
  Contas: undefined;
};

export interface OrcamentoCard extends Budget {
  value: number;
  name_category: string;
}

export default function Dashboard() {
  const {logout} = useAuth();
  const {receita, despesa} = useSelector((state: RootState) => state.user);
  const wallets = useSelector((state: RootState) => state.wallets.wallets);
  const budgets = useSelector((state: RootState) => state.budgets.budgets);
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );

  const navigation = useNavigation();
  const [mostrarOrcamentos, setMostrarOrcamentos] = useState<OrcamentoCard[]>();

  useEffect(() => {
    const categorySums = transactions.reduce((acc, transaction) => {
      if (transaction.id_type === TypeTransation.Despesa) {
        acc[transaction.id_category] =
          (acc[transaction.id_category] || 0) + transaction.value;
      }
      return acc;
    }, {} as Record<number, number>);

    const orcamentosFormatados: OrcamentoCard[] = budgets.map(budget => ({
      ...budget,
      value: categorySums[budget.id_category] || 0, // Adiciona 0 caso não tenha transações
      name_category: Categories[budget.id_category],
    }));
    setMostrarOrcamentos(orcamentosFormatados);
  }, [budgets, transactions]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      <Button title="Sair" onPress={logout} />

      <Text style={styles.welcomeText}>Bem vindo(a), Bruna Dafne</Text>

      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.incomeCard]}>
          <Text style={styles.cardTitle}>Receita mensal</Text>
          <Text style={styles.cardValue}>R$ {receita}</Text>
          <TouchableOpacity
            style={[styles.cardButtonReceita]}
            onPress={() =>
              navigation.navigate('CreateTransaction', {transactionType: 1})
            }>
            <Text style={styles.cardButtonTextReceita}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.expenseCardColor]}>
          <Text style={styles.cardTitle}>Despesa mensal</Text>
          <Text style={styles.cardValue}>R$ {despesa}</Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() =>
              navigation.navigate('CreateTransaction', {transactionType: 0})
            }>
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

        <Icon
          name="chevron-down"
          size={24}
          color="#000"
          style={styles.dropdownIcon}
        />
      </View>

      <View style={styles.graphCard}>
        <Text style={styles.graphText}>
          GRÁFICO DE COLUNAS COM TOP 3 - 5 CATEGORIAS MAIS GASTAS COM
          PORCENTAGEM
        </Text>
      </View>

      <View style={styles.balanceHeader}>
        <Text style={styles.sectionTitle}>Saldos</Text>
        <View style={styles.balanceActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('CreateBalance')}>
            <Plus size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.balanceScroll}>
        {wallets?.map(({title, value, id}) => {
          return (
            <View key={id} style={styles.balanceCard}>
              <Text style={styles.balanceTitle}>{title}</Text>
              <Text style={styles.balanceValue}>R$ {value}</Text>
            </View>
          );
        })}
      </ScrollView>

      <Text style={styles.sectionTitle}>Orçamento</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.balanceScroll}>
        {mostrarOrcamentos?.map((orcamento, index) => (
          <View key={index} style={styles.budgetCard}>
            <PieChart
              data={[
                {value: orcamento.value, color: '#25A969', text: 'Alimentação'},
                {value: orcamento.limit, color: '#fff', text: 'Transporte'},
              ]}
              radius={55}
            />
            <Text style={styles.budgetTitle}>{orcamento.name_category}</Text>
            <Text style={styles.budgetMeta}>Meta: R$ {orcamento.limit}</Text>
            <Text style={styles.budgetSpent}>Gasto: R$ {orcamento.value}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
