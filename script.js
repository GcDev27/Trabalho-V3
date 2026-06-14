document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Menu Mobile
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('is-active');
        });
    });

    // Carrossel de Avaliações
    const track = document.getElementById('testimonial-track');
    const items = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if(nextBtn && prevBtn && track) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        });
    }

    // Sistema de Busca
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-destination');
    const destinationCards = document.querySelectorAll('.card');

    if(searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let found = false;

            destinationCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                if(title.includes(searchTerm)) {
                    card.classList.remove('hidden-card');
                    found = true;
                } else {
                    card.classList.add('hidden-card');
                }
            });

            // Rolar suavemente para a seção de destinos
            document.getElementById('destinos').scrollIntoView({ behavior: 'smooth' });

            if(!found) {
                alert('Nenhum destino encontrado com esse nome. Tente novamente!');
                destinationCards.forEach(card => card.classList.remove('hidden-card'));
            }
        });
    }

    // Dados para o sistema de reservas
    const viagens = {
        'barcelona': {
            nome: 'Barcelona, Espanha',
            descricao: 'Descubra a arquitetura deslumbrante de Gaudí, caminhe por Las Ramblas e aproveite a rica cultura catalã em uma viagem inesquecível para Barcelona.',
            imagem: 'imagens/barcelona.png',
            imagemModal: 'https://loremflickr.com/1200/800/barcelona,landmark/all',
            precoBase: 3900,
            voos: [
                { id: 1, data: '15/08', horario: '20:00', tipo: 'Voo Direto' },
                { id: 2, data: '16/08', horario: '10:15', tipo: '1 Escala' },
                { id: 3, data: '22/08', horario: '14:30', tipo: 'Voo Direto' },
                { id: 4, data: '28/08', horario: '06:00', tipo: '1 Escala' },
                { id: 5, data: '05/09', horario: '08:00', tipo: 'Voo Direto' }
            ]
        },
        'porto': {
            nome: 'Porto, Portugal',
            descricao: 'Experimente os melhores vinhos às margens do Rio Douro e encante-se com a história e a hospitalidade da charmosa cidade do Porto.',
            imagem: 'imagens/porto.png',
            imagemModal: 'https://loremflickr.com/1200/800/porto,portugal/all',
            precoBase: 3700,
            voos: [
                { id: 1, data: '10/08', horario: '18:00', tipo: 'Voo Direto' },
                { id: 2, data: '12/08', horario: '09:00', tipo: '1 Escala' },
                { id: 3, data: '25/08', horario: '10:15', tipo: 'Voo Direto' },
                { id: 4, data: '02/09', horario: '14:20', tipo: '1 Escala' },
                { id: 5, data: '12/09', horario: '22:30', tipo: 'Voo Direto' }
            ]
        },
        'milao': {
            nome: 'Milão, Itália',
            descricao: 'A capital mundial da moda te espera com o majestoso Duomo, galerias luxuosas e a autêntica gastronomia italiana.',
            imagem: 'imagens/milao.png',
            imagemModal: 'https://loremflickr.com/1200/800/milan,italy/all',
            precoBase: 3500,
            voos: [
                { id: 1, data: '18/08', horario: '16:45', tipo: '1 Escala' },
                { id: 2, data: '20/08', horario: '08:30', tipo: 'Voo Direto' },
                { id: 3, data: '01/09', horario: '19:20', tipo: 'Voo Direto' },
                { id: 4, data: '10/09', horario: '11:00', tipo: '1 Escala' },
                { id: 5, data: '20/09', horario: '09:10', tipo: 'Voo Direto' }
            ]
        },
        'londres': {
            nome: 'Londres, Inglaterra',
            descricao: 'Uma mistura perfeita entre o histórico e o moderno. Visite o Big Ben, ande nos ônibus de dois andares e explore os incríveis museus londrinos.',
            imagem: 'imagens/londres.png',
            imagemModal: 'https://loremflickr.com/1200/800/london,england/all',
            precoBase: 4200,
            voos: [
                { id: 1, data: '14/08', horario: '23:00', tipo: 'Voo Direto' },
                { id: 2, data: '18/08', horario: '15:20', tipo: '1 Escala' },
                { id: 3, data: '28/08', horario: '21:00', tipo: 'Voo Direto' },
                { id: 4, data: '05/09', horario: '07:40', tipo: '1 Escala' },
                { id: 5, data: '15/09', horario: '13:40', tipo: 'Voo Direto' }
            ]
        },
        'lauterbrunnen': {
            nome: 'Lauterbrunnen, Suíça',
            descricao: 'Um verdadeiro vale de conto de fadas, cercado por 72 cachoeiras e montanhas alpinas majestosas. O refúgio perfeito para amantes da natureza.',
            imagem: 'imagens/lauterbrunnen.png',
            imagemModal: 'https://loremflickr.com/1200/800/lauterbrunnen,alps/all',
            precoBase: 3900,
            voos: [
                { id: 1, data: '05/08', horario: '07:30', tipo: '1 Escala' },
                { id: 2, data: '10/08', horario: '14:00', tipo: '2 Escalas' },
                { id: 3, data: '19/08', horario: '11:20', tipo: '1 Escala' },
                { id: 4, data: '25/08', horario: '09:15', tipo: '1 Escala' },
                { id: 5, data: '02/09', horario: '15:00', tipo: '1 Escala' }
            ]
        },
        'paris': {
            nome: 'Paris, França',
            descricao: 'A Cidade Luz inspira romance e arte. Suba na Torre Eiffel, navegue pelo rio Sena e perca-se nos corredores do Louvre.',
            imagem: 'imagens/paris.png',
            imagemModal: 'https://loremflickr.com/1200/800/paris,france/all',
            precoBase: 4500,
            voos: [
                { id: 1, data: '20/08', horario: '19:00', tipo: 'Voo Direto' },
                { id: 2, data: '25/08', horario: '10:30', tipo: '1 Escala' },
                { id: 3, data: '03/09', horario: '20:30', tipo: 'Voo Direto' },
                { id: 4, data: '12/09', horario: '14:00', tipo: '1 Escala' },
                { id: 5, data: '18/09', horario: '12:15', tipo: 'Voo Direto' }
            ]
        }
    };

    // Elementos do Modal
    const modal = document.getElementById('trip-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalBody = document.getElementById('modal-body-content');
    const botoesSaibaMais = document.querySelectorAll('.btn-saiba-mais');

    // Variáveis para guardar o estado da reserva
    let viagemSelecionada = null;
    let precoTotal = 0;
    let vooSelecionadoId = null;
    let qtdPassageirosAtual = 1;

    // Função simples para formatar dinheiro (Real brasileiro)
    function formatarDinheiro(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    // --- ETAPA 1: Escolher Voo e Passageiros ---
    function renderizarEtapa1() {
        let htmlVoos = '';
        
        // Cria a lista de voos (Radio buttons) com um for loop normal para ser fácil de entender
        for(let i = 0; i < viagemSelecionada.voos.length; i++) {
            let voo = viagemSelecionada.voos[i];
            let marcado = i === 0 ? 'checked' : ''; // o primeiro já vem marcado
            
            htmlVoos += `
                <label class="flight-option">
                    <input type="radio" name="voo_escolhido" value="${voo.id}" ${marcado}>
                    <div class="flight-details">
                        <span class="flight-time"><i class="far fa-calendar-alt"></i> ${voo.data} às ${voo.horario}</span>
                        <span class="flight-type">${voo.tipo}</span>
                    </div>
                </label>
            `;
        }

        modalBody.innerHTML = `
            <h2>${viagemSelecionada.nome}</h2>
            <p class="modal-description">${viagemSelecionada.descricao}</p>
            
            <h3>Escolha seu voo:</h3>
            <div class="voos-lista">
                ${htmlVoos}
            </div>

            <div class="passengers-container">
                <label for="qtd_passageiros">Quantidade de Passageiros:</label>
                <input type="number" id="qtd_passageiros" min="1" max="10" value="1">
                <p style="margin-top: 10px; font-weight: bold; color: var(--primary-color);">
                    Preço total estimativa: <span id="preco_total">${formatarDinheiro(viagemSelecionada.precoBase)}</span>
                </p>
            </div>

            <button class="btn-primary modal-reserve-btn" id="btn-continuar-etapa1" style="width: 100%;">Continuar Reserva</button>
        `;

        // Atualizar preço dinamicamente quando mudar os passageiros
        const inputPassageiros = document.getElementById('qtd_passageiros');
        const spanPrecoTotal = document.getElementById('preco_total');
        
        inputPassageiros.addEventListener('input', function() {
            let qtd = parseInt(inputPassageiros.value);
            if(isNaN(qtd) || qtd < 1) qtd = 1; // Proteção simples contra texto ou valores errados
            
            precoTotal = qtd * viagemSelecionada.precoBase;
            spanPrecoTotal.textContent = formatarDinheiro(precoTotal);
        });

        // Botão de continuar
        document.getElementById('btn-continuar-etapa1').addEventListener('click', function() {
            let qtd = parseInt(inputPassageiros.value);
            if(isNaN(qtd) || qtd < 1) qtd = 1;
            
            qtdPassageirosAtual = qtd;
            precoTotal = qtd * viagemSelecionada.precoBase;
            
            // Descobre qual voo o usuario escolheu no radio button
            const radios = document.getElementsByName('voo_escolhido');
            for(let r = 0; r < radios.length; r++) {
                if(radios[r].checked) {
                    vooSelecionadoId = parseInt(radios[r].value);
                    break;
                }
            }
            
            renderizarEtapa2();
        });
    }

    // --- ETAPA 2: Formulário de Dados ---
    function renderizarEtapa2() {
        modalBody.innerHTML = `
            <h2>Preencha seus dados</h2>
            <p class="modal-description">Falta pouco para você confirmar sua viagem para ${viagemSelecionada.nome}!</p>
            
            <div class="form-group-modal">
                <label>Nome Completo</label>
                <input type="text" id="reserva_nome" placeholder="Ex: João da Silva" required>
            </div>
            
            <div class="form-group-modal">
                <label>E-mail</label>
                <input type="email" id="reserva_email" placeholder="Ex: joao@email.com" required>
            </div>
            
            <div class="form-group-modal">
                <label>Forma de Pagamento</label>
                <select id="reserva_pagamento">
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="pix">PIX (5% de desconto)</option>
                    <option value="boleto">Boleto Bancário</option>
                </select>
            </div>
            
            <div style="background: #F8F9FA; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <strong>Resumo:</strong><br>
                Valor a pagar: <span id="valor_final" style="color: var(--primary-color); font-weight: bold; font-size: 1.2rem;">${formatarDinheiro(precoTotal)}</span>
            </div>

            <div class="modal-buttons">
                <button class="btn-secondary btn-voltar" id="btn-voltar-etapa1">Voltar</button>
                <button class="btn-primary modal-reserve-btn" id="btn-finalizar">Finalizar Compra</button>
            </div>
        `;

        // Se escolher PIX, dá 5% de desconto
        const selectPagamento = document.getElementById('reserva_pagamento');
        const spanValorFinal = document.getElementById('valor_final');
        
        selectPagamento.addEventListener('change', function() {
            if(selectPagamento.value === 'pix') {
                let comDesconto = precoTotal * 0.95;
                spanValorFinal.textContent = formatarDinheiro(comDesconto);
            } else {
                spanValorFinal.textContent = formatarDinheiro(precoTotal);
            }
        });

        // Eventos dos botões
        document.getElementById('btn-voltar-etapa1').addEventListener('click', function() {
            renderizarEtapa1();
        });

        document.getElementById('btn-finalizar').addEventListener('click', function() {
            const nome = document.getElementById('reserva_nome').value;
            const email = document.getElementById('reserva_email').value;
            
            if(nome.trim() === '' || email.trim() === '') {
                alert("Por favor, preencha seu nome e e-mail!");
            } else {
                renderizarEtapa3(nome);
            }
        });
    }

    // --- ETAPA 3: Sucesso e Código de Reserva ---
    function renderizarEtapa3(nomeComprador) {
        // Gera um código de reserva aleatório (ex: BVT-49A2)
        const letrasENumeros = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigoFinal = 'BVT-';
        for (let i = 0; i < 4; i++) {
            let posicaoSorteada = Math.floor(Math.random() * letrasENumeros.length);
            codigoFinal += letrasENumeros.charAt(posicaoSorteada);
        }

        modalBody.innerHTML = `
            <div class="success-container">
                <i class="fas fa-check-circle success-icon"></i>
                <h2>Reserva Confirmada!</h2>
                <p style="margin-top: 10px;">Parabéns, <strong>${nomeComprador}</strong>! Sua viagem para ${viagemSelecionada.nome} foi reservada com sucesso.</p>
                
                <p style="margin-top: 20px; color: var(--text-light);">Guarde seu código de reserva:</p>
                <div class="reservation-code">${codigoFinal}</div>
                
                <p style="margin-bottom: 30px; font-size: 0.9rem;">Enviamos os detalhes do voo para o seu e-mail.</p>
                
                <button class="btn-primary" id="btn-fechar-sucesso" style="width: 100%;">Fechar e Voltar ao Site</button>
            </div>
        `;

        // Busca os dados do voo selecionado para salvar
        let vooEscolhido = null;
        for(let v = 0; v < viagemSelecionada.voos.length; v++) {
            if(viagemSelecionada.voos[v].id === vooSelecionadoId) {
                vooEscolhido = viagemSelecionada.voos[v];
                break;
            }
        }

        // Salvar no LocalStorage
        salvarReserva({
            codigo: codigoFinal,
            cidadeKey: Object.keys(viagens).find(key => viagens[key] === viagemSelecionada),
            cidadeNome: viagemSelecionada.nome,
            imagem: viagemSelecionada.imagem,
            vooId: vooSelecionadoId,
            vooData: vooEscolhido.data,
            vooHorario: vooEscolhido.horario,
            qtdPassageiros: qtdPassageirosAtual,
            valorFinal: precoTotal,
            dataCompra: new Date().getTime() // Tempo atual em milissegundos
        });

        document.getElementById('btn-fechar-sucesso').addEventListener('click', fecharModal);
    }

    // --- LÓGICA GERAL DE ABRIR E FECHAR O MODAL ---
    function fecharModal() {
        modal.classList.remove('active');
        
        // Espera a animação de saída terminar para limpar tudo (300 milissegundos)
        setTimeout(function() {
            viagemSelecionada = null;
            precoTotal = 0;
            modalBody.innerHTML = '';
        }, 300);
    }

    // Só roda se o modal e os botões existirem no HTML
    if(modal && botoesSaibaMais.length > 0) {
        
        // O loop 'for' vai passar por todos os botões de Saiba Mais
        for(let i = 0; i < botoesSaibaMais.length; i++) {
            botoesSaibaMais[i].addEventListener('click', function(evento) {
                // Descobre qual cidade o usuario clicou usando o atributo data-destino no HTML
                const cidadeEscolhida = evento.target.getAttribute('data-destino');
                
                // Pega os dados no objeto viagens la de cima
                viagemSelecionada = viagens[cidadeEscolhida];
                
                if(viagemSelecionada) {
                    // Inicializa mostrando a Etapa 1
                    renderizarEtapa1();
                    modal.classList.add('active'); // Abre o modal
                }
            });
        }

        // Fechar pelo botão X
        closeModalBtn.addEventListener('click', fecharModal);

        // Fechar clicando fora da caixinha (no overlay escuro)
        modal.addEventListener('click', function(evento) {
            if(evento.target === modal) {
                fecharModal();
            }
        });
    }

    // --- SISTEMA DE LOCAL STORAGE (MINHAS VIAGENS) ---
    function salvarReserva(novaReserva) {
        let reservas = JSON.parse(localStorage.getItem('minhas_reservas')) || [];
        reservas.push(novaReserva);
        localStorage.setItem('minhas_reservas', JSON.stringify(reservas));
        renderizarMinhasViagens(); // Atualiza a tela imediatamente
    }

    // O objeto de viagens precisa estar acessível globalmente para isso funcionar
    // Vamos expor as funções de cancelar e alterar para o HTML (onClick)
    window.cancelarReserva = function(codigo) {
        if(confirm(`Tem certeza que deseja cancelar a reserva ${codigo}?`)) {
            let reservas = JSON.parse(localStorage.getItem('minhas_reservas')) || [];
            reservas = reservas.filter(r => r.codigo !== codigo);
            localStorage.setItem('minhas_reservas', JSON.stringify(reservas));
            renderizarMinhasViagens();
        }
    };

    window.abrirModalAlterarVoo = function(codigo) {
        let reservas = JSON.parse(localStorage.getItem('minhas_reservas')) || [];
        let reservaSelecionada = null;
        for(let i=0; i<reservas.length; i++) {
            if(reservas[i].codigo === codigo) reservaSelecionada = reservas[i];
        }
        
        if(!reservaSelecionada) return;

        let cidade = viagens[reservaSelecionada.cidadeKey];
        let htmlOpcoes = '';
        
        for(let i=0; i<cidade.voos.length; i++) {
            let voo = cidade.voos[i];
            let marcado = voo.id === reservaSelecionada.vooId ? 'checked' : '';
            htmlOpcoes += `
                <label class="flight-option">
                    <input type="radio" name="voo_alteracao" value="${voo.id}" ${marcado}>
                    <div class="flight-details">
                        <span class="flight-time"><i class="far fa-calendar-alt"></i> ${voo.data} às ${voo.horario}</span>
                        <span class="flight-type">${voo.tipo}</span>
                    </div>
                </label>
            `;
        }

        const modalAlterar = document.getElementById('modal-alterar-voo');
        const contentAlterar = document.getElementById('modal-alterar-content');
        
        contentAlterar.innerHTML = `
            <h2>Alterar Voo para ${reservaSelecionada.cidadeNome}</h2>
            <p>Selecione a nova data/horário para a reserva <strong>${codigo}</strong>:</p>
            <div class="voos-lista" style="margin-top: 15px;">
                ${htmlOpcoes}
            </div>
            <button class="btn-primary" onclick="salvarNovaData('${codigo}')" style="width: 100%; margin-top: 20px;">Salvar Alteração</button>
        `;
        
        modalAlterar.classList.add('active');
        
        document.getElementById('close-modal-alterar').onclick = function() {
            modalAlterar.classList.remove('active');
        };
    };

    window.salvarNovaData = function(codigo) {
        const radios = document.getElementsByName('voo_alteracao');
        let novoVooId = null;
        for(let i=0; i<radios.length; i++) {
            if(radios[i].checked) {
                novoVooId = parseInt(radios[i].value);
                break;
            }
        }

        let reservas = JSON.parse(localStorage.getItem('minhas_reservas')) || [];
        for(let i=0; i<reservas.length; i++) {
            if(reservas[i].codigo === codigo) {
                // Encontrar os dados do novo voo
                let cidade = viagens[reservas[i].cidadeKey];
                let novoVoo = cidade.voos.find(v => v.id === novoVooId);
                
                reservas[i].vooId = novoVooId;
                reservas[i].vooData = novoVoo.data;
                reservas[i].vooHorario = novoVoo.horario;
                break;
            }
        }
        
        localStorage.setItem('minhas_reservas', JSON.stringify(reservas));
        document.getElementById('modal-alterar-voo').classList.remove('active');
        renderizarMinhasViagens();
    };

    function calcularProgresso(dataCompraMs, vooDataString) {
        // Ex: vooDataString = "15/08"
        // Vamos usar 2026 como o ano atual base
        const partes = vooDataString.split('/');
        const dia = parseInt(partes[0]);
        const mes = parseInt(partes[1]) - 1; // Meses em JS começam em 0
        const anoVoo = 2026; 

        const dataVooObj = new Date(anoVoo, mes, dia).getTime();
        const dataAgora = new Date().getTime();
        
        const tempoTotal = dataVooObj - dataCompraMs;
        const tempoDecorrido = dataAgora - dataCompraMs;
        
        let porcentagem = (tempoDecorrido / tempoTotal) * 100;
        
        // Limita a barra entre 5% (minimo pra ver) e 100%
        if(porcentagem < 5) porcentagem = 5;
        if(porcentagem > 100) porcentagem = 100;
        
        // Calcula dias restantes
        let diasRestantes = Math.ceil((dataVooObj - dataAgora) / (1000 * 60 * 60 * 24));
        if(diasRestantes < 0) diasRestantes = 0;

        return { porcentagem, diasRestantes };
    }

    function renderizarMinhasViagens() {
        const container = document.getElementById('viagens-container');
        if(!container) return;

        let reservas = JSON.parse(localStorage.getItem('minhas_reservas')) || [];
        
        if(reservas.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-light); width: 100%;">Você ainda não tem reservas. Explore nossos destinos!</p>';
            return;
        }

        let html = '';
        for(let i=0; i<reservas.length; i++) {
            let r = reservas[i];
            let progresso = calcularProgresso(r.dataCompra, r.vooData);
            
            let statusTexto = progresso.diasRestantes === 0 ? "A viagem é Hoje!" : `Faltam ${progresso.diasRestantes} dias para o embarque!`;
            
            html += `
                <div class="trip-card">
                    <img src="${r.imagem}" alt="${r.cidadeNome}">
                    <div class="trip-info">
                        <h3>${r.cidadeNome}</h3>
                        <p><i class="far fa-calendar-alt"></i> ${r.vooData} às ${r.vooHorario}</p>
                        <p><i class="fas fa-users"></i> ${r.qtdPassageiros} Passageiro(s)</p>
                        <div class="trip-code">${r.codigo}</div>
                        
                        <div class="trip-progress-area">
                            <div class="progress-header">
                                <span>Status do Voo</span>
                                <span>${statusTexto}</span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" style="width: ${progresso.porcentagem}%;"></div>
                            </div>
                        </div>

                        <div class="trip-actions">
                            <button class="btn-warning" onclick="abrirModalAlterarVoo('${r.codigo}')"><i class="fas fa-edit"></i> Alterar Voo</button>
                            <button class="btn-danger" onclick="cancelarReserva('${r.codigo}')"><i class="fas fa-trash"></i> Cancelar</button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = html;
    }

    // Chama a função ao carregar a página para mostrar os dados salvos
    renderizarMinhasViagens();
});