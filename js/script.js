document.addEventListener('DOMContentLoaded', function() {
    const palavraContainer = document.getElementById('palavra-container');
    const letrasContainer = document.getElementById('letras-container');
    const forcaContainer = document.getElementById('forca-container');
    const mensagem = document.getElementById('mensagem');
    const reiniciarBtn = document.getElementById('reiniciar-btn');

    let palavra = '';
    let letrasCorretas = [];
    let tentativasErradas = 0;

    function desenharForca() {
        const partesForca = [
            ' O ',
            '/|\\',
            '/ \\'
        ];

        forcaContainer.innerHTML = '';
        const forca = document.createElement('div');

        if (tentativasErradas >= 1) {
            const cabeca = document.createElement('div');
            cabeca.textContent = ' O ';
            forca.appendChild(cabeca);
        }
        if (tentativasErradas >= 2) {
            const corpo = document.createElement('div');
            corpo.textContent = '/|\\';
            forca.appendChild(corpo);
        }
        if (tentativasErradas >= 3) {
            const pernas = document.createElement('div');
            pernas.textContent = '/ \\';
            forca.appendChild(pernas);
        }

        forcaContainer.appendChild(forca);
    }

    function atualizarPalavra() {
        palavraContainer.innerHTML = '';
        for (let letra of palavra) {
            const span = document.createElement('span');
            span.textContent = letrasCorretas.includes(letra) ? letra : '_';
            palavraContainer.appendChild(span);
        }
    }

    function iniciarJogo() {
        console.log('Iniciando jogo...');
        fetch('../models/data.php?action=iniciar')
            .then(response => response.json())
            .then(data => {
                palavra = data.word.toUpperCase();
                letrasCorretas = [];
                tentativasErradas = 0;
                atualizarPalavra();
                desenharForca();
                mensagem.textContent = '';
                criarBotoesLetras();
                reiniciarBtn.style.display = 'none';
            })
            .catch(error => console.error('Erro ao iniciar jogo:', error));
    }

    function criarBotoesLetras() {
        letrasContainer.innerHTML = '';
        for (let i = 65; i <= 90; i++) {
            const letra = String.fromCharCode(i);
            const botao = document.createElement('button');
            botao.textContent = letra;
            botao.className = 'letra-botao';
            botao.addEventListener('click', function() {
                verificarLetra(letra);
                botao.disabled = true;
            });
            letrasContainer.appendChild(botao);
        }
    }

    // Função para verificar a letra
    function verificarLetra(letra) {
        if (palavra.includes(letra)) {
            if (!letrasCorretas.includes(letra)) {
                letrasCorretas.push(letra);
                atualizarPalavra();
                mensagem.textContent = '';
            }
        } else {
            tentativasErradas++;
            desenharForca();
        }

        if (tentativasErradas >= 3) {
            mensagem.textContent = 'Você perdeu! A palavra era: ' + palavra;
            desabilitarBotoes();
            reiniciarBtn.style.display = 'block';
        }

        if (palavra.split('').every(letra => letrasCorretas.includes(letra))) {
            mensagem.textContent = 'Parabéns! Você ganhou!';
            desabilitarBotoes();
            reiniciarBtn.style.display = 'block';
        }
    }

    function desabilitarBotoes() {
        const botoes = document.querySelectorAll('.letra-botao');
        botoes.forEach(botao => botao.disabled = true);
    }

    reiniciarBtn.addEventListener('click', iniciarJogo);

    iniciarJogo();
});
