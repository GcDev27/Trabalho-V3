# Buenas Viagens! ✈️🌍

Um projeto completo de interface web para uma agência de turismo, desenvolvido como parte das atividades acadêmicas do 3º semestre do curso de Análise e Desenvolvimento de Sistemas (FB UNI). 

A aplicação consiste em uma landing page interativa que permite aos usuários explorar destinos, ler avaliações, simular o processo de reserva de viagens e gerenciar suas reservas localmente no navegador.

## 🚀 Tecnologias Utilizadas
- **HTML5:** Estruturação semântica.
- **CSS3:** Estilização com Flexbox, Grid, variáveis CSS, animações e design responsivo (Mobile-First).
- **JavaScript (Vanilla):** Lógica de interface, manipulação do DOM e persistência de dados.
- **Netlify:** Plataforma utilizada para o deploy e hospedagem da aplicação web na nuvem.

---

## ⚙️ Funcionalidades e Estrutura do JavaScript (`script.js`)

O arquivo `script.js` é o coração do projeto e está dividido em módulos funcionais. Abaixo está a explicação de todas as funções e lógicas implementadas:

### 1. Navegação e Interface (UI)
* **Sticky Navbar:** Um *Event Listener* atrelado ao evento `scroll` da janela. Quando o usuário rola mais de 50 pixels para baixo, a classe `.sticky` é adicionada ao menu, mudando seu estilo de transparente para sólido.
* **Menu Mobile:** Controlado através do botão hamburguer (`mobileMenu`). Ele alterna as classes `active` e `is-active` para mostrar ou esconder o menu lateral em telas menores.
* **Sistema de Busca:** Lê a string digitada no campo `#search-destination`. Em seguida, itera sobre todos os `.card` de destinos. Se o título do destino contiver o termo buscado, o card permanece visível; caso contrário, recebe a classe `.hidden-card`.

### 2. Carrossel de Avaliações
* **`updateCarousel()`:** Função responsável por calcular a transição do eixo X (`transform: translateX`) para deslizar o trilho de avaliações, baseando-se no índice atual (`currentIndex`). Os botões de avançar e retroceder modificam esse índice em um loop contínuo.

### 3. Sistema de Modais e Fluxo de Reservas
O processo de compra de passagens é dividido em três etapas dentro de um modal:

* **`renderizarEtapa1()` (Escolha de Voo e Passageiros):** Injeta no modal dinamicamente os detalhes do destino escolhido. Lista os voos disponíveis usando botões de rádio (radio buttons). Possui um ouvinte de evento no *input* de passageiros que calcula, em tempo real, o valor total estimativo (`Preço Base × Qtd. Passageiros`).
* **`renderizarEtapa2()` (Dados do Cliente e Pagamento):** Solicita nome, e-mail e forma de pagamento. Se a opção "PIX" for selecionada, aplica logicamente um desconto de 5% no valor total final (`precoTotal * 0.95`).
* **`renderizarEtapa3(nomeComprador)` (Confirmação e Código):**
  Gera um código alfanumérico aleatório de 4 dígitos com o prefixo `BVT-` (ex: `BVT-A7X9`). Salva todas as informações da reserva chamando a função `salvarReserva()`.
* **`fecharModal()`:** Remove a classe `active` do modal e aguarda 300ms (tempo da animação CSS) para limpar completamente as variáveis globais temporárias da reserva (`viagemSelecionada`, `precoTotal`, etc.), garantindo que a próxima abertura ocorra do zero.

### 4. Gerenciamento de Dados Locais (Minhas Viagens)
O projeto simula um banco de dados usando o `localStorage` do navegador para manter o estado das reservas do usuário.

* **`salvarReserva(novaReserva)`:** Recupera o array de reservas atuais do localStorage, adiciona o novo objeto de reserva (contendo código, cidade, data, passageiros e preço) e salva novamente. Por fim, engatilha a re-renderização da seção Minhas Viagens.
* **`window.cancelarReserva(codigo)`:** Dispara um alerta de confirmação. Se aceito, filtra o array do localStorage removendo o objeto cujo código bate com o parâmetro, atualizando a listagem em seguida.
* **`window.abrirModalAlterarVoo(codigo)`:** Abre um modal secundário específico para alteração. Busca a reserva salva, lista os outros voos disponíveis para a mesma cidade e permite que o usuário selecione uma nova opção.
* **`window.salvarNovaData(codigo)`:** Confirma a escolha feita no modal de alteração, atualizando as propriedades `vooId`, `vooData` e `vooHorario` no localStorage.
* **`calcularProgresso(dataCompraMs, vooDataString)`:** Uma função matemática essencial que pega o *timestamp* exato da compra e a data futura do voo. Calcula o tempo total em relação ao momento presente (`dataAgora`) para retornar a porcentagem exata que preenche a barra de progresso do card da viagem, além de calcular quantos dias faltam para o embarque.
* **`renderizarMinhasViagens()`:** Limpa a div `#viagens-container` e itera sobre todas as viagens salvas no `localStorage`. Para cada uma, constrói a estrutura HTML do card, injetando a largura da barra de progresso retornada por `calcularProgresso()` e amarrando os botões de ação ("Alterar Voo" e "Cancelar") diretamente à API global de funções.

---
