// JavaScript para actualizar el valor seleccionado en tiempo real
function updateValue(value) {
    document.getElementById('rango').value = value;
    document.getElementById('euros').textContent = value + '€';
}

document.getElementById('menos').addEventListener('click', function() {
    var rangeValue = parseInt(document.getElementById('rango').value);
    if (rangeValue > 250) {
        updateValue(rangeValue - 250);
    }
});

document.getElementById('mas').addEventListener('click', function() {
    var rangeValue = parseInt(document.getElementById('rango').value);
    if (rangeValue < 50000) {
        updateValue(rangeValue + 250);
    }
});

document.getElementById('rango').addEventListener('input', function() {
    var rangeValue = parseInt(document.getElementById('rango').value);
    updateValue(rangeValue);
});


// -----

function updateValue2(value) {
    document.getElementById('rango2').value = value;
    document.getElementById('años').textContent = value;
}

document.getElementById('menos2').addEventListener('click', function() {
    var rangeValue2 = parseInt(document.getElementById('rango2').value);
    if (rangeValue2 > 1) {
        updateValue2(rangeValue2 - 1);
    }
});

document.getElementById('mas2').addEventListener('click', function() {
    var rangeValue2 = parseInt(document.getElementById('rango2').value);
    if (rangeValue2 < 4) {
        updateValue2(rangeValue2 + 1);
    }
});

document.getElementById('rango2').addEventListener('input', function() {
    var rangeValue2 = parseInt(document.getElementById('rango2').value);
    updateValue2(rangeValue2);
});

var años = document.getElementById("rango2");
var cant = document.getElementById("rango");
var boto = document.getElementById("boton");
boto.addEventListener("click", function insertarPrestamo($cant, $años){
    
});