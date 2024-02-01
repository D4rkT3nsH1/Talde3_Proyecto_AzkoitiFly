// Aqui cargamos los datos del usuario en el index desde localStorage
var isAdmin = localStorage.getItem('is_admin');

$('#finanzas').on('click', function () {
    if (isAdmin == 1) {
        window.location.href = '../html/CalculadoraPrestamos.html';
    } else if (isAdmin == 0) {
        window.location.href = '../html/PedirPrestamos.html';
    } else {
        toastr.info("Para acceder a esta sección debes iniciar sesión");
    }
});