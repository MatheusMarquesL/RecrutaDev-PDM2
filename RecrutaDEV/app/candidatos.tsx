import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Candidate } from '../data/candidates';
import { useCandidates } from '../context/CandidatesContext';
import { globalStyles as styles } from '../styles';

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400';

type Tab = 'aprovados' | 'cadastro';

export default function CandidatesScreen() {
  const insets = useSafeAreaInsets();
  const {
    candidates,
    approvedCandidates,
    addCandidate,
    editCandidate,
    deleteCandidate,
    togglePriority,
    isPro,
  } = useCandidates();

  const [tab, setTab] = useState<Tab>('aprovados');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // ---------- Formulário do CRUD (criar e editar) ----------
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [languages, setLanguages] = useState('');
  const [about, setAbout] = useState('');
  const [salary, setSalary] = useState('');
  const [imageUri, setImageUri] = useState(DEFAULT_PHOTO);

  const translateY = useSharedValue(0);

  const closeModal = () => {
    setModalVisible(false);
    translateY.value = 0;
  };

  // ---------- Recurso nativo: câmera e galeria ----------
  const pickImage = async (useCamera: boolean) => {
    const permission = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar a câmera/fotos!');
      return;
    }

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    };

    const result = useCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setAge('');
    setRole('');
    setLanguages('');
    setAbout('');
    setSalary('');
    setImageUri(DEFAULT_PHOTO);
  };

  // C — abrir formulário vazio
  const openCreateForm = () => {
    resetForm();
    setFormVisible(true);
  };

  // U — abrir formulário preenchido
  const openEditForm = (c: Candidate) => {
    setEditingId(c.id);
    setName(c.name);
    setAge(String(c.age));
    setRole(c.role);
    setLanguages(c.technologies.join(', '));
    setAbout(c.about);
    setSalary(c.salary);
    setImageUri(c.image);
    setFormVisible(true);
  };

  const handleSave = () => {
    const ageNumber = Number(age);
    const techList = languages
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (!name.trim() || !role.trim()) {
      Alert.alert('Atenção', 'Nome completo e cargo são obrigatórios!');
      return;
    }
    if (!ageNumber || ageNumber < 14 || ageNumber > 100) {
      Alert.alert('Atenção', 'Informe uma idade válida.');
      return;
    }
    if (techList.length === 0) {
      Alert.alert('Atenção', 'Informe pelo menos uma linguagem (separe por vírgula).');
      return;
    }

    if (editingId) {
      const original = candidates.find((c) => c.id === editingId);
      if (!original) return;
      editCandidate({
        ...original,
        name: name.trim(),
        age: ageNumber,
        role: role.trim(),
        technologies: techList,
        about: about.trim() || original.about,
        salary: salary.trim() || original.salary,
        image: imageUri,
      });
      Alert.alert('Sucesso', 'Candidato atualizado!');
    } else {
      addCandidate({
        id: Date.now().toString(),
        name: name.trim(),
        age: ageNumber,
        role: role.trim(),
        image: imageUri,
        technologies: techList,
        skills: techList,
        about: about.trim() || 'Candidato cadastrado pelo RecrutaDEV.',
        experience: 'Não informada',
        salary: salary.trim() || 'A combinar',
        status: 'Em análise', // entra no deck da Tela 1
        priority: false,
      });
      Alert.alert('Sucesso', 'Candidato cadastrado! Ele já aparece no Deck de Seleção.');
    }

    setFormVisible(false);
    resetForm();
  };

  // D — excluir com confirmação
  const confirmDelete = (c: Candidate) => {
    Alert.alert('Excluir candidato', `Deseja excluir ${c.name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => deleteCandidate(c.id) },
    ]);
  };

  // ---------- Bottom Sheet de detalhes ----------
  const panGesture = Gesture.Pan()
    .activeOffsetY(5)
    .onUpdate((e) => {
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > 80 || e.velocityY > 500) {
        translateY.value = withSpring(500, { velocity: e.velocityY }, () => {
          runOnJS(closeModal)();
        });
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const animatedSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleOpenDetails = (candidate: Candidate) => {
    translateY.value = 0;
    setSelectedCandidate(candidate);
    setModalVisible(true);
  };

  // ---------- Itens da lista ----------
  const renderApproved = ({ item }: { item: Candidate }) => (
    <TouchableOpacity
      style={[styles.candidateCard, item.priority && { borderColor: '#7C3AED', borderWidth: 2 }]}
      activeOpacity={0.8}
      onPress={() => handleOpenDetails(item)}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {item.name}, {item.age}
        </Text>
        <Text style={styles.role}>{item.role}</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{item.priority ? '★ Prioridade' : 'Aprovado'}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => togglePriority(item.id)}>
          <Ionicons name={item.priority ? 'star' : 'star-outline'} size={22} color="#7C3AED" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openEditForm(item)}>
          <Ionicons name="pencil-outline" size={20} color="#3B82F6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(item)}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderRegistered = ({ item }: { item: Candidate }) => (
    <TouchableOpacity
      style={styles.candidateCard}
      activeOpacity={0.8}
      onPress={() => handleOpenDetails(item)}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {item.name}, {item.age}
        </Text>
        <Text style={styles.role}>{item.technologies.join(' · ')}</Text>
        <Text style={styles.statusTextMuted}>{item.status}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => openEditForm(item)}>
          <Ionicons name="pencil-outline" size={20} color="#3B82F6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => confirmDelete(item)}>
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const listData = tab === 'aprovados' ? approvedCandidates : candidates;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <MaterialCommunityIcons name="code-braces" size={24} color="#7C3AED" />
          <Text style={styles.logoText}>RecrutaDEV</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={openCreateForm}>
          <Ionicons name="add" size={16} color="#FFF" />
          <Text style={styles.addButtonText}>Novo Candidato</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitleLabel}>RECRUTAMENTO</Text>
      <Text style={styles.mainTitle}>Painel do Gerente</Text>

      <View style={styles.segmentRow}>
        <TouchableOpacity
          style={[styles.segmentButton, tab === 'aprovados' && styles.segmentButtonActive]}
          onPress={() => setTab('aprovados')}>
          <Text style={[styles.segmentText, tab === 'aprovados' && styles.segmentTextActive]}>
            APROVADOS ({approvedCandidates.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentButton, tab === 'cadastro' && styles.segmentButtonActive]}
          onPress={() => setTab('cadastro')}>
          <Text style={[styles.segmentText, tab === 'cadastro' && styles.segmentTextActive]}>
            CADASTRADOS ({candidates.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listData}
        renderItem={tab === 'aprovados' ? renderApproved : renderRegistered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContainer, listData.length === 0 && { flex: 1 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="people-outline" size={48} color="#9CA3AF" />
            <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 12, textAlign: 'center' }}>
              {tab === 'aprovados'
                ? 'Nenhum candidato aprovado ainda.\nDeslize para a DIREITA na tela de Seleção!'
                : 'Nenhum candidato cadastrado.'}
            </Text>
          </View>
        }
      />

      {/* ---------- Detalhes (R do CRUD) ---------- */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={[styles.modalContent, { paddingBottom: 24 + insets.bottom }, animatedSheetStyle]}>
              <View style={styles.dragHandle} />
              {selectedCandidate && (
                <>
                  <View style={styles.modalHeader}>
                    <View style={styles.modalProfileRow}>
                      <Image source={{ uri: selectedCandidate.image }} style={styles.modalAvatar} />
                      <View>
                        <Text style={styles.modalName}>
                          {selectedCandidate.name}, {selectedCandidate.age}
                        </Text>
                        <Text style={styles.modalRole}>{selectedCandidate.role}</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={closeModal}>
                      <Ionicons name="close" size={24} color="#1F2937" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                    <Text style={styles.sectionTitle}>SOBRE</Text>
                    <Text style={styles.sectionBody}>{selectedCandidate.about}</Text>

                    <Text style={styles.sectionTitle}>LINGUAGENS</Text>
                    <View style={styles.tagsRow}>
                      {selectedCandidate.technologies.map((tech, idx) => (
                        <View key={idx} style={styles.tag}>
                          <Text style={styles.tagText}>{tech}</Text>
                        </View>
                      ))}
                    </View>

                    <Text style={styles.sectionTitle}>EXPERIÊNCIA</Text>
                    <Text style={styles.sectionBody}>{selectedCandidate.experience}</Text>

                    <Text style={styles.sectionTitle}>PRETENSÃO SALARIAL</Text>
                    {isPro ? (
                      <Text style={styles.salaryUnlocked}>{selectedCandidate.salary}</Text>
                    ) : (
                      <View style={styles.salaryLockedContainer}>
                        <Text style={styles.salaryBlurred}>R$ XX.XXX - R$ YY.YYY</Text>
                        <View style={styles.proButtonInline}>
                          <Ionicons name="lock-closed" size={14} color="#7C3AED" />
                          <Text style={styles.proButtonInlineText}>Disponível no RecrutaDEV PRO</Text>
                        </View>
                      </View>
                    )}
                  </ScrollView>
                </>
              )}
            </Animated.View>
          </GestureDetector>
        </View>
      </Modal>

      {/* ---------- Formulário (C e U do CRUD, com câmera/galeria) ---------- */}
      <Modal
        visible={formVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setFormVisible(false)}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { paddingBottom: 24 + insets.bottom }]}>
              <View style={styles.modalHeader}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1F2937' }}>
                  {editingId ? 'Editar Candidato' : 'Novo Candidato'}
                </Text>
                <TouchableOpacity onPress={() => setFormVisible(false)}>
                  <Ionicons name="close" size={24} color="#1F2937" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View style={{ alignItems: 'center', marginBottom: 16 }}>
                  <Image source={{ uri: imageUri }} style={styles.formAvatar} />
                  <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity style={styles.smallButton} onPress={() => pickImage(true)}>
                      <Text style={styles.smallButtonText}>Tirar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButton} onPress={() => pickImage(false)}>
                      <Text style={styles.smallButtonText}>Galeria</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.sectionTitle}>NOME COMPLETO *</Text>
                <TextInput style={styles.input} placeholder="Ex: Ana Souza" value={name} onChangeText={setName} />

                <Text style={styles.sectionTitle}>IDADE *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 26"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                />

                <Text style={styles.sectionTitle}>CARGO *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Desenvolvedora Mobile"
                  value={role}
                  onChangeText={setRole}
                />

                <Text style={styles.sectionTitle}>LINGUAGENS * (separadas por vírgula)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Python, React Native, PHP"
                  value={languages}
                  onChangeText={setLanguages}
                />

                <Text style={styles.sectionTitle}>SOBRE</Text>
                <TextInput
                  style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                  placeholder="Breve descrição..."
                  multiline
                  value={about}
                  onChangeText={setAbout}
                />

                <Text style={styles.sectionTitle}>PRETENSÃO SALARIAL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: R$ 8.000 - R$ 10.000"
                  value={salary}
                  onChangeText={setSalary}
                />

                <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
                  <Text style={styles.primaryButtonText}>
                    {editingId ? 'Salvar Alterações' : 'Cadastrar Candidato'}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
