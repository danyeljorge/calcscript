/*SELEÇÃO DOS ELEMENTOS*/
const calculo = document.querySelector("#calculo");
const resultado = document.querySelector("#resultado");
const botoes = document.querySelectorAll("#botoes-conteiner button");

/*ORIENTAÇÃO A OBJETOS - LOGICA DE APLICAÇÃO DA CALCULADORA */
class Calculadora {
  constructor(calculo, resultado) {
    (this.calculo = calculo),
      (this.resultado = resultado),
      (this.operacao = "");
  }

  //DIGITANDO NUMERO DO VISOR DA CALCULADORA
  addNumero(digito) {
    //CHECANDO SE APERAÇÃO JÁ TEM UM PONTO
    if (digito === "." && this.calculo.innerText.includes(".")) {
      return;
    }

    this.operacao = digito;
    this.atulizandoTela();
  }

  //PROCESSAR TODAS AS OPERAÇÕES DA CALCULADORA
  processarOperacoes(operacoes) {
    //CHECAR SE O CALCULO ESTA VAZIO
    if (this.calculo.innerText === "" && operacoes !== "C") {
      //MUDANÇA DE OPERAÇÃO
      if (this.resultado.innerText !== "") {
        this.mudarOperacao(operacoes);
      }
      return;
    }

    // PERGAR O VALOR ATUAL E VALOR ANTERIOR
    let operacaovalor;
    let resultado = +this.resultado.innerText.split(" ")[0];
    let calculo = +this.calculo.innerText;

    switch (operacoes) {
      case "+":
        operacaovalor = resultado + calculo;
        this.atulizandoTela(operacaovalor, operacoes, resultado, calculo);
        break;
      case "-":
        operacaovalor = resultado - calculo;
        this.atulizandoTela(operacaovalor, operacoes, resultado, calculo);
        break;
      case "x":
        operacaovalor = resultado * calculo;
        this.atulizandoTela(operacaovalor, operacoes, resultado, calculo);
        break;
      case "/":
        operacaovalor = resultado / calculo;
        this.atulizandoTela(operacaovalor, operacoes, resultado, calculo);
        break;
      case "DEL":
        this.processarDelete();
        break;
      case "CE":
        this.limparCalculo();
        break;
      case "C":
        this.limparTudo();
        break;
      case "=":
        this.resultadoDaOperacao();
        break;
      default:
        return;
    }
  }

  // ALTERAR VALORES DA TELA DA CALCULADORA
  atulizandoTela(
    operacaovalor = null,
    operacoes = null,
    resultado = null,
    calculo = null
  ) {
    if (operacaovalor === null) {
      this.calculo.innerText += this.operacao;
    } else {
      // CHECAR SE O VALOR É ZERO, SE FOR APENAS AGREGAR VALOR ATUAL
      if (resultado === 0) {
        operacaovalor = calculo;
      }

      // ADICIONAR O VALOR DE CALCULO NO RESULTADO
      this.resultado.innerText = `${operacaovalor} ${operacoes}`;
      this.calculo.innerText = "";
    }
  }

  // MUDANÇA DE OPERAÇÕES MATEMATICAS
  mudarOperacao(operacoes) {
    let operacoesMatematicas = ["x", "/", "+", "-"];
    if (!operacoesMatematicas.includes(operacoes)) {
      return;
    }

    this.resultado.innerText =
      this.resultado.innerText.slice(0, -1) + operacoes;
  }

  // DELETANDO O ULTIMO DIGITO
  processarDelete() {
    this.calculo.innerText = this.calculo.innerText.slice(0, -1);
  }

  //LIMPAR O VISOR DE CALCULO DIGITADO
  limparCalculo() {
    this.calculo.innerText = "";
  }

  // LIMPANDO TODA A CALCULADORA
  limparTudo() {
    this.calculo.innerText = "";
    this.resultado.innerText = "";
  }

  // RESULTADO DA OPERAÇÃO COM O '='
  resultadoDaOperacao() {
    const operacao = resultado.innerText.split(" ")[1];
    this.processarOperacoes(operacao);
  }
}

let calc = new Calculadora(calculo, resultado);

/* OS EVENTOS PARA CASA CLICK */
botoes.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let valor = e.target.textContent;

    if (+valor >= 0 || valor === ".") {
      calc.addNumero(valor);
    } else {
      calc.processarOperacoes(valor);
    }
  });
});
