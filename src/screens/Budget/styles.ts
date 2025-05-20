import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  containerLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 8,
    width: '15%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartContainer: {
    marginTop: 16,
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  budgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  budgetCard: {
    backgroundColor: '#E5F0FF',
    borderRadius: 12,
    padding: 12,
    width: '30%',
    alignItems: 'center',
  },
  budgetTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
  },
  budgetMeta: {
    fontSize: 12,
    color: '#374151',
  },
  budgetSpent: {
    fontSize: 12,
    color: '#374151',
  },
});
