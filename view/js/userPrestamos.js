fetch('../../controller/cPrestamos.php')
    .then(response => response.text())
    .then(data => {
        data = JSON.parse(data);
        if (data.success) {
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

                // Agrega una columna para el icono de borrar
                var cellModificar = fila.insertCell();
                var iconoModificar = document.createElement('i');
                iconoModificar.classList.add('fa-solid','fa-pencil');
                iconoModificar.style.cursor = 'pointer';
                iconoModificar.style.color = '#111626';
                iconoModificar.addEventListener('click', function () {
                    var idPrestamo = prestamo.idPrestamo;
                    var cantidad_a_pagar = prestamo.montoPrestamo - prestamo.cantPagada;
                    $('#editarPrestamoModal').modal('show'); // Muestra el modal al hacer clic en el ícono de borrar
                    $('#cantPagada').val(cantidad_a_pagar);
                    $('#cantPagada').attr("disabled",true);
                    $('#importe').val("");
                    // Maneja el evento clic del botón de confirmar borrado en el modal
                    document.getElementById('guardarCambiosBtn').addEventListener('click', function () {
                        fetch('../../controller/cPrestamos.php?idPrestamo=' + idPrestamo, {
                            method: 'PUT'
                        })
                            .then(response => response.text())
                            .then(data => {
                                data = JSON.parse(data);
                                if (data.success) {
                                    toastr.success(data.message);
                                } else {
                                    toastr.error(data.message);
                                }
                            });
                        $('#editarPrestamoModal').modal('hide');
                    });
                    
                });
                cellModificar.appendChild(iconoModificar);

                

                
            });
        } else {
            toastr.error(data.message);
            $('.container').hide()
            $('.MensajeError').show()
        }
    });
