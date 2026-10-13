import AsyncStorage from '@react-native-async-storage/async-storage';
import { Candidate, CandidateInput } from '../types/candidate';

const KEY = '@recrutadev:candidatos';

async function saveAll(list: Candidate[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

// READ (todos)
export async function listCandidates(): Promise<Candidate[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Candidate[]) : [];
}

// READ (um)
export async function getCandidate(id: string): Promise<Candidate | undefined> {
  return (await listCandidates()).find((c) => c.id === id);
}

// CREATE
export async function createCandidate(input: CandidateInput): Promise<Candidate> {
  const list = await listCandidates();
  const novo: Candidate = { ...input, id: Date.now().toString() };
  await saveAll([...list, novo]);
  return novo;
}

// UPDATE
export async function updateCandidate(id: string, input: CandidateInput) {
  const list = await listCandidates();
  await saveAll(list.map((c) => (c.id === id ? { ...c, ...input } : c)));
}

// DELETE
export async function deleteCandidate(id: string) {
  const list = await listCandidates();
  await saveAll(list.filter((c) => c.id !== id));
}
