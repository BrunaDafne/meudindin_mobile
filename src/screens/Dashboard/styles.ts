import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
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

  welcomeText: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 700,
    color: '#111827',
  },

  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },

  card: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  incomeCard: {
    backgroundColor: '#22C55E',
  },

  expenseCardColor: {
    backgroundColor: '#EF4444',
  },

  cardTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cardValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  cardButtonReceita: {
    backgroundColor: '#C8FF99',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },


  cardButtonTextReceita: {
    color: '#009C4A',
    fontWeight: '600',
  },

  cardButton: {
    backgroundColor: '#FFE3E3',
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },

  cardButtonText: {
    color: '#FF2424',
    fontWeight: '600',
  },

  sectionContainer: {
    backgroundColor: '#DBF0FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  expenseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  expenseTitle: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1F2937',
  },

  expenseSub: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },

  expenseAmount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1F2937',
    position: 'absolute',
    right: 15,
    top: 15,
  },

  dropdownIcon: {
    alignSelf: 'center',
    marginTop: 8,
  },

  graphCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  graphText: {
    fontSize: 14,
    color: '#1F2937',
    textAlign: 'center',
  },

  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  balanceActions: {
    flexDirection: 'row',
    gap: 8,
  },

  iconButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 8,
  },

  balanceScroll: {
    marginBottom: 16,
  },

  balanceCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 180,
  },

  balanceTitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },

  balanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  budgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
    width: '100%',
    backgroundColor: 'yellow'
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
