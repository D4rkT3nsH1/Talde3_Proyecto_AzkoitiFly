var sistemaSeleccionado;

function eleccionSistema(sistema, button) {
    var i, tabButtons;

    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    sistemaSeleccionado = sistema;
    console.log(sistemaSeleccionado);

    button.classList.add("active");
}


function calcularPrestamo() {
    // Obtener los valores del formulario
    const monto = parseFloat(document.getElementById("monto").value);
    const plazo = parseInt(document.getElementById("plazo").value);
    const interes = parseFloat(document.getElementById("interes").value);

    // Validar que los valores sean números y estén en el rango adecuado
    if (isNaN(monto) || isNaN(plazo) || isNaN(interes) || monto <= 0 || plazo <= 0 || interes <= 0) {
        toastr.error("Por favor, ingresa valores válidos.");
        return;
    }

    // Calcular las cuotas según el sistema de préstamo seleccionado
    const amortizacion = calcularAmortizacion(sistemaSeleccionado, monto, plazo, interes);

    // Mostrar el resultado en la tabla
    mostrarTablaResultado(sistemaSeleccionado, amortizacion);
}

function calcularAmortizacion(sistema, monto, plazo, interes) {
    // Lógica de cálculo para cada sistema
    switch (sistema) {
        case 'simple':
            return calcularPrestamoSimple(monto, plazo, interes);
        case 'americano':
            return calcularPrestamoAmericano(monto, plazo, interes);
        case 'lineal':
            return calcularPrestamoLineal(monto, plazo, interes);
        case 'frances':
            return calcularPrestamoFrances(monto, plazo, interes);
        case 'cCompleta':
            return calcularPrestamoCarenciaCompleta(monto, plazo, interes);
        case 'cParcial':
            return calcularPrestamoCarenciaParcial(monto, plazo, interes);
        default:
            alert("Sistema no reconocido");
            return [];
    }
}


function calcularPrestamoSimple(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const cuota = monto / plazo;

    let amortizacion = [];
    let saldoPendiente = monto;

    // Fila del año 0 con el costo total del préstamo
    amortizacion.push({
        año: 0,
        saldoRestante: ' - ',
        interes: ' - ',
        pagoAnual: ' - ',
        pagoRestante: monto.toFixed(2)
    });

    for (let año = 1; año <= plazo; año++) {
        const interesAño = saldoPendiente * tasaInteres;
        const pagoAnual = cuota;
        const pagoRestante = saldoPendiente - cuota;

        amortizacion.push({
            año: año,
            saldoRestante: saldoPendiente.toFixed(2),
            interes: interesAño.toFixed(2),
            pagoAnual: pagoAnual.toFixed(2),
            pagoRestante: pagoRestante.toFixed(2)
        });

        saldoPendiente = pagoRestante;
    }

    return amortizacion;
}

function calcularPrestamoAmericano(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const cuota = (monto * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazo));

    let amortizacion = [];
    let saldoPendiente = monto;

    amortizacion.push({
        Aldiak: 0,
        a: ' - ',
        I: ' - ',
        A: ' - ',
        M: ' - ',
        C: saldoPendiente.toFixed(2) + ' € ',
    });

    for (let año = 1; año <= plazo; año++) {
        const interesAño = saldoPendiente * tasaInteres;
        const pagoAnual = cuota;
        const pagoRestante = saldoPendiente - cuota;

        amortizacion.push({
            año: año,
            saldoRestante: saldoPendiente.toFixed(2),
            interes: interesAño.toFixed(2),
            pagoAnual: pagoAnual.toFixed(2),
            pagoRestante: pagoRestante.toFixed(2)
        });

        saldoPendiente = pagoRestante;
    }

    return amortizacion;
}

function calcularPrestamoLineal(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const cuota = monto / plazo;

    let amortizacion = [];
    let saldoPendiente = monto;

    amortizacion.push({
        Aldiak: 0,
        a: ' - ',
        I: ' - ',
        A: ' - ',
        M: ' - ',
        C: saldoPendiente.toFixed(2) + ' € ',
    });

    for (let año = 1; año <= plazo; año++) {
        const interesAño = saldoPendiente * tasaInteres;
        const pagoAnual = cuota + interesAño;
        const pagoRestante = saldoPendiente - cuota;
        const PagosTotal = cuota * año;

        amortizacion.push({
            Aldiak: año,
            a: pagoAnual.toFixed(2) + ' € ',
            I: interesAño.toFixed(2) + ' € ',
            A: cuota.toFixed(2) + ' € ',
            M: PagosTotal.toFixed(2) + ' € ',
            C: saldoPendiente.toFixed(2) + ' € ',
        });

        saldoPendiente = pagoRestante;
    }

    return amortizacion;
}



function calcularPrestamoFrances(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const cuota = (monto * tasaInteres) / (1 - Math.pow(1 + tasaInteres, -plazo));

    let amortizacion = [];
    let saldoPendiente = monto;

    for (let año = 1; año <= plazo; año++) {
        const interesAño = saldoPendiente * tasaInteres;
        const pagoAnual = cuota;
        const pagoRestante = saldoPendiente - cuota;

        amortizacion.push({
            año: año,
            saldoRestante: saldoPendiente.toFixed(2),
            interes: interesAño.toFixed(2),
            pagoAnual: pagoAnual.toFixed(2),
            pagoRestante: pagoRestante.toFixed(2)
        });

        saldoPendiente = pagoRestante;
    }

    return amortizacion;
}

function calcularPrestamoCarenciaCompleta(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const cuota = (monto * tasaInteres) / plazo;

    let amortizacion = [];
    let saldoPendiente = monto;

    for (let año = 1; año <= plazo; año++) {
        const interesAño = saldoPendiente * tasaInteres;
        const pagoAnual = cuota;
        const pagoRestante = saldoPendiente - cuota;

        amortizacion.push({
            año: año,
            saldoRestante: saldoPendiente.toFixed(2),
            interes: interesAño.toFixed(2),
            pagoAnual: pagoAnual.toFixed(2),
            pagoRestante: pagoRestante.toFixed(2)
        });

        saldoPendiente = pagoRestante;
    }

    return amortizacion;
}

function calcularPrestamoCarenciaParcial(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const cuota = (monto * tasaInteres) / plazo + (monto / plazo);

    let amortizacion = [];
    let saldoPendiente = monto;

    for (let año = 1; año <= plazo; año++) {
        const interesAño = saldoPendiente * tasaInteres;
        const pagoAnual = cuota;
        const pagoRestante = saldoPendiente - cuota;

        amortizacion.push({
            año: año,
            saldoRestante: saldoPendiente.toFixed(2),
            interes: interesAño.toFixed(2),
            pagoAnual: pagoAnual.toFixed(2),
            pagoRestante: pagoRestante.toFixed(2)
        });

        saldoPendiente = pagoRestante;
    }

    return amortizacion;
}

function mostrarTablaResultado(sistema, amortizacion) {
    const tablaPrestamo = document.getElementById("tablaPrestamo");

    // Crear la tabla y sus celdas
    const tabla = document.createElement("table");

    // Encabezado
    const filaEncabezado = tabla.insertRow(0);
    Object.keys(amortizacion[0]).forEach((clave) => {
        const celdaEncabezado = filaEncabezado.insertCell();
        celdaEncabezado.textContent = clave;
    });

    // Datos
    amortizacion.forEach((filaAmortizacion) => {
        const fila = tabla.insertRow();
        Object.values(filaAmortizacion).forEach((valor) => {
            const celda = fila.insertCell();
            celda.textContent = valor;
        });
    });

    // Limpiar la tabla anterior (si la hay) y agregar la nueva tabla
    tablaPrestamo.innerHTML = "";
    tablaPrestamo.appendChild(tabla);
}