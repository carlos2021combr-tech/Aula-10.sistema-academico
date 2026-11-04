# Respostas – Aula 10 (DOM, Eventos e Manipulação de Interface)

## Perguntas das etapas
- **4.** `document` representa a página carregada: a raiz da árvore DOM, ponto de entrada para ler e alterar o HTML.
- **9.** `querySelector()` retorna o **primeiro** elemento que combina (ou `null`); `querySelectorAll()` retorna uma **NodeList** com todos.
- **32.** Limpar (`textContent = ""`) evita que os cards antigos fiquem na tela e sejam duplicados a cada nova renderização.
- **41.** `event.target` é o elemento que disparou o evento (ex.: o botão clicado).
- **45.** Sem `preventDefault()` o formulário recarrega a página e os dados em memória se perdem; com ele a página permanece e o JavaScript trata o envio.
- **71.** Não. Remover o card do DOM não altera o array `alunos`; DOM e dados são coisas separadas. Por isso `removerAluno()` usa `splice()` e depois renderiza de novo (etapa 72).

## Diagnósticos
- **78.** `querySelector` retorna `null`; `null.textContent = ...` gera `TypeError: Cannot set properties of null`. Verificar com `console.log(titulo)` ou `if (titulo) {...}` e conferir o id no HTML.
- **79.** Os cards aparecem duplicados (a lista dobra), pois o conteúdo anterior não foi removido.
- **80.** A página é enviada/recarregada, a mensagem "Salvando" some do console e os dados em memória se perdem.
- **81.** O nome do evento está errado: é `"click"`, não `"clic"`. Não há erro, o evento simplesmente nunca dispara.
- **82.** Retorna **1** elemento (o primeiro). Para todos: `querySelectorAll(".card")`.

## Questões teóricas
1. **DOM** = Document Object Model, representação em objetos da página HTML.
2. `document` é o objeto raiz do DOM; permite selecionar, criar e alterar elementos.
3. Ver etapa 9.
4. `textContent` lê/altera o texto de um elemento (sem interpretar HTML).
5. `value` guarda o valor atual de um campo de formulário (`input`, `select`, `textarea`).
6. `classList` adiciona, remove, alterna (`toggle`) e verifica (`contains`) classes CSS.
7. `createElement()` cria um elemento novo na memória (ex.: `<p>`).
8. Criar só cria o elemento em memória; ele só aparece na página depois de ser inserido no DOM (`append()`).
9. `append()` insere elementos ou textos como último(s) filho(s) de um elemento.
10. `remove()` remove o elemento do DOM.
11. Evento é uma ocorrência na página (clique, digitação, envio de formulário...).
12. `addEventListener()` registra uma função que será executada quando o evento ocorrer.
13. Ver etapa 41.
14. `preventDefault()` cancela o comportamento padrão do navegador para o evento (ex.: enviar o formulário).
15. `input` dispara a cada alteração enquanto se digita; `change` dispara quando o valor é confirmado (ao sair do campo ou escolher uma opção no `select`).
16. Para não acumular/duplicar elementos e refletir somente o estado atual dos dados.
17. Reuso, legibilidade, facilidade de testar e de corrigir erros.
18. Estilo fica centralizado no CSS, é reutilizável, fácil de manter e separa aparência de comportamento.
19. Porque trata o conteúdo como texto puro, evitando que HTML/scripts digitados sejam interpretados (previne XSS).
20. Os dados estão apenas em arrays na memória do navegador; ao recarregar, `dados.js` é lido de novo e volta ao estado original (sem persistência/LocalStorage).
