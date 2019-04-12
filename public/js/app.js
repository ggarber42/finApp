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

//EVENT LISTENERS
const novoGasto = document.querySelector('[name=valor]');
novoGasto.addEventListener('change',getMoth);
const mesAtual = document.querySelector('[name=mes]');