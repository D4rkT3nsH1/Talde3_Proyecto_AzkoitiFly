// Recupera el nombre del usuario almacenado en localStorage
var username = localStorage.getItem('usuario');
var correo = localStorage.getItem('correo');
var userId = localStorage.getItem('userId');
var isAdmin = localStorage.getItem('is_admin');
var userIp = localStorage.getItem('ipUser');

console.log('Nombre:', username);
console.log('Correo:', correo);
console.log('Id:', userId);
console.log('isAdmin:', isAdmin);
console.log('Ip:', userIp);

if (username) {
    fetch('../../controller/cCookieController.php')
        .then(response => response.text())
        .then(data => {
            if (data.trim() !== '') {
                data = JSON.parse(data);
                if (data.success) {
                    // Mostrar toast de éxito al cerrar sesión
                    toastr.warning(data.message);
                    localStorage.clear(); // Eliminar todos los datos del localStorage
                } else {
                    toastr.error(data.message);
                }

                // Opcional: Redireccionar o realizar otras acciones después de cerrar sesión
                setTimeout(function () {
                    window.location.href = "../html/index.html";
                }, 1000);
            } else {
                console.log('Hay cookies almacenadas');
            }
        });
    $('#logReg').hide();
    if (isAdmin === "1") {
        $('#adminDrop').show();
        $('#userDrop').hide();
    } else {
        $('#adminDrop').hide();
        $('#userDrop').show();
    }
    // Obtén todos los elementos 'a' dentro de 'li' dentro de '#barra ul'
    var userElements = document.querySelectorAll('#barra ul li a');

    // Itera sobre los elementos y actualiza el texto si es necesario
    userElements.forEach(function (element) {
        if (element.textContent.includes('User')) {
            element.textContent = username;
        }
    });
} else {
    $('#logReg').show();
    $('#adminDrop').hide();
    $('#userDrop').hide();
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.clear(); // Eliminar todos los datos del localStorage
    fetch('../../controller/cSignOut.php')
        .then(response => response.text())
        .then(data => {
            data = JSON.parse(data);
            if (data.success) {
                // Mostrar toast de éxito al cerrar sesión
                toastr.success(data.message);
            } else {
                toastr.error(data.message);
            }

            // Opcional: Redireccionar o realizar otras acciones después de cerrar sesión
            setTimeout(function () {
                window.location.href = "../html/index.html";
            }, 1000);
        })
        .catch(error => {
            // Mostrar toast de error si falla al cerrar sesión
            console.error('Error al cerrar sesión:', error);
            toastr.error("Error al cerrar sesión");
        });
}
