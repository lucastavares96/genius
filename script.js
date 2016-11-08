var scoreAtualEl = document.getElementById("score");
var maiorScoreEl = document.getElementById("maiorScore");
var botoesEl = {
    'btn-1': document.getElementById('btn-1'),
    'btn-2': document.getElementById('btn-2'),
    'btn-3': document.getElementById('btn-3'),
    'btn-4': document.getElementById('btn-4')
};
var idBotaoAtual, botaoAtual;
var estadoAtual = '';
var historicoBotoes = [];
var cont = 0;
var maiorScore = 0;
var scoreAtual = 0;
function iniciarJogo() {
    historicoBotoes = [];
    contSeqAtual = 0;
    scoreAtual = 0;
    randomId = 'btn-' + Math.floor((Math.random() * 4) + 1);
    historicoBotoes.push(randomId);
    pulseButton(randomId)
}

function verificarSequencia(idBotaoSelecionado) {
    pulseButton(idBotaoSelecionado, function () {
        if (idBotaoSelecionado != historicoBotoes[contSeqAtual]) {
            if (scoreAtual > maiorScore) {
                atualizarMaiorScore(scoreAtual);
            }
            atualizarScore(0);
            alert("Sequencia errada, você perdeu!");
            return
        }
        contSeqAtual++;
        if (contSeqAtual === historicoBotoes.length) {
            finalizarSequenciaAtual();
        }
    });
}

function finalizarSequenciaAtual() {
    contSeqAtual = 0;
    atualizarScore(historicoBotoes.length);
    randomId = 'btn-' + Math.floor((Math.random() * 4) + 1);
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
        setTimeout(function() {
            pulseSequence(sequence);            
        }, 500);
    });
}

function pulseButton(id, callback) {
    var botaoAtual;
    botaoAtual = botoesEl[id];
    botaoAtual.className += " active";
    setTimeout(function () {
        botaoAtual.className = "botao-seq";
        if (callback) {
            callback();
        }
    }, 500);
}