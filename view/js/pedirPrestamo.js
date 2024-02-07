// JavaScript para actualizar el valor seleccionado en tiempo real

var montoInsert, plazo;
$("#mensajeInteres").hide();

function updateValue(value) {
    document.getElementById('rango').value = value;
    document.getElementById('euros').textContent = value + '€';
}
document.getElementById('menos').addEventListener('click', function () {
    var rangeValue = parseInt(document.getElementById('rango').value);
    if (rangeValue > 250) {
        updateValue(rangeValue - 250);
    }
});

document.getElementById('mas').addEventListener('click', function () {
    var rangeValue = parseInt(document.getElementById('rango').value);
    if (rangeValue < 50000) {
        updateValue(rangeValue + 250);
    }
});

document.getElementById('rango').addEventListener('input', function () {
    var rangeValue = parseInt(document.getElementById('rango').value);
    updateValue(rangeValue);
});


function updateValue2(value) {
    document.getElementById('rango2').value = value;
    document.getElementById('años').textContent = value;
}

document.getElementById('menos2').addEventListener('click', function () {
    var rangeValue2 = parseInt(document.getElementById('rango2').value);
    if (rangeValue2 > 1) {
        updateValue2(rangeValue2 - 1);
    }
});

document.getElementById('mas2').addEventListener('click', function () {
    var rangeValue2 = parseInt(document.getElementById('rango2').value);
    if (rangeValue2 < 4) {
        updateValue2(rangeValue2 + 1);
    }
});

document.getElementById('rango2').addEventListener('input', function () {
    var rangeValue2 = parseInt(document.getElementById('rango2').value);
    updateValue2(rangeValue2);
});

function updateValue3(monto, plazo) {
    $("#mensajeInteres").show();
    montoInteres = monto * 1.1 ** plazo;
    document.getElementById('total').textContent = montoInteres.toFixed(2);
}

document.getElementById('prestamoForm').addEventListener('input', function () {
    var monto = parseInt(document.getElementById('rango').value);
    plazo = parseInt(document.getElementById('rango2').value);
    updateValue3(monto, plazo);
});

function insertarPrestamo() {

    var jsonData = {
        "monto_json": montoInteres,
        "plazo_json": plazo
    };

    $.ajax({
        type: "POST",
        url: "../../controller/cInsertPrestamo.php",
        data: JSON.stringify(jsonData),
        contentType: "application/json",
        success: function (response) {
            try {
                response = JSON.parse(response);
                if (response.success) {
                    // Si la operación fue exitosa, muestra un toast de éxito
                    toastr.success(response.message);
                    $("#rango").val("");
                    $("#rango2").val("");
                } else {
                    // Si la operación falló, muestra un toast de error
                    toastr.error(response.message);
                }
            } catch (e) {
                console.error("Error al analizar la respuesta JSON:", e);
                toastr.error("Error en la respuesta del servidor.");
            }
        },
        error: function (textStatus, errorThrown) {
            alert("Error en la solicitud: " + textStatus + " - " + errorThrown);
        }
    });
}