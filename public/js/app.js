const month = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
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



//Variables and Event Listeners
const novoGasto = document.querySelector('[name=valor]');
const mesAtual = document.querySelector('[name=mes]');
novoGasto.addEventListener('change',getMoth);

const gastosValor = [...document.querySelectorAll('tr td.cell:first-child')];
gastosValor.forEach(valor => valor.textContent = parseFloat(valor.textContent).toFixed(2)); //formata
const gastoTotal = gastosValor.reduce((acc, el) => acc + parseFloat(el.textContent), 0);
const gastoMes = {
    total: gastoTotal,
    disponivel: 1200 - gastoTotal
}
document.querySelector('#gasto-total').textContent = gastoMes.total;
document.querySelector('#gasto-disponivel').textContent = gastoMes.disponivel;