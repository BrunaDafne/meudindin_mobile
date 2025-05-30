import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {format, isSameMonth, parseISO} from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import {Transaction} from '../../redux/slices/transactionsSlice';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {months} from '../../constants/months';
import {orderBy} from 'lodash';
import { Categories } from '../../constants/categories';

interface Props {
  transactions: Transaction[];
}

const TransactionScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedType, setSelectedType] = useState<
    'Todos' | 'Despesa' | 'Receita'
  >('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const navigation = useNavigation();

  const monthLabel = format(selectedDate, 'MM');
  const yearLabel = format(selectedDate, 'yyyy');

  const filteredTransactions = useMemo(() => {
    return transactions?.filter(tx => {
      const sameMonth = isSameMonth(new Date(tx.date), selectedDate);
      const matchSearch =
        tx.title.toLowerCase().includes(search.toLowerCase()) ||
        tx.description?.toLowerCase().includes(search.toLowerCase());
      const matchType =
        selectedType === 'Todos' ||
        (selectedType === 'Despesa' && tx.id_type === 0) ||
        (selectedType === 'Receita' && tx.id_type === 1);
      const matchCategory = selectedCategory
        ? String(tx.id_category) === selectedCategory
        : true;

      return sameMonth && matchSearch && matchType && matchCategory;
    });
  }, [transactions, selectedDate, search, selectedType, selectedCategory]);

  const renderItem = ({item}: {item: Transaction}) => (
    <View
      style={[
        styles.card,
        {borderLeftColor: item.id_type === 1 ? '#25A969' : '#E74C3C'},
      ]}>
      <View>
        <Text style={styles.title}>
          {format(new Date(item.date), 'dd/MM/yy')} - {item.title}
        </Text>
        <Text style={styles.meta}>Categoria: {Categories[item.id_category]}</Text>
        <Text style={styles.meta}>Valor: R$ {item.value.toFixed(2)}</Text>
      </View>
      <View
        style={[
          styles.badge,
          {backgroundColor: item.id_type === 1 ? '#25A969' : '#E74C3C'},
        ]}>
        <Text style={styles.badgeText}>
          {item.id_type === 1 ? 'Receita' : 'Despesa'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transações</Text>
      </View>

      <View style={styles.filterBox}>
        <Text style={styles.subtitleTitle}>Mês</Text>
        <TouchableOpacity
          style={styles.monthSelector}
          onPress={() => setShowDatePicker(true)}>
          <Text>
            {months[monthLabel] ? months[monthLabel] : ''} {yearLabel}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}
        <Text style={{...styles.subtitleTitle, marginBottom: 10}}>
          Descrição
        </Text>
        <TextInput
          placeholder="Pesquisar por título ou descrição"
          placeholderTextColor={'#bfbfbf'}
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />

        {/* <SelectDropdown
          data={["Todos", "Despesa", "Receita"]}
          onSelect={(selected) => setSelectedType(selected as any)}
          defaultButtonText="Tipo"
          buttonTextAfterSelection={(item) => item}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdown}
        /> */}

        {/* <SelectDropdown
          data={["1", "2", "3"]}
          onSelect={(selected) => setSelectedCategory(selected)}
          //defaultButtonText="Categoria"
          buttonTextAfterSelection={(item) => item}
          rowTextForSelection={(item) => item}
          buttonStyle={styles.dropdown}
        /> */}
      </View>

      <FlatList
        data={orderBy(filteredTransactions, 'date', 'desc')}
        keyExtractor={item => item.created_date.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

export default TransactionScreen;
