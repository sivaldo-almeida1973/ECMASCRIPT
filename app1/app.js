class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descricao
    this.valor = valor
  }

  validarDados() {
    for(let i in this) {
      if(this[i] == undefined || this[i] == '' || this[i] == null) {
        return false
      }
    }
    return true

  }

}

class Bd {

  constructor() {
    let id = localStorage.getItem('id')

    if(id === null) {
      localStorage.setItem('id', 0)
    }


  }
  getProximoId() {
    let proximoId = localStorage.getItem('id')  //null
    return parseInt(proximoId ) + 1


  }

  gravar(d) {
     let id = this.getProximoId()

     localStorage.setItem(id, JSON.stringify(d))

     localStorage.setItem('id', id)
    
  }
}

let bd = new Bd()

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





    if( despesa.validarDados()){
      //chamar uma nova funcao com o nome de gravar()
     // bd.gravar(despesa)
      //dialog de sucesso
      console.log('dados válidos')

    }else{
      //dialog de erro
      console.log('dados inválidos')

    }

}
