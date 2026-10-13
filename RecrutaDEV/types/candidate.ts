export type Candidate = {
  id: string;
  nome: string;
  idade: number;
  foto: string | null; // uri da câmera/galeria
  linguagens: string[];
};

export type CandidateInput = Omit<Candidate, 'id'>;
