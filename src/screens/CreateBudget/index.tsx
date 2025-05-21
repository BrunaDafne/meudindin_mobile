import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import DropdownField from '../../components/DropdownField';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {categories} from '../../constants/categories';
import Toast from 'react-native-toast-message';
import { Budget, addBudget } from '../../redux/slices/budgetSlice';

export const CreateBudget = () => {
  const {id} = useSelector((state: RootState) => state.user);
  const budgets = useSelector((state: RootState) => state.budgets.budgets);
  const [selectCategorias, setSelectCategorias] = useState<{ id: number; name: string; }[]>();
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [valor, setValor] = useState();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<{
    id: number,
    title: string,
  } | undefined>({
    id: 0,
    title: '',
  });
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    const idsCadastrados = budgets.map(({id_category}) => {return id_category});

    const filtrados = categories.filter(({id}) => {
      if (!idsCadastrados.includes(id)) {
        return true;
      }
    });

    setSelectCategorias(filtrados);
  }, []);

  const handleSalvar = () => {
    try {
      setLoading(true);

      if (!valor || !categoriaSelecionada || categoriaSelecionada.id <= 0) {
        setMessageError('Preencha todos os dados');
        return;
      }

      if (!id) {
        setMessageError('Não foi possível inserir dados nesse usuário');
        return;
      }

      const novoOrçamento: Budget = {
        id: budgets?.length > 0 ? budgets.length + 1 : 1,
        id_user: id,
        limit: valor,
        id_category: categoriaSelecionada.id,
        created_date: new Date(),
      }

      dispatch(addBudget(novoOrçamento))

      // Limpar o select
      const categorias = selectCategorias?.filter(({id}) => id !== categoriaSelecionada.id);
      setSelectCategorias(categorias);

      setValor(undefined);
      setCategoriaSelecionada(undefined);

      Toast.show({
        type: 'success',
        text1: 'Orçamento salvo com sucesso!',
      });
      navigation.goBack()
    } catch {
      setMessageError('Ocorreu um erro em criar a transação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar orçamento</Text>
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
