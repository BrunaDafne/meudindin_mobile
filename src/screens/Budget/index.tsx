import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import {PieChart, BarChart} from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {OrcamentoCard} from '../Dashboard';
import {TypeTransation} from '../../constants/transation';
import {Categories} from '../../constants/categories';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const Budget = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mostrarOrcamentos, setMostrarOrcamentos] = useState<OrcamentoCard[]>();
  const navigation = useNavigation();
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const budgets = useSelector((state: RootState) => state.budgets.budgets);

  // Dados fictícios para os gráficos
  const pieData = [
    {value: 50, color: '#25A969', text: 'Alimentação'},
    {value: 30, color: '#E74C3C', text: 'Transporte'},
    {value: 20, color: '#FBBF24', text: 'Lazer'},
  ];

  const barData = [
    {value: 200, label: 'Jan', frontColor: '#25A969'},
    {value: 150, label: 'Fev', frontColor: '#E74C3C'},
    {value: 100, label: 'Mar', frontColor: '#FBBF24'},
  ];

  const onChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowPicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };

  const formatDate = date => {
    return date.toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'});
  };

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
        <Text style={styles.headerTitle}>Orçamento</Text>
      </View>

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.subtitle}>{formatDate(selectedDate)}</Text>
        <Icon name="calendar" size={24} color="#000" />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Geral</Text>
        <PieChart data={pieData} />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Orçamentos mais excedidos</Text>
        <BarChart data={barData} />
      </View>

      <View style={styles.containerLine}>
        <Text style={styles.sectionTitle}>Orçamento</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('CreateBudget')}>
          <Text>t</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text>t</Text>
        </TouchableOpacity>
      </View>

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
};

export default Budget;
