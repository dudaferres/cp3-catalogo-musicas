import { useEffect, useState, type JSX } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { clearSession, getSession } from '../storage';
import { MUSICS } from '../data/musics';
import { common } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props): JSX.Element => {
  const [username, setUsername] = useState<string>('');

  // lê quem está logado uma vez, quando a Home aparece
  useEffect(() => {
    const load = async (): Promise<void> => {
      const session: string | null = await getSession();
      setUsername(session ?? '');
    };
    load();
  }, []);

  // transição 4: a Lista abre por cima da Home
  const openList = (): void => {
    navigation.navigate('List');
  };

  // transição 9: apaga a sessão e troca a Home pelo Login
  const logout = async (): Promise<void> => {
    await clearSession();
    navigation.replace('Login');
  };

  return (
    <View style={common.centered}>
      <Text style={common.title}>OLÁ, {username.toUpperCase()}</Text>
      <Text style={common.subtitle}>{MUSICS.length} músicas esperando por você</Text>

      <TouchableOpacity style={common.button} onPress={openList}>
        <Text style={common.buttonText}>VER MÚSICAS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={common.outlineButton} onPress={logout}>
        <Text style={common.outlineButtonText}>SAIR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
