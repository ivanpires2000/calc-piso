function calcular() {
    // Obtém os valores dos campos
    let larguraAmbiente = parseFloat(document.getElementById('larguraAmbiente').value);
    let comprimentoAmbiente = parseFloat(document.getElementById('comprimentoAmbiente').value);
    let larguraPeca = parseFloat(document.getElementById('larguraPeca').value);
    let comprimentoPeca = parseFloat(document.getElementById('comprimentoPeca').value);

    if (!larguraAmbiente || !comprimentoAmbiente || !larguraPeca || !comprimentoPeca) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Calcula a área do ambiente e das peças
    let areaAmbiente = larguraAmbiente * comprimentoAmbiente;
    let areaPeca = larguraPeca * comprimentoPeca;
    let numPecas = Math.ceil(areaAmbiente / areaPeca);

    // Exibe o resultado no parágrafo
    document.getElementById('resultado').innerText = `Você precisará de aproximadamente ${numPecas} peças.`;

    // Gera a visualização da paginação no Canvas
    desenharPaginacao(larguraAmbiente, comprimentoAmbiente, larguraPeca, comprimentoPeca);
}

function desenharPaginacao(larguraAmbiente, comprimentoAmbiente, larguraPeca, comprimentoPeca) {
    // Obter o elemento canvas e o contexto de desenho
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Definir a escala para ajustar o tamanho do ambiente ao canvas
    let escala = Math.min(canvas.width / larguraAmbiente, canvas.height / comprimentoAmbiente);

    // Calcula quantas peças cabem no ambiente
    let numPecasLargura = Math.floor(larguraAmbiente / larguraPeca);
    let numPecasComprimento = Math.floor(comprimentoAmbiente / comprimentoPeca);

    // Desenha as peças no canvas
    ctx.fillStyle = '#d3d3d3'; // Cor das peças
    for (let i = 0; i < numPecasLargura; i++) {
        for (let j = 0; j < numPecasComprimento; j++) {
            let x = i * larguraPeca * escala;
            let y = j * comprimentoPeca * escala;
            ctx.fillRect(x, y, larguraPeca * escala, comprimentoPeca * escala);
        }
    }
}
