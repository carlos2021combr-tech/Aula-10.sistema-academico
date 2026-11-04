// Dados da Aula 09 (em memória: somem ao recarregar a página)
const alunos = [
  { id: 1, nome: "Ana Souza", email: "ana@email.com", curso: "ADS", status: "ativo" },
  { id: 2, nome: "Bruno Lima", email: "bruno@email.com", curso: "CC", status: "ativo" },
  { id: 3, nome: "Carla Mendes", email: "carla@email.com", curso: "ADS", status: "inativo" },
  { id: 4, nome: "Diego Alves", email: "diego@email.com", curso: "CC", status: "ativo" }
];

const cursosCadastrados = [
  { id: 1, sigla: "ADS", nome: "Análise e Desenvolvimento de Sistemas", cargaHoraria: 2000, status: "ativo" },
  { id: 2, sigla: "CC", nome: "Ciência da Computação", cargaHoraria: 3200, status: "ativo" },
  { id: 3, sigla: "SI", nome: "Sistemas de Informação", cargaHoraria: 3000, status: "inativo" }
];

const matriculas = [
  { id: 1, alunoId: 1, cursoId: 1, status: "ativo" },
  { id: 2, alunoId: 2, cursoId: 2, status: "ativo" },
  { id: 3, alunoId: 3, cursoId: 1, status: "inativo" }
];

const usuarios = [
  { id: 1, nome: "Josemar Silva", perfil: "administrador", status: "ativo" },
  { id: 2, nome: "Marina Costa", perfil: "secretaria", status: "ativo" },
  { id: 3, nome: "Paulo Rocha", perfil: "professor", status: "inativo" }
];
