//RELÓGIO
const hours = document.querySelector("#horas");
const minutes = document.querySelector("#minutos");
const seconds = document.querySelector("#segundos");

const relogio = setInterval(function time() {
    let data = new Date();
    let hora = data.getHours();
    let minuto = data.getMinutes();
    let segundo = data.getSeconds();

    if (hora < 10) {
        hora = '0' + hora;
    }
    if (minuto < 10) {
        minuto = '0' + minuto;
    }
    if (segundo < 10) {
        segundo = '0' + segundo;
    }

    hours.textContent = hora;
    minutes.textContent = minuto;
    seconds.textContent = segundo;
})

//LISTA
let banco = []

const getBanco = () => JSON.parse(localStorage.getItem('listaTarefa')) ?? []
const setBanco = (banco) => localStorage.setItem('listaTarefa', JSON.stringify(banco))

//cria item
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')

    item.classList.add('toda-tarefa')
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.querySelector('#listaTarefa').appendChild(item)
}

//limpa itens
const limparItens = () => {
    const todaLista = document.querySelector('#listaTarefa')

    while (todaLista.firstChild) {todaLista.removeChild(todaLista.lastChild) }
}

//atualiza tela
const limpaTela = () => {
    limparItens()
    const banco = getBanco()
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice))
}

//adiciona item
const adicionarItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value

    if (tecla === 'Enter') {
        const banco = getBanco()
        banco.push ({'tarefa': texto, 'status': ''})
        setBanco(banco)

        limpaTela()
    
        evento.target.value = ''
    }
}

//remove item
const removerItem = (indice) => {
    const banco = getBanco()

    banco.splice (indice, 1)
    setBanco(banco)

    limpaTela()

}

//atualiza item
const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    limpaTela()
}

//clica na tarefa
const clickItem = (evento) => {
    const elemento = evento.target

    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice
        removerItem (indice)
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice
        atualizarItem (indice)
    }
}

document.getElementById('novaTarefa').addEventListener('keypress', adicionarItem)
document.getElementById('listaTarefa').addEventListener('click', clickItem)

limpaTela()