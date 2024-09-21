function calcular() {
    // Obtém os valores dos campos
    let larguraAmbiente = parseFloat(document.getElementById('larguraAmbiente').value);
    let comprimentoAmbiente = parseFloat(document.getElementById('comprimentoAmbiente').value);
    let larguraPeca = parseFloat(document.getElementById('larguraPeca').value);
    let comprimentoPeca = parseFloat(document.getElementById('comprimentoPeca').value);

    // Verifica se todos os valores foram preenchidos corretamente
    if (!larguraAmbiente || !comprimentoAmbiente || !larguraPeca || !comprimentoPeca) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Calcula a área do ambiente e das peças
    let areaAmbiente = larguraAmbiente * comprimentoAmbiente;
    let areaPeca = larguraPeca * comprimentoPeca;
    let numPecas = Math.ceil(areaAmbiente / areaPeca);

    // Exibe o resultado
    document.getElementById('resultado').innerText = `Você precisará de aproximadamente ${numPecas} peças de cerâmica.`;

    // Gera a visualização da paginação no Canvas
    desenharPaginacao(larguraAmbiente, comprimentoAmbiente, larguraPeca, comprimentoPeca);
}

function desenharPaginacao(larguraAmbiente, comprimentoAmbiente, larguraPeca, comprimentoPeca) {
    // Obter o elemento canvas e o contexto de desenho
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ajusta as dimensões do canvas conforme o ambiente para que a escala fique correta
    let escala = Math.min(canvas.width / larguraAmbiente, canvas.height / comprimentoAmbiente);
    let larguraEscalada = larguraAmbiente * escala;
    let comprimentoEscalado = comprimentoAmbiente * escala;

    // Calcula o número de peças que cabem no ambiente
    let numPecasLargura = Math.floor(larguraAmbiente / larguraPeca);
    let numPecasComprimento = Math.floor(comprimentoAmbiente / comprimentoPeca);

    // Define a cor para as peças de cerâmica
    ctx.fillStyle = '#7fc8f8'; // Cor das peças

    // Desenha as peças no canvas
    for (let i = 0; i < numPecasLargura; i++) {
        for (let j = 0; j < numPecasComprimento; j++) {
            let x = i * larguraPeca * escala;
            let y = j * comprimentoPeca * escala;
            ctx.fillRect(x, y, larguraPeca * escala, comprimentoPeca * escala);
        }
    }

    // Verificar se há peças incompletas nas bordas
    let sobraLargura = larguraAmbiente % larguraPeca;
    let sobraComprimento = comprimentoAmbiente % comprimentoPeca;

    // Desenhar peças incompletas na largura, se houver
    if (sobraLargura > 0) {
        for (let j = 0; j < numPecasComprimento; j++) {
            let x = numPecasLargura * larguraPeca * escala;
            let y = j * comprimentoPeca * escala;
            ctx.fillRect(x, y, sobraLargura * escala, comprimentoPeca * escala);
        }
    }

    // Desenhar peças incompletas no comprimento, se houver
    if (sobraComprimento > 0) {
        for (let i = 0; i < numPecasLargura; i++) {
            let x = i * larguraPeca * escala;
            let y = numPecasComprimento * comprimentoPeca * escala;
            ctx.fillRect(x, y, larguraPeca * escala, sobraComprimento * escala);
        }
    }

    // Desenhar peça incompleta no canto, se houver sobra nos dois eixos
    if (sobraLargura > 0 && sobraComprimento > 0) {
        let x = numPecasLargura * larguraPeca * escala;
        let y = numPecasComprimento * comprimentoPeca * escala;
        ctx.fillRect(x, y, sobraLargura * escala, sobraComprimento * escala);
    }
}
