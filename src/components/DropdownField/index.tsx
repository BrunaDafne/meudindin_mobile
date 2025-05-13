import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const DropdownField = ({ label, data, value, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <SelectDropdown
        data={data}
        onSelect={(selectedItem) => onSelect(selectedItem)}
        renderButton={(selectedItem, isOpened) => (
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsOpen(!isOpened)}
          >
            <Text style={styles.dropdownButtonText}>
              {selectedItem || `Selecione uma opção`}
            </Text>
          </TouchableOpacity>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={[styles.dropdownItem, isSelected && styles.selectedItem]}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 14,
  },
  dropdownButton: {
    backgroundColor: '#F4F7FC',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownItem: {
    padding: 12,
  },
  selectedItem: {
    backgroundColor: '#E0E0E0',
  },
});

export default DropdownField;
