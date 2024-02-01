// Recupera el nombre del usuario almacenado en localStorage
var username = localStorage.getItem('usuario');
var isAdmin = localStorage.getItem('is_admin');

if (username) {
    $('#logReg').hide();
    if (isAdmin === "1") {
        $('#adminDrop').show();
        $('#userDrop').hide();
    } else {
        $('#adminDrop').hide();
        $('#userDrop').show();
    }
} else {
    $('#logReg').show();
    $('#adminDrop').hide();
    $('#userDrop').hide();
}