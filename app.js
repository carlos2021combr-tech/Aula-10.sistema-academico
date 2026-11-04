console.log("Aula 10 - DOM iniciado.");
console.log(document); // document = representação da página (árvore DOM) feita pelo navegador

const $ = (seletor) => document.querySelector(seletor);

// ---------- Utilidades ----------
function proximoId(lista) {
  // max + 1 evita ids repetidos após remoções (length + 1 poderia repetir)
  return lista.reduce((maior, item) => Math.max(maior, item.id), 0) + 1;
}

function criarElemento(tag, texto, classe) {
  const el = document.createElement(tag);
  if (texto !== undefined) el.textContent = texto; // textContent: seguro contra HTML do usuário
  if (classe) el.classList.add(classe);
  return el;
}

function criarStatus(status) {
  const p = criarElemento("p", "Status: ");
  p.append(criarElemento("span", status, "status-" + status));
  return p;
}

function mostrarMensagem(texto, tipo) {
  const area = $("#mensagem-form");
  if (!area) return;
  area.textContent = texto;
  area.classList.remove("mensagem-sucesso", "mensagem-erro");
  area.classList.add(tipo === "erro" ? "mensagem-erro" : "mensagem-sucesso");
}

function renderizarLista(seletor, lista, criarCard, textoVazio) {
  const alvo = $(seletor);
  if (!alvo) return;
  alvo.textContent = ""; // limpa antes de renderizar (evita duplicar cards)
  if (lista.length === 0) {
    alvo.append(criarElemento("p", textoVazio, "mensagem-vazia"));
    return;
  }
  for (const item of lista) alvo.append(criarCard(item));
}

// ---------- Dashboard ----------
function atualizarDashboard() {
  const totais = {
    "#total-alunos": alunos.length,
    "#total-cursos": cursosCadastrados.length,
    "#total-matriculas": matriculas.length,
    "#total-usuarios": usuarios.length
  };
  for (const [seletor, valor] of Object.entries(totais)) {
    const el = $(seletor);
    if (el) el.textContent = valor;
  }
}

function atualizarDashboardAtivos() {
  const ativos = (lista) => lista.filter((item) => item.status === "ativo").length;
  const totais = {
    "#total-alunos": ativos(alunos),
    "#total-cursos": ativos(cursosCadastrados),
    "#total-matriculas": ativos(matriculas),
    "#total-usuarios": ativos(usuarios)
  };
  for (const [seletor, valor] of Object.entries(totais)) {
    const el = $(seletor);
    if (el) el.textContent = valor;
  }
}

// ---------- Alunos ----------
function exibirDetalhesAluno(aluno) {
  if (!$("#detalhe-nome")) return;
  $("#detalhe-nome").textContent = "Nome: " + aluno.nome + " (" + aluno.email + ")";
  $("#detalhe-curso").textContent = "Curso: " + aluno.curso;
  $("#detalhe-status").textContent = "Status: " + aluno.status;
}

function removerAluno(id) {
  const posicao = alunos.findIndex((a) => a.id === id);
  if (posicao === -1) return;
  alunos.splice(posicao, 1); // remove do array (fonte da verdade)
  aplicarFiltros();          // renderiza de novo
  atualizarDashboard();
}

function criarCardAluno(aluno) {
  const card = criarElemento("article", undefined, "card");
  card.append(
    criarElemento("h3", aluno.nome),
    criarElemento("p", "Curso: " + aluno.curso),
    criarStatus(aluno.status)
  );

  const acoes = criarElemento("div", undefined, "acoes");
  const btnDetalhes = criarElemento("button", "Ver detalhes");
  btnDetalhes.type = "button";
  btnDetalhes.addEventListener("click", () => {
    console.log(aluno.nome);
    exibirDetalhesAluno(aluno);
  });

  const btnRemover = criarElemento("button", "Remover", "secundario");
  btnRemover.type = "button";
  btnRemover.addEventListener("click", () => removerAluno(aluno.id));

  acoes.append(btnDetalhes, btnRemover);
  card.append(acoes);
  return card;
}

function renderizarAlunos(listaAlunos) {
  renderizarLista("#lista-alunos", listaAlunos, criarCardAluno, "Nenhum aluno encontrado.");
}

function aplicarFiltros() {
  const campoBusca = $("#busca");
  const filtroStatus = $("#filtro-status");
  const termo = campoBusca ? campoBusca.value.toLowerCase() : "";
  const status = filtroStatus ? filtroStatus.value : "";

  const filtrados = alunos.filter((aluno) => {
    const nomeOk = aluno.nome.toLowerCase().includes(termo);
    const statusOk = status === "" || aluno.status === status;
    return nomeOk && statusOk;
  });
  renderizarAlunos(filtrados);
}

function atualizarListaAlunos() {
  aplicarFiltros();
}

function cadastrarAluno(event) {
  event.preventDefault(); // impede o recarregamento da página
  const nome = $("#nome").value.trim();
  const email = $("#email").value.trim();
  const curso = $("#curso").value;
  const status = $("#status").value;

  if (nome === "" || email === "") {
    mostrarMensagem("Preencha nome e e-mail.", "erro");
    return;
  }

  const novoAluno = { id: proximoId(alunos), nome, email, curso, status };
  alunos.push(novoAluno);
  console.log(alunos);

  aplicarFiltros();
  atualizarDashboard();
  $("#form-aluno").reset();
  mostrarMensagem("Aluno cadastrado: " + nome + ".", "sucesso");
}

// ---------- Cursos ----------
function criarCardCurso(curso) {
  const card = criarElemento("article", undefined, "card");
  card.append(
    criarElemento("h3", curso.nome),
    criarElemento("p", "Sigla: " + curso.sigla),
    criarElemento("p", "Carga horária: " + curso.cargaHoraria + "h"),
    criarStatus(curso.status)
  );
  return card;
}

function renderizarCursos(listaCursos) {
  renderizarLista("#lista-cursos", listaCursos, criarCardCurso, "Nenhum curso encontrado.");
}

function cadastrarCurso(event) {
  event.preventDefault();
  const nome = $("#nome").value.trim();
  const sigla = $("#sigla").value.trim().toUpperCase();
  const cargaHoraria = Number($("#carga").value);
  const status = $("#status").value;
  if (nome === "" || sigla === "" || cargaHoraria <= 0) {
    mostrarMensagem("Informe nome, sigla e carga horária válida.", "erro");
    return;
  }
  cursosCadastrados.push({ id: proximoId(cursosCadastrados), sigla, nome, cargaHoraria, status });
  renderizarCursos(cursosCadastrados);
  atualizarDashboard();
  $("#form-curso").reset();
  mostrarMensagem("Curso cadastrado.", "sucesso");
}

// ---------- Matrículas ----------
function buscarPorId(lista, id) {
  return lista.find((item) => item.id === id);
}

function criarCardMatricula(matricula) {
  const aluno = buscarPorId(alunos, matricula.alunoId);
  const curso = buscarPorId(cursosCadastrados, matricula.cursoId);
  const card = criarElemento("article", undefined, "card");
  card.append(
    criarElemento("h3", "Matrícula nº " + matricula.id),
    criarElemento("p", "Aluno: " + (aluno ? aluno.nome : "removido")),
    criarElemento("p", "Curso: " + (curso ? curso.nome : "removido")),
    criarStatus(matricula.status)
  );
  return card;
}

function renderizarMatriculas(listaMatriculas) {
  renderizarLista("#lista-matriculas", listaMatriculas, criarCardMatricula, "Nenhuma matrícula encontrada.");
}

function preencherSelect(seletor, lista, rotulo) {
  const select = $(seletor);
  if (!select) return;
  select.textContent = "";
  for (const item of lista) {
    const opcao = criarElemento("option", rotulo(item));
    opcao.value = item.id;
    select.append(opcao);
  }
}

function cadastrarMatricula(event) {
  event.preventDefault();
  matriculas.push({
    id: proximoId(matriculas),
    alunoId: Number($("#aluno").value),
    cursoId: Number($("#curso").value),
    status: $("#status").value
  });
  renderizarMatriculas(matriculas);
  atualizarDashboard();
  mostrarMensagem("Matrícula registrada.", "sucesso");
}

// ---------- Usuários ----------
function criarCardUsuario(usuario) {
  const card = criarElemento("article", undefined, "card");
  card.append(
    criarElemento("h3", usuario.nome),
    criarElemento("p", "Perfil: " + usuario.perfil),
    criarStatus(usuario.status)
  );
  return card;
}

function renderizarUsuarios(listaUsuarios) {
  renderizarLista("#lista-usuarios", listaUsuarios, criarCardUsuario, "Nenhum usuário encontrado.");
}

function cadastrarUsuario(event) {
  event.preventDefault();
  const nome = $("#nome").value.trim();
  if (nome === "") {
    mostrarMensagem("Informe o nome.", "erro");
    return;
  }
  usuarios.push({ id: proximoId(usuarios), nome, perfil: $("#perfil").value, status: $("#status").value });
  renderizarUsuarios(usuarios);
  atualizarDashboard();
  $("#form-usuario").reset();
  mostrarMensagem("Usuário cadastrado.", "sucesso");
}

// ---------- Inicialização e eventos ----------
function ligar(seletor, evento, funcao) {
  const el = $(seletor);
  if (el) el.addEventListener(evento, funcao);
}

atualizarDashboard();
if ($("#lista-alunos")) aplicarFiltros();
renderizarCursos(cursosCadastrados);
renderizarMatriculas(matriculas);
renderizarUsuarios(usuarios);
if ($("#form-matricula")) {
  preencherSelect("#aluno", alunos, (a) => a.nome);
  preencherSelect("#curso", cursosCadastrados, (c) => c.nome);
}

ligar("#btn-atualizar", "click", atualizarListaAlunos);
ligar("#busca", "input", aplicarFiltros);
ligar("#filtro-status", "change", aplicarFiltros);
ligar("#form-aluno", "submit", cadastrarAluno);
ligar("#form-curso", "submit", cadastrarCurso);
ligar("#form-matricula", "submit", cadastrarMatricula);
ligar("#form-usuario", "submit", cadastrarUsuario);

// Alternar totais x apenas ativos (Dashboard)
let somenteAtivos = false;
ligar("#btn-ativos", "click", (event) => {
  somenteAtivos = !somenteAtivos;
  if (somenteAtivos) atualizarDashboardAtivos(); else atualizarDashboard();
  event.target.textContent = somenteAtivos ? "Mostrar totais" : "Mostrar apenas ativos";
});

// Demonstrações das etapas 5-9 e 14-22
const titulo = $("#titulo-sistema");
if (titulo) titulo.textContent = "Sistema Acadêmico - 2026";
const linkAlunos = $("#link-alunos");
if (linkAlunos) {
  console.log(linkAlunos.getAttribute("href"));
  linkAlunos.setAttribute("title", "Acessar cadastro de alunos");
}
const primeiroCard = $(".card");
if (primeiroCard && $("#total-alunos")) {
  primeiroCard.classList.add("destaque");
  console.log(primeiroCard.classList.contains("destaque"));
}
