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
      document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
      document.getElementById('modal_titulo_div').className = ' modal-header text-success'
      document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
      document.getElementById('modal_btn').innerHTML = 'Voltar'
      document.getElementById('modal_btn').className = 'btn btn-success'
     
      //dialog de sucesso
      $('#modalRegistraDespesa').modal('show')

    }else{
      //dialog de erro
      document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro!'
      document.getElementById('modal_titulo_div').innerHTML = ' modal-header text-danger'
      document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
      document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
      document.getElementById('modal_btn').className = 'btn btn-danger'
      
      $('#modalRegistraDespesa').modal('show')

    }

}