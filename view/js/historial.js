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
                    prestamo['NombreUsuario'],
                    prestamo['CorreoUsuario'],
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
                var cellBorrar = fila.insertCell();
                var iconoBorrar = document.createElement('i');
                iconoBorrar.classList.add('fas', 'fa-trash-alt');
                iconoBorrar.style.cursor = 'pointer';
                iconoBorrar.style.color = '#111626';
                iconoBorrar.addEventListener('click', function () {
                    var idPrestamo = prestamo.idPrestamo;
                    $('#confirmarBorradoModal').modal('show'); // Muestra el modal al hacer clic en el ícono de borrar

                    // Maneja el evento clic del botón de confirmar borrado en el modal
                    document.getElementById('confirmarBorradoBtn').addEventListener('click', function () {
                        fetch('../../controller/cPrestamos.php?idPrestamo=' + idPrestamo, {
                            method: 'DELETE'
                        })
                            .then(response => response.text())
                            .then(data => {
                                data = JSON.parse(data);
                                if (data.success) {
                                    toastr.success(data.message);
                                    fila.remove();
                                } else {
                                    toastr.error(data.message);
                                }
                            });
                        $('#confirmarBorradoModal').modal('hide');
                    });
                });
                cellBorrar.appendChild(iconoBorrar);

                
                
            });
        } else {
            toastr.error(data.message);
            $('.container').hide()
            $('.MensajeError').show()
        }
    });
