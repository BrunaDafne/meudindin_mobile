import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FBFD',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  filterBox: {
    backgroundColor: '#DDF2FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    gap: 8,
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  dropdown: {
    borderRadius: 8,
    width: '100%',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#E3F7FF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 6,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#333',
  },
  badge: {
    height: 24,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
});
