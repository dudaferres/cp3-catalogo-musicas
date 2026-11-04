import { type JSX } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Music, RootStackParamList } from '../types';
import { formatDuration, nextMusic } from '../data/musics';
import { COLORS, common } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route, navigation }: Props): JSX.Element => {
  // a música chega pelo parâmetro da rota, já com o tipo certo
  const music: Music = route.params.music;

  // só para conferir as escolhas de navegação: quantas telas há no stack agora
  const stackSize: number = navigation.getState().routes.length;

  // transição 6: mais um Detalhe por cima, com a próxima música
  const goNext = (): void => {
    navigation.push('Detail', { music: nextMusic(music) });
  };

  // transição 7: tira esta tela e mostra a de baixo
  const goBack = (): void => {
    navigation.goBack();
  };

  // transição 8: volta à primeira tela do stack (a Home), desmontando o resto
  const goHome = (): void => {
    navigation.popToTop();
  };

  return (
    <View style={common.centered}>
      <Text style={styles.genre}>{music.genre}</Text>
      <Text style={styles.title}>{music.title}</Text>
      <Text style={styles.info}>
        {music.artist} · {music.year}
      </Text>
      <Text style={styles.info}>duração {formatDuration(music.durationSec)}</Text>
      <Text style={styles.stack}>telas no stack: {stackSize}</Text>

      <TouchableOpacity style={common.button} onPress={goNext}>
        <Text style={common.buttonText}>PRÓXIMA MÚSICA</Text>
      </TouchableOpacity>
      <TouchableOpacity style={common.outlineButton} onPress={goBack}>
        <Text style={common.outlineButtonText}>VOLTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={common.outlineButton} onPress={goHome}>
        <Text style={common.outlineButtonText}>INÍCIO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  genre: { color: COLORS.muted, fontSize: 10, letterSpacing: 3, marginBottom: 6 },
  title: { color: COLORS.primary, fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  info: { color: COLORS.text, fontSize: 13, marginTop: 3 },
  stack: { color: COLORS.muted, fontSize: 10, marginTop: 10, marginBottom: 4 },
});
