export interface Candidate {
 id: string;
 name: string;
 age: number;
 role: string;
 image: string;
 technologies: string[];
 skills: string[];
 about: string;
 experience: string;
 salary: string;
 status: 'Em análise' | 'Entrevista' | 'Aprovado' | 'Descartado';
 priority?: boolean;
}
export const initialCandidates: Candidate[] = [
 {
 id: '1',
 name: 'Lara Mendes',
 age: 27,
 role: 'Desenvolvedora Front-end',
 image:
'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
 technologies: ['React', 'TypeScript', 'Next.js', 'Figma'],
 skills: ['UI engineering', 'Acessibilidade'],
 about: 'Crio produtos digitais acessíveis e escaláveis. Gosto de
transformar problemas complexos em experiências simples.',
 experience: '5 anos em produtos SaaS e fintechs',
 salary: 'R$ 7.000 - R$ 9.000',
 status: 'Em análise',
 },
 {
 id: '2',
 name: 'Joana Silva',
 age: 25,
 role: 'Desenvolvedor Full-stack',
 image:
'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
 technologies: ['React', 'Python', 'Docker'],
 skills: ['Backend', 'APIs Rest'],
 about: 'Desenvolvedor orientado a produto com experiência em
aplicações web e mobile.',
 experience: '4 anos em startups de tecnologia',
 salary: 'R$ 8.000 - R$ 10.000',
 status: 'Em análise',
 },
 {
 id: '3',
 name: 'Caio Ribeiro',
 age: 30,
 role: 'Engenheiro de Software',
 image:
'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
 technologies: ['Node.js', 'Go', 'AWS'],
 skills: ['Cloud', 'Microservices'],
 about: 'Especialista em arquitetura de microsserviços e alta
escalabilidade em nuvem.',
 experience: '7 anos de mercado',
 salary: 'R$ 12.000 - R$ 15.000',
 status: 'Em análise',
 },
 {
 id: '4',
 name: 'Sofia Costa',
 age: 26,
 role: 'Desenvolvedora Mobile',
 image:
'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
 technologies: ['React Native', 'Expo', 'TypeScript'],
 skills: ['Mobile UI', 'Animações Nativas'],
 about: 'Apaixonada por criar aplicativos fluidos e de alta
performance para iOS e Android.',
 experience: '3 anos focada em ecossistema React Native',
 salary: 'R$ 7.500 - R$ 10.000',
 status: 'Em análise',
 },
 {
 id: '5',
 name: 'Lucas Martins',
 age: 29,
 role: 'Engenheiro DevOps',
 image:
'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
 technologies: ['Kubernetes', 'Docker', 'Terraform', 'AWS'],
 skills: ['CI/CD', 'Infraestrutura como Código'],
 about: 'Garanto a estabilidade, segurança e automação de entrega de
sistemas corporativos.',
 experience: '6 anos em infraestrutura cloud',
 salary: 'R$ 11.000 - R$ 14.000',
 status: 'Em análise',
 },
 {
 id: '6',
 name: 'Beatriz Lima',
 age: 24,
 role: 'UI/UX & Front-end',
 image:
'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
 technologies: ['Figma', 'React', 'Tailwind', 'CSS'],
 skills: ['Design Systems', 'User Research'],
 about: 'Conecto o design visual à implementação de código limpo e
responsivo.',
 experience: '3 anos em agências e produtos digitais',
 salary: 'R$ 6.500 - R$ 8.500',
 status: 'Em análise',
 },
];