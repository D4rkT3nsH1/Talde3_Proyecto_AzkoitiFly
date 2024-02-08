fetch('../../controller/cPrestamos.php')
    .then(response => response.text())
    .then(data => {
        data = JSON.parse(data);
        if (data.success) {
            if (localStorage.getItem("message") != null) {
                toastr.success(localStorage.getItem("message"));
                localStorage.removeItem("message");
            }
            // Rellena la tabla con los datos de los préstamos
            var prestamos = data.prestamos;

            console.log(prestamos);

            // Obtiene la tabla
            var tabla = document.getElementById('historial');

            prestamos.forEach(function (prestamo) {
                var fila = tabla.insertRow();
                fila.id = prestamo.idPrestamo; // Asigna el idPrestamo como el id de la fila

                var datosPrestamo = [
                    prestamo['montoPrestamo'],
                    prestamo['cantPagada'],
                    prestamo['fechaInicio'],
                    prestamo['fechaFin'],
                    prestamo['estado']
                ];

                // Itera sobre los datos del préstamo y agrega celdas a la fila
                datosPrestamo.forEach(function (dato) {
                    var celda = fila.insertCell();
                    celda.textContent = dato;
                });

                if (prestamo.estado == "No Pagado") {
                    var cellModificar = fila.insertCell();
                    var iconoModificar = document.createElement('i');
                    iconoModificar.classList.add('fa-solid', 'fa-pencil');
                    iconoModificar.style.cursor = 'pointer';
                    iconoModificar.style.color = '#111626';
                    iconoModificar.addEventListener('click', function () {
                        var idPrestamo = prestamo.idPrestamo;
                        var cantidad_a_pagar = prestamo.montoPrestamo - prestamo.cantPagada;
                        $('#editarPrestamoModal').modal('show');
                        $('#cantPagada').val(cantidad_a_pagar);
                        $('#cantPagada').attr("disabled", true);
                        $('#importe').val("");

                        document.getElementById('guardarCambiosBtn').addEventListener('click', function () {
                            var importe = $('#importe').val();
                            if (importe == "") {
                                toastr.error("El campo importe no puede estar vacío");
                                return;
                            }
                            if (importe > cantidad_a_pagar) {
                                toastr.error("El importe no puede ser mayor a la cantidad a pagar");
                                return;
                            }
                            fetch('../../controller/cPrestamos.php?idPrestamo=' + idPrestamo + '&importe=' + importe, {
                                method: 'PUT'
                            })
                                .then(response => response.text())
                                .then(data => {
                                    data = JSON.parse(data);
                                    if (data.success) {
                                        localStorage.setItem("message", data.message);
                                        location.reload();
                                    } else {
                                        toastr.error(data.message);
                                    }
                                });
                            $('#editarPrestamoModal').modal('hide');
                        });
                    });
                    cellModificar.appendChild(iconoModificar);
                } else {
                    fila.insertCell();
                    fila.style.backgroundColor = 'rgba(17, 22, 38, 0.35)';
                }

            });
        } else {
            toastr.error(data.message);
            $('.container').hide()
            $('.MensajeError').show()
        }
    });
