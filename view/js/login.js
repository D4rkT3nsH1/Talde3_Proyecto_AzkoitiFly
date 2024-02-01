const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const finanzasbotonButton = document.getElementById('finanzasboton');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

var modal = document.getElementById("myModal");

var btn = document.getElementById("modalActivar");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    $("#myModal").fadeIn(550);
    $("#myModal").css({
        "display": "flex",
        "align-items": "center",
        "justify-content": "center"
    });
}

span.onclick = function () {
    $("#myModal").fadeOut(550);
}

window.onclick = function (event) {
    if (event.target == modal) {
        $("#myModal").fadeOut(550);
    }
}

function Registro() {

    var gmail = document.getElementById("gmail_Reg").value.trim();
    var name = document.getElementById("name_Reg").value.trim();
    var pass = document.getElementById("pass_Reg").value.trim();

    if (name === "" || gmail === "" || pass === "") {
        toastr.error("Por favor, complete todos los campos.");
        return;
    }

    if (pass.length < 8 || !/[A-Z]/.test(pass) || pass.length > 16) {
        toastr.info("La contraseña debe tener entre 8 y 16 caracteres, ademas de una mayúscula.");
        return;
    }

    var jsonData = {
        "gmail_json": gmail,
        "name_json": name,
        "pass_json": pass
    };

    console.log(JSON.stringify(jsonData));

    $.ajax({
        type: "POST",
        url: "../../controller/cRegistro.php",
        data: JSON.stringify(jsonData),
        contentType: "application/json",
        success: function (response) {
            try {
                response = JSON.parse(response);
                if (response.success) {
                    // Si la operación fue exitosa, muestra un toast de éxito
                    toastr.success(response.message);
                    $("#name_Reg").val("");
                    $("#gmail_Reg").val("");
                    $("#pass_Reg").val("");
                } else {
                    // Si la operación falló, muestra un toast de error
                    toastr.error(response.message);
                }
            } catch (e) {
                console.error("Error al analizar la respuesta JSON:", e);
                toastr.error("Error en la respuesta del servidor.");
            }
        },
        error: function (textStatus, errorThrown) {
            alert("Error en la solicitud: " + textStatus + " - " + errorThrown);
        }
    });
}


function InicioSesion() {
    var correo = document.getElementById("gmail_Inicio").value.trim();
    var pass = document.getElementById("pass_Inicio").value.trim();

    if (correo === "" || pass === "") {
        toastr.error("Por favor, complete todos los campos.");
        return;
    }

    var jsonData = {
        "gmail_json": correo,
        "pass_json": pass
    };

    $.ajax({
        type: "POST",
        url: "../../controller/cLogin.php",
        data: JSON.stringify(jsonData),
        contentType: "application/json",
        success: function (response) {
            try {
                response = JSON.parse(response);
                if (response.success) {
                    // Mostrar un toast de éxito
                    localStorage.setItem('correoUsuario', response.correoUsuario);
                    localStorage.setItem('idUsuario', response.idUsuario);
                    localStorage.setItem('usuario', response.usuario);
                    localStorage.setItem('isadmin', response.admin);
                    toastr.success(response.usuario, response.message);
                    console.log(response.usuario);
                    setTimeout(function () {
                        // Redireccionar a otra página
                        if(isadmin==1){window.location.href = "../html/CalculadoraPrestamos.html";
                    }else{
                        window.location.href = "../html/index.html";
                    }
                    }, 1500);
                } else {
                    // Si la operación falló, muestra un toast de error
                    toastr.error(response.message);
                }
            } catch (e) {
                console.error("Error al analizar la respuesta JSON:", e);
                toastr.error("Error en la respuesta del servidor.");
            }
        },
        error: function (textStatus, errorThrown) {
            alert("Error en la solicitud: " + textStatus + " - " + errorThrown);
        }
    });
}

function PassChange() {

    var gmail = document.getElementById("gmail_Rec_Pass").value.trim();
    var pass = document.getElementById("pass_Rec_Pass").value.trim();

    if (gmail === "" || pass === "") {
        toastr.error("Por favor, complete todos los campos.");
        return;
    }

    if (pass.length < 8 || !/[A-Z]/.test(pass) || pass.length > 16) {
        toastr.info("La contraseña debe tener entre 8 y 16 caracteres, ademas de una mayúscula.");
        return;
    }

    var jsonData = {
        "gmail_json": gmail,
        "pass_json": pass
    };

    console.log(JSON.stringify(jsonData));

    $.ajax({
        type: "POST",
        url: "../../controller/cChangePass.php",
        data: JSON.stringify(jsonData),
        contentType: "application/json",
        success: function (response) {
            try {
                response = JSON.parse(response);
                if (response.success) {
                    // Si la operación fue exitosa, muestra un toast de éxito
                        $("#myModal").fadeOut(550, function () {
                        // Limpia los campos después de ocultar el modal
                        $("#gmail_Rec_Pass").val("");
                        $("#pass_Rec_Pass").val("");
                        toastr.success(response.message);
                    });
                } else {
                    // Si la operación falló, muestra un toast de error
                    toastr.error(response.message);
                }
            } catch (e) {
                console.error("Error al analizar la respuesta JSON:", e);
                toastr.error("Error en la respuesta del servidor.");
            }
        },
        error: function (textStatus, errorThrown) {
            alert("Error en la solicitud: " + textStatus + " - " + errorThrown);
        }
    });
}

$(document).ready(function () {
    // Agrega un evento click al botón
    $("#finanzasboton").on("click", function () {
        // Verifica la sesión antes de ejecutar la acción del botón
        verificarSesion();
    });

    // Función para verificar la sesión mediante AJAX
    function verificarSesion() {
        $.ajax({
            url: '../../controller/cVerificar.php',  // Cambia la URL a la ruta de tu servidor para verificar la sesión
            type: 'GET',
            success: function (respuesta) {
                // Si la sesión está activa, permite el uso del botón
                if (respuesta === 'esadmin') {
                    // Muestra un toastr indicando que tiene permiso para entrar
                    toastr.success('¡Permiso concedido! Puedes hacer finanzas.');
                    // Agrega aquí la lógica para redirigir a la página de CalculadoraPrestamos.html
                    window.location.href = 'CalculadoraPrestamos.html';
                } else {
                    // Si la sesión no está activa, muestra un toastr indicando que debe iniciar sesión
                    toastr.warning('Debes iniciar sesión para acceder a esta funcionalidad.');
                }
            },
            error: function () {
                // Manejo de errores
                alert("Error al verificar la sesión");
            }
        });
    }
});
