var sistemaSeleccionado;

function eleccionSistema(sistema, button) {
    var i, tabButtons;

    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("activado");
    }

    sistemaSeleccionado = sistema;
    console.log(sistemaSeleccionado);

    if (sistemaSeleccionado == "cCompleta" || sistemaSeleccionado == "cParcial") {
        $(".periodo").show();
        $("#periodosCarencia").attr("required", true);
    } else {
        $(".periodo").hide();
        $("#periodosCarencia").removeAttr("required");
    }

    button.classList.add("activado");
}

function mostrarTablaResultado(amortizacion) {
    $("#tablaPrestamo").show();

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

function ocultarTablaResultado() {
    $("#tablaPrestamo").hide();
}

function calcularPrestamo() {
    // Obtener los valores del formulario
    const monto = parseFloat(document.getElementById("monto").value);
    const plazo = parseInt(document.getElementById("plazo").value);
    const interes = parseFloat(document.getElementById("interes").value);
    const periodosCarencia = parseInt(document.getElementById("periodosCarencia").value);

    // Validar que los valores sean números y estén en el rango adecuado, diferenciando si es un préstamo con carencia o no
    if (sistemaSeleccionado == "cCompleta" || sistemaSeleccionado == "cParcial") {
        if (isNaN(monto) || isNaN(plazo) || isNaN(interes) || isNaN(periodosCarencia) || monto <= 0 || plazo < 0 || interes <= 0 || periodosCarencia < 0) {
            toastr.error("Por favor, ingresa valores válidos.");
            return;
        }
    } else {
        if (isNaN(monto) || isNaN(plazo) || isNaN(interes) || monto <= 0 || plazo < 0 || interes <= 0) {
            toastr.error("Por favor, ingresa valores válidos.");
            return;
        }
    }

    // Calcular las cuotas según el sistema de préstamo seleccionado
    const amortizacion = calcularAmortizacion(sistemaSeleccionado, monto, plazo, interes, periodosCarencia);

    // Mostrar el resultado en la tabla
    mostrarTablaResultado(amortizacion);
}

// FUNCIONA
function calcularPrestamoSimple(monto, plazo, interes) {
    const tasaInteres = interes / 100;

    let amortizacion = [];

    // Fila del año 0 con el costo total del préstamo
    amortizacion.push({
        Aldiak: 0,
        a: ' - ',
        I: ' - ',
        A: ' - ',
        M: ' - ',
        C: monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
    });

    for (let año = 1; año <= plazo; año++) {
        if (año != plazo) {
            amortizacion.push({
                Aldiak: año,
                a: ' - ',
                I: ' - ',
                A: ' - ',
                M: ' - ',
                C: monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            });
        } else {
            const pagoAnual = monto * (1 + tasaInteres) ** año;
            const interesAño = pagoAnual - monto;
            amortizacion.push({
                Aldiak: año,
                a: pagoAnual.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
                I: interesAño.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
                A: monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
                M: monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
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
        C: monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
    });

    for (let año = 1; año <= plazo; año++) {
        if (año > 0 && año != plazo) {
            amortizacion.push({
                Aldiak: año,
                a: interesAño.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
                I: interesAño.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
                A: ' - ',
                M: ' - ',
                C: monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            });
        } else {
            const pagoAnual = monto + interesAño;
            amortizacion.push({
                Aldiak: año,
                a: pagoAnual.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
                I: interesAño.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
                A: monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
                M: monto.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
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
        C: saldoPendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
    });

    for (let año = 1; año <= plazo; año++) {
        const interesAño = saldoPendiente * tasaInteres;
        const pagoAnual = cuota + interesAño;
        const pagoRestante = saldoPendiente - cuota;
        const PagosTotal = cuota * año;

        amortizacion.push({
            Aldiak: año,
            a: pagoAnual.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            I: interesAño.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            A: cuota.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            M: PagosTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            C: pagoRestante.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
        });

        saldoPendiente = pagoRestante;
    }

    return amortizacion;
}

// FUNCIONA
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
        C: saldoPendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
    });

    for (let año = 1; año <= plazo; año++) {
        const interesAnual = saldoPendiente * tasaInteres;
        const amortizacionAnual = cuotaAnual - interesAnual;
        const saldoRestante = saldoPendiente - amortizacionAnual;

        amortizacion.push({
            Aldiak: año,
            a: cuotaAnual.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            I: interesAnual.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            A: amortizacionAnual.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            M: (cuotaAnual * año).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            C: saldoRestante.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
        });

        saldoPendiente = saldoRestante;
    }

    return amortizacion;
}

// FUNCIONA
function calcularPrestamoCarenciaCompleta(monto, plazo, interes, periodosCarencia) {
    const tasaInteres = interes / 100;
    let saldoPendiente = monto;

    let amortizacion = [];

    amortizacion.push({
        Aldiak: 0,
        a: ' - ',
        I: ' - ',
        A: ' - ',
        M: ' - ',
        C: saldoPendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
    });

    for (let año = 1; año <= periodosCarencia; año++) {
        saldoPendiente = monto * (1 + tasaInteres) ** año;
        amortizacion.push({
            Aldiak: año,
            a: ' - ',
            I: ' - ',
            A: ' - ',
            M: ' - ',
            C: saldoPendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
        });
    }

    let M = 0;
    for (let año = periodosCarencia + 1; año <= plazo + periodosCarencia; año++) {
        let cuotaAnual = monto / (((1 - ((1 + tasaInteres) ** -plazo)) / tasaInteres) * (1 + tasaInteres) ** -periodosCarencia);
        let I = saldoPendiente * tasaInteres;
        let A = cuotaAnual - I;
        M = M + A;
        saldoPendiente -= A;
        amortizacion.push({
            Aldiak: año,
            a: cuotaAnual.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            I: I.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            A: A.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            M: M.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            C: saldoPendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
        });

    }

    return amortizacion;
}

// FUNCIONA
function calcularPrestamoCarenciaParcial(monto, plazo, interes, periodosCarencia) {
    const tasaInteres = interes / 100;
    let saldoPendiente = monto;

    let amortizacion = [];
    amortizacion.push({
        Aldiak: 0,
        a: ' - ',
        I: ' - ',
        A: ' - ',
        M: ' - ',
        C: saldoPendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
    });
    for (let año = 1; año <= periodosCarencia; año++) {
        const cuotaAnual = saldoPendiente * (1 + tasaInteres) ** periodosCarencia;

        amortizacion.push({
            Aldiak: año,
            a: (saldoPendiente * tasaInteres).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            I: (saldoPendiente * tasaInteres).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            A: ' - ',
            M: ' - ',
            C: saldoPendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
        });

    }
    let A = 0;
    let a = 0;
    let I = 0;
    let C = 0;
    let M = 0;
    for (let año = periodosCarencia + 1; año <= plazo + periodosCarencia; año++) {
        //=B2/((1-((1+B4)^-B3))/B4)
        let cuotaAnual = monto / (((1 - ((1 + tasaInteres) ** -plazo)) / tasaInteres));
        C = monto;
        I = saldoPendiente * tasaInteres;
        A = cuotaAnual - I;
        a = I + A;
        M = M + A;
        saldoPendiente -= A;
        amortizacion.push({
            Aldiak: año,
            a: cuotaAnual.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            I: I.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            A: A.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            M: M.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
            C: saldoPendiente.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' € ',
        });

    }


    return amortizacion;
}

function calcularAmortizacion(sistema, monto, plazo, interes, periodosCarencia) {
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
            return calcularPrestamoCarenciaCompleta(monto, plazo, interes, periodosCarencia);
        case 'cParcial':
            return calcularPrestamoCarenciaParcial(monto, plazo, interes, periodosCarencia);
        default:
            alert("Sistema no reconocido");
            return [];
    }
}
