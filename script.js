var scoreAtualEl = document.getElementById("score");
var maiorScoreEl = document.getElementById("maiorScore");
var botoesEl = {
    1: document.getElementById(1),
    2: document.getElementById(2),
    3: document.getElementById(3),
    4: document.getElementById(4)
};
var idBotaoAtual, botaoAtual;
var estadoAtual = '';
var historicoBotoes = [];
var cont = 0;
var maiorScore = 0;
var scoreAtual = 0;
function iniciarJogo() {
    historicoBotoes = [];
    cont = 0;
    scoreAtual = 0;
    randomId = Math.floor((Math.random() * 4) + 1);
    historicoBotoes.push(randomId);
    pulseButton(randomId)
}

function verificarSequencia(idBotaoSelecionado) {
    pulseButton(idBotaoSelecionado, function () {
        if (idBotaoSelecionado != historicoBotoes[cont]) {
            if (scoreAtual > maiorScore) {
                atualizarMaiorScore(scoreAtual);
            }
            atualizarScore(0);
            alert("Sequencia errada, você perdeu!");
            return
        }
        cont++;
        if (cont === historicoBotoes.length) {
            finalizarSequenciaAtual();
        }
    });
}

function finalizarSequenciaAtual() {
    cont = 0;
    atualizarScore(historicoBotoes.length);
    randomId = Math.floor((Math.random() * 4) + 1);
    historicoBotoes.push(randomId);
    var newSequece = historicoBotoes.slice();
    setTimeout(function () {
        pulseSequence(newSequece)
    }, 2000);
}

function atualizarMaiorScore(score) {
    maiorScore = score;
    maiorScoreEl.innerHTML = score;
}

function atualizarScore(score) {
    scoreAtual = score;
    scoreAtualEl.innerHTML = score;
}

function pulseSequence(sequence) {
    if (sequence.length == 0) {
        return;
    }
    pulseButton(sequence[0], function () {
        sequence.splice(0, 1);
        pulseSequence(sequence);
    });
}

function pulseButton(id, callback) {
    var botaoAtual;
    botaoAtual = botoesEl[id];
    botaoAtual.className = "active";
    setTimeout(function () {
        botaoAtual.className = "";
        if (callback) {
            callback();
        }
    }, 500);
}