import { useState, type JSX } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Account, RootStackParamList } from '../types';
import { getAccount, saveSession } from '../storage';
import { COLORS, common } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props): JSX.Element => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const enter = async (): Promise<void> => {
    const user: string = username.trim();
    if (user === '' || password === '') {
      setError('Preencha usuário e senha.');
      return;
    }

    // confere contra a conta guardada no AsyncStorage, nunca contra um valor fixo
    const account: Account | null = await getAccount();
    if (account === null) {
      setError('Nenhuma conta cadastrada. Cadastre-se primeiro.');
      return;
    }
    if (account.username !== user || account.password !== password) {
      setError('Usuário ou senha incorretos.');
      return;
    }

    // entrou: guarda a sessão e troca o Login pela Home (transição 3)
    await saveSession(account.username);
    setError('');
    navigation.replace('Home');
  };

  // transição 1: o Cadastro abre por cima do Login
  const goRegister = (): void => {
    setError('');
    navigation.navigate('Register');
  };

  return (
    <View style={common.centered}>
      <Text style={common.title}>CATÁLOGO DE MÚSICAS</Text>
      <Text style={common.subtitle}>entre para ouvir</Text>

      <TextInput
        style={common.input}
        placeholder="Usuário"
        placeholderTextColor={COLORS.placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={common.input}
        placeholder="Senha"
        placeholderTextColor={COLORS.placeholder}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={common.button} onPress={enter}>
        <Text style={common.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      {error !== '' && <Text style={common.error}>{error}</Text>}

      <TouchableOpacity onPress={goRegister}>
        <Text style={common.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
