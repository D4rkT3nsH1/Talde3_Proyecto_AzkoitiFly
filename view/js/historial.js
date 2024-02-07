debugger;
fetch('../../controller/cPrestamos.php')
    .then(response => response.text())
    .then(data => {
        data = JSON.parse(data);
        if (data.success) {
            toastr.success(data.message);
            // Rellena la tabla con los datos de los préstamos
            var prestamos = data.prestamos;

            console.log(prestamos);

            // Obtiene la tabla
            var tabla = document.getElementById('historial');

            // Itera sobre los préstamos y agrega filas a la tabla
            prestamos.forEach(function (prestamo) {
                var fila = tabla.insertRow();
                fila.insertCell().textContent = prestamo['NombreUsuario'];
                fila.insertCell().textContent = prestamo['CorreoUsuario'];
                fila.insertCell().textContent = prestamo['montoPrestamo'];
                fila.insertCell().textContent = prestamo['cantPagada'];
                fila.insertCell().textContent = prestamo['fechaInicio'];
                fila.insertCell().textContent = prestamo['fechaFin'];
                fila.insertCell().textContent = prestamo['estado'];
            });
        } else {
            toastr.error(data.message);
            $('.container').hide()
            $('.MensajeError').show()
        }
    });
