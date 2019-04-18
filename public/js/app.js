//FUNCTIONS
function edit(el){
    const tdId = el.parentNode.parentNode.dataset.id;    
    const updateForm = document.querySelector('#update-form');
    updateForm.setAttribute('action',`/update/${tdId}`);
    const updateFormInputs = document.querySelectorAll('#update-form input');
    const tableRow = Array.from(el.parentNode.parentNode.childNodes);
    const rowValues = tableRow                    
                        .filter(node => node.className === "cell")
                        .map(tableCells => tableCells.textContent );    
    updateFormInputs.forEach((cell, index) => cell.value = rowValues[index]);
}

function deleteEl (el){
    const tdId = el.parentNode.parentNode.dataset.id;
    window.location.href = `/delete/${tdId}`;
}

function getMoth() {
    const d = new Date();
    mesAtual.value = month[d.getMonth()];
}



//CONSTS
const month = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const novoGasto = document.querySelector('[name=valor]');
const mesAtual = document.querySelector('[name=mes]');
const mesGasto = document.querySelectorAll('tr td.cell:nth-child(2)');
const gastosValor = [...document.querySelectorAll('tr td.cell:first-child')];
const gastoTotal = gastosValor.reduce((acc, el) => acc + parseFloat(el.textContent), 0);
const gastoMes = {
    total: gastoTotal.toFixed(2),
    disponivel: (1200 - gastoTotal).toFixed(2)
}

novoGasto.addEventListener('change',getMoth); //completa mes no input
gastosValor.forEach(valor => valor.textContent = parseFloat(valor.textContent).toFixed(2)); // formata em duas casa decimais os gastos
mesGasto.forEach(mes => mes.textContent !== month[new Date().getMonth()]? mes.parentElement.style.display = 'none': null); // se não é do mês não carrega
//preenche campos
document.querySelector('#gasto-total').textContent = gastoMes.total; 
document.querySelector('#gasto-disponivel').textContent = gastoMes.disponivel;