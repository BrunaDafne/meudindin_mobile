import React, {useState} from 'react';
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

const Budget = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

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

      <View style={styles.budgetContainer}>
        {['Educação', 'Lazer', 'Educação', 'Compras'].map((label, index) => (
          <View key={index} style={styles.budgetCard}>
            <Text style={styles.budgetTitle}>{label}</Text>
            <Text style={styles.budgetMeta}>Meta: R$ 350,00</Text>
            <Text style={styles.budgetSpent}>Gasto: R$ 350,00</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Budget;
