import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createCandidate, getCandidate, updateCandidate } from '../data/candidatesStorage';

export default function CandidatoForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editando = !!id;

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [linguagens, setLinguagens] = useState(''); // "React, Node, Python"
  const [foto, setFoto] = useState<string | null>(null);

  // carrega dados ao editar
  useEffect(() => {
    if (!id) return;
    getCandidate(id).then((c) => {
      if (!c) return;
      setNome(c.nome);
      setIdade(String(c.idade));
      setLinguagens(c.linguagens.join(', '));
      setFoto(c.foto);
    });
  }, [id]);

  async function escolherGaleria() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) return Alert.alert('Permissão negada', 'Libere o acesso à galeria.');
    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7,
    });
    if (!r.canceled) setFoto(r.assets[0].uri);
  }

  async function tirarFoto() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) return Alert.alert('Permissão negada', 'Libere o acesso à câmera.');
    const r = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!r.canceled) setFoto(r.assets[0].uri);
  }

  async function salvar() {
    const idadeNum = parseInt(idade, 10);
    const langs = linguagens.split(',').map((l) => l.trim()).filter(Boolean);

    if (!nome.trim()) return Alert.alert('Erro', 'Informe o nome completo.');
    if (isNaN(idadeNum) || idadeNum < 16 || idadeNum > 100)
      return Alert.alert('Erro', 'Informe uma idade válida.');
    if (langs.length === 0) return Alert.alert('Erro', 'Informe ao menos uma linguagem.');

    const dados = { nome: nome.trim(), idade: idadeNum, foto, linguagens: langs };
    if (editando) await updateCandidate(id!, dados);
    else await createCandidate(dados);
    router.back();
  }

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Pressable onPress={escolherGaleria}>
        {foto ? <Image source={{ uri: foto }} style={s.foto} /> : <Text style={s.semFoto}>Sem foto</Text>}
      </Pressable>

      <Pressable style={s.btnSec} onPress={tirarFoto}><Text style={s.btnTxt}>Tirar foto</Text></Pressable>
      <Pressable style={s.btnSec} onPress={escolherGaleria}><Text style={s.btnTxt}>Escolher da galeria</Text></Pressable>

      <TextInput style={s.input} placeholder="Nome completo" placeholderTextColor="#888" value={nome} onChangeText={setNome} />
      <TextInput style={s.input} placeholder="Idade" placeholderTextColor="#888" keyboardType="numeric" value={idade} onChangeText={setIdade} />
      <TextInput style={s.input} placeholder="Linguagens (separe por vírgula)" placeholderTextColor="#888" value={linguagens} onChangeText={setLinguagens} />

      <Pressable style={s.btn} onPress={salvar}>
        <Text style={s.btnTxt}>{editando ? 'Salvar alterações' : 'Cadastrar'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 20, gap: 12, backgroundColor: '#111', flexGrow: 1 },
  foto: { width: 140, height: 140, borderRadius: 70, alignSelf: 'center' },
  semFoto: {
    width: 140, height: 140, borderRadius: 70, alignSelf: 'center', backgroundColor: '#333',
    color: '#aaa', textAlign: 'center', textAlignVertical: 'center', lineHeight: 140,
  },
  input: { backgroundColor: '#1e1e1e', color: '#fff', padding: 12, borderRadius: 10 },
  btn: { backgroundColor: '#4da3ff', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  btnSec: { backgroundColor: '#2a2a2a', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnTxt: { color: '#fff', fontWeight: '600' },
});
