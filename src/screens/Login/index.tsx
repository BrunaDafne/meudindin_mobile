import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useAuth} from '../../contexts/AuthContext';
import {styles} from './styles';
import {Eye, EyeSlash} from 'phosphor-react-native';

export default function Login() {
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [messageError, setMessageError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function entrar() {
    if (email.length === 0 || senha.length === 0) {
      setMessageError('Preencha os dados corretamente');
      return;
    }

    if (email !== "brunadafne467@gmail.com" && senha !== "1234") {
      setMessageError('Credenciais inválidas');
      return;
    }

    login();
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, width: '100%'}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
              keyboardShouldPersistTaps="handled">
              <View style={styles.containerFormLogin}>
                <Text style={styles.title}>Meu dindin</Text>
                <Text style={styles.subtitle}>
                  Bem-vindo(a), projete e gerencie suas finanças
                </Text>

                <Text style={styles.label}>Email*</Text>
                <TextInput
                  placeholder="Digite seu email"
                  placeholderTextColor="#A0AEC0"
                  style={styles.input}
                  onChangeText={(e) => setEmail(e)}
                />

                <Text style={styles.label}>Senha*</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Digite sua senha"
                    placeholderTextColor="#A0AEC0"
                    style={styles.inputPassword}
                    secureTextEntry={!showPassword}
                    onChangeText={(e) => setSenha(e)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Eye size={25} color="#101dad" />
                    ) : (
                      <EyeSlash size={25} color="#101dad" />
                    )}
                  </TouchableOpacity>
                </View>

                {messageError.length > 0 && (
                  <Text style={styles.message}>{messageError}</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={() => entrar()}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                {/* <Text style={styles.registerText}>
                  Não possui uma conta? <Text style={styles.link}>Cadastre-se</Text>
                </Text> */}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
