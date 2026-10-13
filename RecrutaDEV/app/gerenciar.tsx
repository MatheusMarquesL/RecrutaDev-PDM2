import { useCallback, useState } from 'react';
import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Candidate } from '../types/candidate';
import { deleteCandidate, listCandidates } from '../data/candidatesStorage';

export default function Gerenciar() {
  const [candidatos, setCandidatos] = useState<Candidate[]>([]);

  const carregar = useCallback(async () => {
    setCandidatos(await listCandidates());
  }, []);

  // recarrega sempre que a tela volta ao foco (depois de salvar no formulário)
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  function confirmarExclusao(c: Candidate) {
    Alert.alert('Excluir', `Remover ${c.nome}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteCandidate(c.id);
          carregar();
        },
      },
    ]);
  }

  return (
    <View style={s.container}>
      <FlatList
        data={candidatos}
        keyExtractor={(c) => c.id}
        ListEmptyComponent={<Text style={s.vazio}>Nenhum candidato cadastrado.</Text>}
        renderItem={({ item }) => (
          <View style={s.card}>
            {item.foto ? (
              <Image source={{ uri: item.foto }} style={s.foto} />
            ) : (
              <View style={[s.foto, s.semFoto]} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={s.nome}>{item.nome}</Text>
              <Text style={s.sub}>{item.idade} anos</Text>
              <Text style={s.sub}>{item.linguagens.join(', ')}</Text>
            </View>
            <Pressable
              onPress={() =>
                router.push({ pathname: '/candidato-form', params: { id: item.id } })
              }
            >
              <Text style={s.editar}>Editar</Text>
            </Pressable>
            <Pressable onPress={() => confirmarExclusao(item)}>
              <Text style={s.excluir}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
      <Pressable style={s.fab} onPress={() => router.push('/candidato-form')}>
        <Text style={s.fabTxt}>+</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#111' },
  vazio: { color: '#aaa', textAlign: 'center', marginTop: 40 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#1e1e1e', padding: 12, borderRadius: 12, marginBottom: 10,
  },
  foto: { width: 56, height: 56, borderRadius: 28 },
  semFoto: { backgroundColor: '#333' },
  nome: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sub: { color: '#aaa', fontSize: 13 },
  editar: { color: '#4da3ff', fontWeight: '600' },
  excluir: { color: '#ff5c5c', fontWeight: '600' },
  fab: {
    position: 'absolute', right: 20, bottom: 30, width: 56, height: 56,
    borderRadius: 28, backgroundColor: '#4da3ff', alignItems: 'center', justifyContent: 'center',
  },
  fabTxt: { color: '#fff', fontSize: 30, marginTop: -2 },
});
