import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.lightBlue,
  },
  containerForm: {
    backgroundColor: colors.backgroundWhite,
    width: '100%',
    height: '55%',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  containerFormLogin: {
    width: '85%',
    height: '95%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
    fontWeight: 700,
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#787878',
    fontWeight: 700,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1E1E1E',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 16,
    color: '#1E1E1E',
    fontFamily: 'Inter-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 10,
    color: '#1E1E1E',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  registerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  link: {
    color: '#2563EB',
    fontFamily: 'Inter-Medium',
  },
  message: {
    fontSize: 18,
    color: colors.red,
    fontWeight: '600'
  },
});
