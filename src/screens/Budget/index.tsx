import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import { Dimensions } from 'react-native';
import {PieChart, BarChart} from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {OrcamentoCard} from '../Dashboard';
import {TypeTransation} from '../../constants/transation';
import {Categories} from '../../constants/categories';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {removeBudget, updateBudget} from '../../redux/slices/budgetSlice';
import Toast from 'react-native-toast-message';
import {CalendarDots, Plus} from 'phosphor-react-native';
import {Transaction} from '../../redux/slices/transactionsSlice';
import {isSameMonth} from 'date-fns';
import {groupBy, map, orderBy} from 'lodash';
import {colorsGraph} from '../../constants/colorsGraph';

const Budget = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mostrarOrcamentos, setMostrarOrcamentos] = useState<OrcamentoCard[]>();
  const navigation = useNavigation();
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const [categoriasGastas, setCategoriasGastas] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [newMeta, setNewMeta] = useState('');
  const budgets = useSelector((state: RootState) => state.budgets.budgets);
  const screenWidth = Dimensions.get('window').width;

  const pieData = useMemo(() => {
    let total = 0;
    let gasto = 0;

    mostrarOrcamentos?.forEach(({limit, value}) => {
      total = total + limit;
      gasto = gasto + value;
    });

    return [
      {value: gasto, color: '#25A969'},
      {value: total, color: '#defbff'},
    ];
  }, [mostrarOrcamentos]);

  const onChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowPicker(Platform.OS === 'ios');
    setSelectedDate(currentDate);
  };
  const dispatch = useDispatch();

  const formatDate = date => {
    return date.toLocaleDateString('pt-BR', {month: 'long', year: 'numeric'});
  };

  // Função para obter as 3 categorias mais gastas do mês
  function getTopCategories(
    transactions: Transaction[],
  ): {label: string; value: number; frontColor: string}[] {
    // Pegar o início e fim do mês atual
    const now = new Date();

    // Filtrar transações que pertencem ao mês atual
    const thisMonthTransactions = transactions.filter(
      transaction =>
        isSameMonth(transaction.date, now) &&
        transaction.id_type === TypeTransation['Despesa'],
    );

    // Agrupar as transações pelo campo `id_category`
    const groupedByCategory = groupBy(thisMonthTransactions, 'id_category');

    // Somar os valores de cada categoria
    const categoryTotals = map(
      groupedByCategory,
      (transactions, id_category) => {
        const total = transactions.reduce(
          (sum, transaction) => sum + transaction.value,
          0,
        );
        return {
          label: Categories[parseInt(id_category)], // Pegar o nome da categoria do enum
          value: total,
        };
      },
    ).slice(0, 5);

    const categoriesWithColors = categoryTotals.map((category, index) => {
      const label = String(index);
      return {
        ...category,
        frontColor: colorsGraph[label] ? colorsGraph[label] : '#101dad',
      };
    });

    // Ordenar as categorias por porcentagem e pegar as 3 primeiras
    return orderBy(categoriesWithColors, ['value'], ['desc']);
  }

  useEffect(() => {
    const categories = getTopCategories(transactions);
    setCategoriasGastas(categories);

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

      <View style={styles.containerCalendar}>
        <Text style={styles.titleMonth}>{formatDate(selectedDate)}</Text>
        <CalendarDots size={32} color="#000" />
      </View>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <View style={styles.chartContainer}>
        <View style={styles.chartContainerTitle}>
          <Text style={styles.sectionTitle}>Geral</Text>
          <View style={styles.flag}>
            <Text style={styles.flagLabel}>Mês atual</Text>
          </View>
        </View>
        <PieChart data={pieData} radius={100} />
        <View style={styles.chartContainerLegenda}>
          <View style={styles.containerLegenda}>
            <Text style={styles.legendaTitle}>Total: </Text>
            <Text>{pieData[1].value}</Text>
          </View>
          <View style={styles.containerLegenda}>
            <Text style={styles.legendaTitle}>Gastos: </Text>
            <Text>{pieData[0].value}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chartContainerTitle}>
          <Text style={styles.sectionTitle}>Categorias mais gastas</Text>
          <View style={styles.flag}>
            <Text style={styles.flagLabel}>Mês atual</Text>
          </View>
        </View>
        <BarChart
          data={categoriasGastas}
          height={300}
          width={screenWidth - 100} 
          barWidth={80}
        />
      </View>

      <View style={styles.containerLine}>
        <Text style={styles.sectionTitle}>Orçamento</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('CreateBudget')}>
          <Plus size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.balanceScroll}>
        {mostrarOrcamentos?.map((orcamento) => (
          <TouchableOpacity
            key={`${orcamento.created_date}`}
            style={styles.budgetCard}
            onPress={() => {
              setSelectedBudget(orcamento);
              setNewMeta(orcamento.limit.toString());
              setModalVisible(true);
            }}>
            <PieChart
              data={[
                {value: orcamento.value, color: '#25A969'},
                {value: orcamento.limit - orcamento.value, color: '#fff'},
              ]}
              radius={55}
            />
            <Text style={styles.budgetTitle}>{orcamento.name_category}</Text>
            <Text style={styles.budgetMeta}>Meta: R$ {orcamento.limit}</Text>
            <Text style={styles.budgetSpent}>Gasto: R$ {orcamento.value}</Text>
          </TouchableOpacity>
        ))}

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Orçamento</Text>

              <Text style={styles.labelEdit}>
                Meta atual: R$ {selectedBudget?.limit}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nova meta"
                keyboardType="numeric"
                value={newMeta}
                onChangeText={setNewMeta}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#25A969'}]}
                  onPress={() => {
                    if (!newMeta) return;
                    if (!selectedBudget) return;
                    dispatch(
                      updateBudget({
                        id: selectedBudget?.id,
                        newLimit: parseFloat(newMeta),
                      }),
                    );
                    setModalVisible(false);
                  }}>
                  <Text style={styles.buttonText}>Adicionar nova meta</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, {backgroundColor: '#E74C3C'}]}
                  onPress={() => {
                    Alert.alert(
                      'Excluir orçamento',
                      'Tem certeza que deseja excluir?',
                      [
                        {text: 'Cancelar', style: 'cancel'},
                        {
                          text: 'Excluir',
                          style: 'destructive',
                          onPress: () => {
                            if (selectedBudget?.id) {
                              dispatch(removeBudget(selectedBudget?.id));
                              setModalVisible(false);
                            } else {
                              setModalVisible(false);
                              Toast.show({
                                type: 'error',
                                text1:
                                  'Ocorreu um erro em excluir um orçamento',
                              });
                            }
                          },
                        },
                      ],
                    );
                  }}>
                  <Text style={styles.buttonText}>Excluir orçamento</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonCloseText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </ScrollView>
  );
};

export default Budget;
