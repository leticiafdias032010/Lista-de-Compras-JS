let listaDeItens = [];
let itemAEditar

//Estou chamando os elementos html que seram usados e os transformndo em variaveis:
const form = document.getElementById("form-itens");
const itensInput = document.getElementById("receber-item");
const ulItens = document.getElementById("lista-de-itens");
const ulItensComprados = document.getElementById("itens-comprados");
const listaRecuperada = localStorage.getItem('listaDeItens');
//diz que listaRecuperada é o item que esta em localStorage como arquivo JSON identificado como 'listaDeItens'.


function atualizaLocalStorage() {
    localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
    //Armazeno os itens da listaDeItens em um arquivo JSON as transformando em string.
}

// (valores omitidos, 0, null, NaN, undefined, "", false) << retornam false

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada);
    mostrarItem()
    //diz que se lista recuperada for ativada, lista de itens que foi mudada para json e
    //amarzenada no storage, seja transformada em objeto de novo e seja mostrada atravez da 
    //função mostrarItem().
} else {
    listaDeItens = []
}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    salvarItem()
    mostrarItem()
    itensInput.focus()
}//Ativa as functions, e diz que elas seram ativadas a partir do botão que tem o tipo "submit".
)

function salvarItem() {
    const comprasItem = itensInput.value;//Diz que comprasItem é igual ao valor que foi inserido em itensInput.
    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());
    //Checa se o elemento na sua forma de letra maiuscula que esta se tentando adicionar já não foi adicionado
    //tambem em sua forma de letra maiuscula, para caso antes tenha sido colocado em letra maiuscula e agora minuscula
    //não sejam identificados como elementos diferentes.

    if(checarDuplicado) {  //Diz que se o elemento que se deseja adicionar ja exista, 
        alert("Este item ja existe!"); //retornara o devido alerta.
    } else {                //Se não, sera adicionado o objeto com os valores inseridos:
        listaDeItens.push({
        valor: comprasItem, //indica que o valor sera o item inserido em compras item que é itensInput.
        checar: false, //Indica ao checkbox comece com o valor false, desacionado.
        })
    }
    itensInput.value = ''
    //Caso nada esteja sendo executado, isto é para apos adicionar um objeto a caixa de texto resete.
};

function mostrarItem() {
    ulItens.innerHTML = ''

    listaDeItens.forEach((elemento, index) => {
    //if Diz que se elemento adicionado estiver acionado true atravez do checar deve ir a lista de comprados,
    //else diz que se estiver acionado false deve ficar em ulItens a lista normal, mas se for acionado true atravez 
    //do checkbox checar,sai da lista atual e vai para a lista comprados o oposto vale para os itens da lista de comprados.
        if (elemento.checar){ 
            ulItensComprados.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${elemento.valor}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
                `
        } else {
            ulItens.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" class="is-clickable" />
                        <input type="text" class="is-size-5" value="${elemento.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
                    </div>
                    <div>
                       ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i>' : '</button><i class="fa-regular is-clickable fa-pen-to-square editar"></i>' }
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li> 
                `
            }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]');
    // Chama as propriedades desejadas a partir da variavel.

    inputsCheck.forEach(i => {  
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens[valorDoElemento].checar = evento.target.checked
            mostrarItem()
            console.log(listaDeItens[valorDoElemento].checar)
        }) //Diz que o evento de click da variavel inputsCheck, faz mudar o seu valor de false para true,
        // E mostra no console o valor atual apos o click, e indica que o valor desejado que é esse que sera 
        //mostrado no console é aquele dentro do elemento que esta sofrendo do evento de click e depois indica 
        //onde este elemento esta mais especificamente com a getAttribute('data-value), assim indicando que 
        // o valor indicado é o valor da variavel valorDoElemento, e exibe o valor apos click no console.
    })

    const deletarObjetos = document.querySelectorAll(".deletar")

    deletarObjetos.forEach(i => {  
        i.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value')
            listaDeItens.splice(valorDoElemento,1)
            mostrarItem()
        }) 
        //Aqui digo que caso aja o evento de clique no icone deletarObjetos, o objeto do indice
        // deste icone sera removido, atravez do metodo splice.
    })

    const editarItens = document.querySelectorAll('.editar');

    editarItens.forEach(i => {  
        i.addEventListener('click', (evento) => {
            itemAEditar = evento.target.parentElement.parentElement.getAttribute('data-value')
            mostrarItem()
            console.log(itemAEditar)
        })
        //Aqui diz que caso aja o evento de click, no icone que corresponde a editarItens,
        //o itemAEditar é o objeto do indice que este icone foi clicado.
    })
     
    atualizaLocalStorage()
}

function salvarEdicao() {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    console.log(itemEditado.value)
    listaDeItens[itemAEditar].valor = itemEditado.value
    console.log(listaDeItens)
    itemAEditar = -1
    mostrarItem()
}
