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
  titleMonth: {
    fontSize: 18,
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
  containerCalendar: {
    backgroundColor: '#C9F0FF',
    borderRadius: 15,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartContainerTitle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  chartContainerLegenda: {
    flexDirection: 'row',
    width: '95%',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#C9F0FF',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  legendaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  containerLegenda: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flag: {
    width: '40%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5288ff',
    borderRadius: 30,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  flagLabel: {
    color: '#fff',
    fontWeight: '500',
  },
  chartTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  balanceScroll: {
    marginBottom: 16,
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
    width: 160,
    marginRight: 20,
    padding: 15,
    marginTop: 5,
    alignItems: 'center',
  },
  budgetTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
    marginTop: 10,
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
