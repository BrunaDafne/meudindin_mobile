import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TypeTransation} from '../../constants/transation';
import {styles} from './styles';
import DropdownField from '../../components/DropdownField';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {categories} from '../../constants/categories';
import {
  Transaction,
  addTransaction,
} from '../../redux/slices/transactionsSlice';
import {Wallet} from '../../redux/slices/walletSlice';
import Toast from 'react-native-toast-message';

interface RouteParams {
  transactionType: TypeTransation;
}

export const CreateBudget = () => {
  const {id} = useSelector((state: RootState) => state.user);
  const transactions = useSelector(
    (state: RootState) => state.transaction.transactions,
  );
  const wallets = useSelector((state: RootState) => state.wallets.wallets);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [titulo, setTitulo] = useState('');
  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState();
  const [data, setData] = useState(new Date());
  const [contaSelecionada, setContaSelecionada] = useState<Wallet>();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState({
    id: 0,
    title: '',
  });
  const [messageError, setMessageError] = useState('');

  const handleSalvar = () => {
    try {
      setLoading(true);
      if (
        !contaSelecionada ||
        !valor ||
        categoriaSelecionada.id <= 0 ||
        titulo.length <= 0
      ) {
        setMessageError('Preencha todos os dados');
        return;
      }

      if (!id) {
        setMessageError('Não foi possível inserir dados nesse usuário');
        return;
      }

      const novaTransacao: Transaction = {
        id: transactions?.length > 0 ? transactions.length + 1 : 1,
        id_user: id,
        //id_type: transactionType,
        title: titulo,
        value: valor,
        date: data,
        id_wallet: contaSelecionada.id,
        id_category: categoriaSelecionada.id,
        created_date: new Date(),
      };

      // Adicionar transação
      dispatch(addTransaction(novaTransacao));

      const carteira = wallets.find(({id}) => id === contaSelecionada.id);

      if (!carteira) {
        return;
      }

      // const value = carteira.value
      //   ? transactionType === TypeTransation.Receita
      //     ? carteira.value + valor
      //     : carteira.value - valor
      //   : valor;

      // dispatch(updateWallet({id: carteira?.id, value}))

      // const valoresAtualizar = {
      //   [transactionType === TypeTransation.Receita ? 'receita' : 'despesa']:
      //     transactionType === TypeTransation.Receita
      //       ? receita + valor
      //       : despesa + valor,
      // };
      // dispatch(setValues(valoresAtualizar));

      setTitulo('');
      setValor(undefined);
      setData(new Date());
      setContaSelecionada(undefined);
      setCategoriaSelecionada({
        id: 0,
        title: '',
      });
      setMessageError('');
      Toast.show({
        type: 'success',
        text1: 'Transação salva com sucesso!',
      });
      navigation.goBack();
    } catch {
      setMessageError('Ocorreu um erro em criar a transação');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const user: UserState = {
  //     id: 1,
  //     name: 'Bruna Dafne',
  //     email: 'brunadafne467@gmail.com',
  //     password: '1234',
  //     receita: 5000,
  //     despesa: 0,
  //     created_at: new Date(),
  //   };
  //   console.log('user: ', user);
  //   //dispatch(setUser(user));
  //   const contas = {
  //     receita: 5000,
  //     despesa: 0,
  //   }
  //   //dispatch(setValues(contas));

  //   const novaCarteira: Wallet = {
  //     id: wallets?.length > 0 ? wallets.length + 1 : 1,
  //     id_user: id ? id : 1,
  //     title: 'conta nubank',
  //     value: 5000,
  //     id_banking_institution: 2,
  //     created_at: new Date(),
  //   }
  //   //dispatch(addWallet(novaCarteira))
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Adicionar orçamento
      </Text>
      <DropdownField
        label="Categoria"
        data={categories}
        value={categoriaSelecionada}
        onSelect={setCategoriaSelecionada}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        placeholder="Digite apenas números"
        value={valor ? valor : undefined}
        onChangeText={value => setValor(Number(value))}
        keyboardType="numeric"
        style={styles.input}
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
