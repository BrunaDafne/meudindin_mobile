import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TypeTransation} from '../../constants/transation';
import SelectDropdown from 'react-native-select-dropdown';
import {styles} from './styles';
import DropdownField from '../../components/DropdownField';

interface RouteParams {
  transactionType: TypeTransation;
}

const contas = ['Conta Nubank', 'Conta Bradesco'];
const categoriasReceita = ['Salário', 'Outros'];
const categoriasDespesa = ['Alimentação', 'Saúde', 'Lazer'];

export const CreateTransaction = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {transactionType} = route.params as RouteParams;

  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState();
  console.log('valor: ', valor);
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [contaSelecionada, setContaSelecionada] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleSalvar = () => {
    try {
      if (
        contaSelecionada.length <= 0 ||
        !valor ||
        contaSelecionada.length <= 0 ||
        titulo.length <= 0
      ) {
        setMessageError('Preencha todos os dados');
        return;
      }
      // const novaTransacao: Transaction = {
      //   //id: transactions?.length > 0 ? transactions.length + 1 : 1,
      //   id_user: id,
      //   id_type: TypeTransactions.Despesa,
      //   title: titulo,
      //   value: valor,
      //   date: data,
      //   id_wallet: conta,
      //   id_category: categoria,
      //   created_date: new Date(),
      // }

      const transacao = {
        titulo,
        valor: valor,
        data,
        conta: contaSelecionada,
        categoria: categoriaSelecionada,
        tipo: transactionType,
      };
      // Aqui você pode chamar a API ou salvar no contexto
      console.log('Transação salva:', transacao);
      //navigation.goBack();
    } catch {
      setMessageError('Ocorreu um erro em criar a transação')
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Adicionar {transactionType === 0 ? 'despesa' : 'receita'}
      </Text>

      <Text style={styles.title}>Título</Text>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <Text style={styles.title}>Valor</Text>
      <TextInput
        placeholder="Digite apenas números"
        value={valor}
        onChangeText={value => setValor(Number(value))}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.title}>Data</Text>
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

      <Text style={styles.title}>Conta</Text>
      <DropdownField
        label="Conta"
        data={contas}
        value={contaSelecionada}
        onSelect={setContaSelecionada}
      />

      <Text style={styles.title}>Categoria</Text>
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
