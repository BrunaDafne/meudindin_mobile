import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TypeTransation} from '../../constants/transation';
import SelectDropdown from 'react-native-select-dropdown';
import {styles} from './styles';
import DropdownField from '../../components/DropdownField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Transaction } from '../../redux/slices/transactionsSlice';

interface RouteParams {
  transactionType: TypeTransation;
}

const contas = ['Conta Nubank', 'Conta Bradesco'];
const categoriasReceita = ['Salário', 'Outros'];
const categoriasDespesa = ['Alimentação', 'Saúde', 'Lazer'];

export const CreateTransaction = () => {
  const {id, receita} = useSelector((state: RootState) => state.user);
  console.log('id, receita: ', id, receita)
  const transactions = useSelector((state: RootState) => state.transaction.transactions);
  console.log('transactions: ', transactions);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const route = useRoute();
  const {transactionType} = route.params as RouteParams;

  const [titulo, setTitulo] = useState('');
  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState();
  console.log('valor: ', valor);
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [contaSelecionada, setContaSelecionada] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  console.log('categoria: ', categoriaSelecionada);
  const [messageError, setMessageError] = useState('');

  const handleSalvar = () => {
    try {
      setLoading(true);
      if (
        contaSelecionada.length <= 0 ||
        !valor ||
        categoriaSelecionada.length <= 0 ||
        titulo.length <= 0
      ) {
        setMessageError('Preencha todos os dados');
        return;
      }
      
      const novaTransacao: Transaction = {
        id: transactions?.length > 0 ? transactions.length + 1 : 1,
        id_user: 1, //id do usuário
        id_type: transactionType,
        title: titulo,
        value: valor,
        date: data,
        id_wallet: 1,
        id_category: 1,
        created_date: new Date(),
      }

      // Aqui você pode chamar a API ou salvar no contexto
      console.log('Transação salva:', novaTransacao);
      //navigation.goBack();
      setMessageError('');
    } catch {
      setMessageError('Ocorreu um erro em criar a transação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Adicionar {transactionType === 0 ? 'despesa' : 'receita'}
      </Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        placeholder="Digite apenas números"
        value={valor}
        onChangeText={value => setValor(Number(value))}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.inputDate}>
        <Text>{data.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || data;
            setShowDatePicker(Platform.OS === 'ios');
            setData(currentDate);
          }}
        />
      )}

      <DropdownField
        label="Conta"    
        data={contas}
        value={contaSelecionada}
        onSelect={setContaSelecionada}
      />

      <DropdownField
        label="Categoria"
        data={categoriasDespesa}
        value={categoriaSelecionada}
        onSelect={setCategoriaSelecionada}
      />

      {messageError.length > 0 && (
        <Text style={styles.message}>{messageError}</Text>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
