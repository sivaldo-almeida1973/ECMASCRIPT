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
  //criar metodo recuperarTodosRegistros()*************
  recuperarTodosRegistros() {

    //criar uma variavel que vai conter o array de despesas
    let despesas = Array()

    let id = localStorage.getItem('id')

  //recuperer todas as despesas cadastradas em localStorage
    for(let i = 1; i <= id; i++) {

      //recuperar a despesa
      let despesa = JSON.parse(localStorage.getItem(i))

      //existe a possibilidade de haver índices que foram pulados/removidos 
      //nestes casos nós vamos pular esses índices
      if(despesa === null) {
        continue
      }
      despesa.id = i
      despesas.push(despesa)

    }

    return despesas

  }
  //aplicando filtro
  //criar metodo pesquisar
  //recebe por parametro despesa
  pesquisar(despesa) {

    let despesasFiltradas = Array()

    despesasFiltradas = this.recuperarTodosRegistros()

    console.log(despesa)

    console.log(despesasFiltradas)

  //ano
  if(despesa.ano != '') {
    console.log('filtro de ano')
    despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
  }
  //mes
  if(despesa.mes != '') {
    console.log('filtro de mes')
    despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
  }
  //dia
  if(despesa.dia != '') {
    console.log('filtro de dia')
    despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
  }
  //tipo
  if(despesa.tipo != '') {
    console.log('filtro de tipo')
    despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
  }
  //descricao
  if(despesa.descricao != '') {
    console.log('filtro de descricao')
    despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
  }
  //valor
  if(despesa.valor != '') {
    console.log('filtro de valor')
    despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
  }
   
   
  return despesasFiltradas
  }

  remover(id) {
    localStorage.removeItem(id)
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
      bd.gravar(despesa)

      document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
      document.getElementById('modal_titulo_div').className = ' modal-header text-success'
      document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
      document.getElementById('modal_btn').innerHTML = 'Voltar'
      document.getElementById('modal_btn').className = 'btn btn-success'
     
      //dialog de sucesso
      $('#modalRegistraDespesa').modal('show')


      //limpar valores de cadastro , para digitar novos valores
      ano.value = ''
      mes.value = ''
      dia.value = ''
      tipo.value = ''
      descricao.value = ''
      valor.value = ''






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

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros()

    }

    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
  

 // var listaDespesas = document.getElementById('listaDespesas')

  /*
   <tr>
    <td>15/03/2019</td>
    <td>Alimentação</td>
    <td>Compras do mês</td>
    <td>444.45</td>
  </tr> 

  */

//percorrer o array despesas, listando cada despesa de forma dinâmica
  despesas.forEach(function(d) {
   
    console.log(d)
    //criando a linha (tr)
    let linha = listaDespesas.insertRow()

    //criar as colunas (td)
    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
   

    //ajustar o tipo
    switch(d.tipo) {
        case '1': d.tipo = 'Alimentação'
            break
        case '2': d.tipo = 'Educação'
            break
        case '3': d.tipo = 'Lazer'
            break
        case '4': d.tipo = 'Saúde'
            break
        case '5': d.tipo = 'Transporte'
            break
    }

    linha.insertCell(1).innerHTML = d.tipo

    linha.insertCell(2).innerHTML = d.descricao
    linha.insertCell(3).innerHTML = d.valor

    //criar botão de exclusão
    let btn = document.createElement('button')
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"></i>'
    btn.id = `id_despesa_${d.id}`
    btn.onclick = function() {
      //remover a despesa
        let id = this.id.replace('id_despesa_', '')

        //alert(id)

        bd.remover(id)

        //atualiza a pagina apos excluir item
        window.location.reload()
    
    }
    linha.insertCell(4).append(btn)

    console.log(d)


  })

}

//criar funcao pesquisarDespesa()
//ligado a consulta no click sobre o button pesquisar

function pesquisarDespesa() {
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  //criar variavel despesa, e atribui uma nova despesa a ela

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

  let despesas = bd.pesquisar(despesa)

  this.carregaListaDespesas(despesas, true)

  
  
}
