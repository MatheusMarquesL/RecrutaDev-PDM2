export type Candidate = {
  id: number;
  nome: string;
  idade: number;
  cargo: string;
  experiencia: string;
  tecnologias: string[];
};

export const candidates: Candidate[] = [
  {
    id: 1,
    nome: "Ana Souza",
    idade: 22,
    cargo: "Desenvolvedora Front-end",
    experiencia: "1 ano",
    tecnologias: ["React", "TypeScript", "CSS"],
  },
  {
    id: 2,
    nome: "Lucas Oliveira",
    idade: 25,
    cargo: "Desenvolvedor Back-end",
    experiencia: "3 anos",
    tecnologias: ["Node.js", "Java", "PostgreSQL"],
  },
  {
    id: 3,
    nome: "Marina Santos",
    idade: 24,
    cargo: "Desenvolvedora Mobile",
    experiencia: "2 anos",
    tecnologias: ["React Native", "Expo", "TypeScript"],
  },
];