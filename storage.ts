import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account } from './types';

// as duas chaves que o app usa no AsyncStorage
const ACCOUNT_KEY: string = 'account'; // a conta cadastrada: { username, password } em JSON
const SESSION_KEY: string = 'session'; // quem está logado agora: só o nome do usuário

// guarda a conta (objeto vira texto com JSON.stringify)
export const saveAccount = async (account: Account): Promise<void> => {
  await AsyncStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
};

// lê a conta; devolve null se ninguém se cadastrou ainda
export const getAccount = async (): Promise<Account | null> => {
  const text: string | null = await AsyncStorage.getItem(ACCOUNT_KEY);
  if (text === null) {
    return null;
  }
  return JSON.parse(text) as Account;
};

// guarda quem entrou
export const saveSession = async (username: string): Promise<void> => {
  await AsyncStorage.setItem(SESSION_KEY, username);
};

// lê quem está logado; null se não há sessão
export const getSession = async (): Promise<string | null> => {
  return AsyncStorage.getItem(SESSION_KEY);
};

// SAIR: apaga só a sessão. A conta continua guardada para o próximo login
export const clearSession = async (): Promise<void> => {
  await AsyncStorage.removeItem(SESSION_KEY);
};
