import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
  },
  dropdownButton: {
    backgroundColor: '#F4F7FC',
    borderRadius: 8,
    padding: 12,
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
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
