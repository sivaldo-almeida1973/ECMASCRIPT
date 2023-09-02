class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

}

function cadastrarDespesa() {
     //recuperar valores dos campos document.get
     //criar variaveis para fazer referencia as seleçoes
      let ano = document.getElementById('ano')
      let mes = document.getElementById('mes')
      let dia = document.getElementById('dia')
      let tipo = document.getElementById('tipo')
      let descricao = document.getElementById('descricao')
      let valor = document.getElementById('valor')

      //criar uma variavel despesa e atribuir um instancia do objeto Despesa
      let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
      ) 
     console.log(despesa)

}