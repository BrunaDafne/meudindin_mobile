import React, { useState } from 'react';
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
import { useAuth } from '../../contexts/AuthContext';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Feather';

export default function Login() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, width: '100%' }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
              keyboardShouldPersistTaps="handled"
            >
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
                />

                <Text style={styles.label}>Senha*</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Digite sua senha"
                    placeholderTextColor="#A0AEC0"
                    style={styles.inputPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#050505"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={login}>
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
