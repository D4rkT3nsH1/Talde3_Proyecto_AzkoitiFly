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

// FUNCIONA
function calcularPrestamoSimple(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const cuota = monto / plazo;

    let amortizacion = [];

    // Fila del año 0 con el costo total del préstamo
    amortizacion.push({
        Aldiak: 0,
        a: ' - ',
        I: ' - ',
        A: ' - ',
        M: ' - ',
        C: monto.toFixed(2) + ' € ',
    });

    for (let año = 1; año <= plazo; año++) {
        if (año != plazo) {
            amortizacion.push({
                Aldiak: año,
                a: ' - ',
                I: ' - ',
                A: ' - ',
                M: ' - ',
                C: monto.toFixed(2) + ' € ',
            });
        } else {
            const pagoAnual = monto * (1 + tasaInteres) ** año;
            const interesAño = pagoAnual - monto;
            amortizacion.push({
                Aldiak: año,
                a: pagoAnual.toFixed(2) + ' € ',
                I: interesAño.toFixed(2) + ' € ',
                A: monto.toFixed(2) + ' € ',
                M: monto.toFixed(2) + ' € ',
                C: ' - ',
            });
        }
    }

    return amortizacion;
}

// DIGAMOS QUE FUNCIONA
function calcularPrestamoAmericano(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const interesAño = monto * tasaInteres;

    let amortizacion = [];
    // Fila del año 0 con el costo total del préstamo
    amortizacion.push({
        Aldiak: 0,
        a: ' - ',
        I: ' - ',
        A: ' - ',
        M: ' - ',
        C: monto.toFixed(2) + ' € ',
    });

    for (let año = 1; año <= plazo; año++) {
        if (año > 0 && año != plazo) {
            amortizacion.push({
                Aldiak: año,
                a: interesAño.toFixed(2) + ' € ',
                I: interesAño.toFixed(2) + ' € ',
                A: ' - ',
                M: ' - ',
                C: monto.toFixed(2) + ' € ',
            });
        } else {
            const pagoAnual = monto + interesAño;
            amortizacion.push({
                Aldiak: año,
                a: pagoAnual.toFixed(2) + ' € ',
                I: interesAño.toFixed(2) + ' € ',
                A: monto.toFixed(2) + ' € ',
                M: monto.toFixed(2) + ' € ',
                C: ' - ',
            });
        }
    }

    return amortizacion;
}

// FUNCIONA
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
            C: pagoRestante.toFixed(2) + ' € ',
        });

        saldoPendiente = pagoRestante;
    }

    return amortizacion;
}

function calcularPrestamoFrances(monto, plazo, interes) {
    const tasaInteres = interes / 100;
    const cuotaAnual = monto * tasaInteres / (1 - Math.pow(1 + tasaInteres, -plazo));

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
        const interesAnual = saldoPendiente * tasaInteres;
        const amortizacionAnual = cuotaAnual - interesAnual;
        const saldoRestante = saldoPendiente - amortizacionAnual;

        amortizacion.push({
            Aldiak: año,
            a: cuotaAnual.toFixed(2) + ' € ',
            I: interesAnual.toFixed(2) + ' € ',
            A: amortizacionAnual.toFixed(2) + ' € ',
            M: (cuotaAnual * año).toFixed(2) + ' € ',
            C: saldoRestante.toFixed(2) + ' € ',
        });

        saldoPendiente = saldoRestante;
    }

    return amortizacion;
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
