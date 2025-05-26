import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import DropdownField from '../../components/DropdownField';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Wallet, addWallet} from '../../redux/slices/walletSlice';
import {setValues} from '../../redux/slices/userSlice';
import Toast from 'react-native-toast-message';
import {bankingInstitutions} from '../../constants/bankingInstitutions';

export const CreateBalance = () => {
  const {id, receita} = useSelector((state: RootState) => state.user);
  const wallets = useSelector((state: RootState) => state.wallets.wallets);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [titulo, setTitulo] = useState('');
  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState();
  const [bancoSelecionada, setBancoSelecionada] = useState({
    id: 0,
    title: '',
  });
  const [messageError, setMessageError] = useState('');

  const handleSalvar = () => {
    try {
      setLoading(true);

      if (!valor || bancoSelecionada.id <= 0 || titulo.length <= 0) {
        setMessageError('Preencha todos os dados');
        return;
      }

      if (valor <= 0) {
        setMessageError('Preencha os dados corretamente');
        return;
      }

      if (!id) {
        setMessageError('Não foi possível inserir dados nesse usuário');
        return;
      }

      const novaCarteira: Wallet = {
        id: wallets?.length > 0 ? wallets.length + 1 : 1,
        id_user: id,
        title: titulo,
        value: valor,
        id_banking_institution: bancoSelecionada.id,
        created_at: new Date(),
      };

      // Adicionar transação
      dispatch(addWallet(novaCarteira));

      const valoresAtualizar = {
        receita:
          receita !== null && receita !== undefined ? receita + valor : valor,
      };
      dispatch(setValues(valoresAtualizar));

      setTitulo('');
      setValor(undefined);
      setBancoSelecionada({
        id: 0,
        title: '',
      });

      setMessageError('');
      Toast.show({
        type: 'success',
        text1: 'Conta salva com sucesso!',
      });
      navigation.goBack();
    } catch {
      setMessageError('Ocorreu um erro em criar uma conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Carteira</Text>
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
        value={valor ? valor : undefined}
        onChangeText={value => setValor(Number(value))}
        keyboardType="numeric"
        style={styles.input}
      />

      <DropdownField
        label="Banco"
        data={bankingInstitutions}
        value={bancoSelecionada}
        onSelect={setBancoSelecionada}
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
