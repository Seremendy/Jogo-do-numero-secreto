let listaDeNumerosSorteados = []; // Lista para armazenar os números já sorteados, evitando repetições.
let numeroLimite = 10; // Limite máximo do número que pode ser sorteado (de 1 a 10).
let numeroSecreto = geraNumeroAleatorio(); // Número secreto gerado aleatoriamente para o jogo.
let tentativas = 1; // Contador de tentativas feitas pelo jogador.

function exibirTextoNaTela(tag, texto) {
    // Função que insere o texto no elemento HTML especificado e utiliza o recurso de voz.
    let campo = document.querySelector(tag); // Seleciona o elemento HTML baseado na tag fornecida.
    campo.innerHTML = texto; // Substitui o conteúdo do elemento pelo texto fornecido.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 }); // Recurso de voz para ler o texto exibido.
}

function exibirMensagemInicial() {
    // Exibe a mensagem inicial do jogo.
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título do jogo.
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // Exibe a instrução inicial.
}

function verificarChute() {
    // Verifica se o chute do jogador está correto.
    let chute = document.querySelector('input').value; // Obtém o valor digitado pelo jogador.
    
    if (chute == numeroSecreto) {
        // Se o chute for igual ao número secreto.
        exibirTextoNaTela('h1', 'Você acertou!'); // Exibe mensagem de acerto.
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Define a palavra no singular ou plural.
        let mensagemTentativas = `Você acertou com ${tentativas} ${palavraTentativa}!`; // Mensagem informando o número de tentativas.
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem final.
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar o jogo.
    } else {
        // Se o chute estiver errado.
        if (chute > numeroSecreto) {
            // Caso o chute seja maior que o número secreto.
            exibirTextoNaTela('p', 'O número secreto é menor'); // Informa que o número secreto é menor.
        } else {
            // Caso o chute seja menor que o número secreto.
            exibirTextoNaTela('p', 'O número secreto é maior'); // Informa que o número secreto é maior.
        }
        tentativas++; // Incrementa o número de tentativas.
        limparCampo(); // Limpa o campo de entrada.
    }
}

function geraNumeroAleatorio() {
    // Gera um número aleatório entre 1 e o limite definido.
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e 10.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Obtém a quantidade de números já sorteados.

    if (quantidadeDeElementosNaLista == numeroLimite) {
        // Se todos os números já foram sorteados, reseta a lista.
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Se o número já foi sorteado, gera outro número.
        return geraNumeroAleatorio();
    } else {
        // Se o número não foi sorteado, adiciona à lista e o retorna.
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista de sorteados.
        console.log(listaDeNumerosSorteados); // Exibe a lista no console (para depuração).
        return numeroEscolhido; // Retorna o número sorteado.
    }
}

function limparCampo() {
    // Limpa o campo de entrada do jogador.
    let chute = document.querySelector('input'); // Seleciona o campo de entrada.
    chute.value = ''; // Limpa o valor do campo.
}

function reiniciarJogo() {
    // Reinicia o jogo para uma nova rodada.
    numeroSecreto = geraNumeroAleatorio(); // Gera um novo número secreto.
    limparCampo(); // Limpa o campo de entrada.
    tentativas = 1; // Reseta o contador de tentativas.
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente.
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar.
}

// Exibe a mensagem inicial do jogo assim que a página é carregada.
exibirMensagemInicial();