import { useState, type JSX } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RegisterForm, RootStackParamList } from '../types';
import { saveAccount, saveSession } from '../storage';
import { COLORS, common } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

// tamanho mínimo da senha escolhido pelo grupo (aparece no campo e na mensagem de erro)
const MIN_PASSWORD: number = 6;

const EMPTY_REGISTER: RegisterForm = { username: '', password: '', confirm: '' };

// devolve a mensagem de erro, ou '' se o formulário está certo
const validate = (form: RegisterForm): string => {
  if (form.username.trim() === '' || form.password === '' || form.confirm === '') {
    return 'Preencha usuário, senha e confirmação.';
  }
  if (form.password.length < MIN_PASSWORD) {
    return `A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`;
  }
  if (form.password !== form.confirm) {
    return 'A confirmação precisa ser igual à senha.';
  }
  return '';
};

const RegisterScreen = ({ navigation }: Props): JSX.Element => {
  const [form, setForm] = useState<RegisterForm>(EMPTY_REGISTER);
  const [error, setError] = useState<string>('');

  // transição 2: no OK do Alert, a Home vira a única tela do stack.
  // popToTop tira o Cadastro e deixa só o Login; replace troca esse Login pela Home.
  // Resultado: stack = [Home], e o voltar na Home fecha o app
  const goHome = (): void => {
    navigation.popToTop();
    navigation.replace('Home');
  };

  const register = async (): Promise<void> => {
    const message: string = validate(form);
    if (message !== '') {
      setError(message); // erro na tela, e nada é salvo
      return;
    }
    setError('');

    const username: string = form.username.trim();
    // 1. guarda a conta (e a sessão, para a Home saber quem entrou)
    await saveAccount({ username, password: form.password });
    await saveSession(username);
    // 2. avisa  3. o OK leva à Home
    Alert.alert('Conta criada', `Bem-vindo, ${username}!`, [{ text: 'OK', onPress: goHome }], {
      cancelable: false,
    });
  };

  return (
    <View style={common.centered}>
      <Text style={[common.title, { marginBottom: 20 }]}>CRIAR CONTA</Text>

      <TextInput
        style={common.input}
        placeholder="Usuário"
        placeholderTextColor={COLORS.placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        value={form.username}
        onChangeText={(text: string) => setForm((current) => ({ ...current, username: text }))}
      />
      <TextInput
        style={common.input}
        placeholder={`Senha (mínimo ${MIN_PASSWORD})`}
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry
        value={form.password}
        onChangeText={(text: string) => setForm((current) => ({ ...current, password: text }))}
      />
      <TextInput
        style={common.input}
        placeholder="Confirme a senha"
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry
        value={form.confirm}
        onChangeText={(text: string) => setForm((current) => ({ ...current, confirm: text }))}
      />

      <TouchableOpacity style={common.button} onPress={register}>
        <Text style={common.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      {error !== '' && <Text style={common.error}>{error}</Text>}
    </View>
  );
};

export default RegisterScreen;
