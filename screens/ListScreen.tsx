import { type JSX } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ListRenderItemInfo } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Music, RootStackParamList } from '../types';
import { MUSICS, formatDuration } from '../data/musics';
import { COLORS } from '../theme';

// A tela Lista, convertida: no kit era um ScrollView com map, que monta as 100 mil de uma vez
// e trava. A FlatList recebe o array (data) e a receita (renderItem) e só monta as linhas
// que estão perto da tela; ao rolar, ela monta as próximas.
const ListScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // transição 5: o Detalhe abre por cima da Lista, levando a música tocada
  const open = (music: Music): void => {
    navigation.navigate('Detail', { music });
  };

  // como desenhar UMA linha. a FlatList chama isso só para as linhas visíveis
  const renderMusic = ({ item }: ListRenderItemInfo<Music>): JSX.Element => {
    return (
      <TouchableOpacity style={styles.row} onPress={() => open(item)}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.detail}>
          {item.artist} · {item.genre} · {formatDuration(item.durationSec)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>MÚSICAS</Text>
      <Text style={styles.counter}>{MUSICS.length} músicas</Text>
      <FlatList
        data={MUSICS}
        keyExtractor={(music: Music) => music.id} // chave estável: o id, nunca a posição
        renderItem={renderMusic}
        contentContainerStyle={styles.list}
        initialNumToRender={15}
      />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background, paddingTop: 16, paddingHorizontal: 20 },
  title: { color: COLORS.primary, fontSize: 22, fontWeight: 'bold' },
  counter: { color: COLORS.muted, fontSize: 12, marginTop: 2, marginBottom: 6 },
  list: { paddingBottom: 24 },
  row: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  name: { color: COLORS.text, fontSize: 15, fontWeight: 'bold' },
  detail: { color: COLORS.muted, fontSize: 11, marginTop: 3 },
});
