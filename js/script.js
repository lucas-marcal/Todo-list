const btnsub = document.getElementById('sub');
const texto = document.getElementById('texto');
const lista = document.getElementById('lista');



let DataBase = [{'tarefa': 'escovar os dentes', 'status':''}]

const getDB = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setDB = (DataBase) => localStorage.setItem('todoList', JSON.stringify(DataBase));

function adicionar(tarefa, status, index){
    let newLi = document.createElement('li');
    newLi.innerHTML = `<input type="checkbox" id="${tarefa}" name="${tarefa}" class="checkbox" data-index="${index}" ${status}>
    <label for="${tarefa}">${tarefa}</label> <input type="button" value="X" class="btn-delete" data-index=${index}>`
    lista.appendChild(newLi);
}

const criartarefa = () => {
    const DataBase = getDB();
    DataBase.push({'tarefa': texto.value , 'status': ''});
    setDB(DataBase);
    texto.value = '';
    renderScreen();
}

btnsub.addEventListener('click', criartarefa);
texto.addEventListener('keypress', function(evento){
    if (evento.key === 'Enter') {
        evento.preventDefault();
        criartarefa();}
    });

const limpar = () => {
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}

const renderScreen = () => {
    limpar();
    const DataBase = getDB();
    DataBase.forEach ( (item, index) => adicionar (item.tarefa, item.status, index))
}

const removeItem = (index) => {
    const DataBase = getDB();
    DataBase.splice (index, 1);
    setDB(DataBase);
    renderScreen();
}

const updateItem = (indice) => {
    const DataBase = getDB();
    DataBase[indice].status = DataBase[indice].status === '' ? 'checked' : '';
    setDB(DataBase);
    renderScreen();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button'){
        const index = elemento.dataset.index;
        removeItem(index);
    } else if (elemento.type === 'checkbox'){
        const index = elemento.dataset.index;
        updateItem(index);
    }
}

lista.addEventListener('click', clickItem);


renderScreen()