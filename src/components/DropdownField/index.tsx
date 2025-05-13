import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {styles} from './styles';

const DropdownField = ({label, data, value, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <SelectDropdown
        data={data}
        onSelect={selectedItem => onSelect(selectedItem)}
        renderButton={(selectedItem, isOpened) => (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setIsOpen(!isOpened)}>
            <Text style={styles.dropdownButtonText}>
              {selectedItem || `Selecione uma opção`}
            </Text>
          </TouchableOpacity>
        )}
        renderItem={(item, index, isSelected) => (
          <View
            style={[styles.dropdownItem, isSelected && styles.selectedItem]}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DropdownField;
