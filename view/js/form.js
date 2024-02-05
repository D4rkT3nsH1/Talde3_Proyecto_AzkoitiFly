var usuario = localStorage.getItem('usuario');
var correoUsuario = localStorage.getItem('correoUsuario');

var btnChangeData = document.getElementById("btnChangeData");
var btnDeleteUser = document.getElementById("btnDeleteUser");

var nameUser = document.getElementById("name_change");
var correo = document.getElementById("gmail_change");
var pass = document.getElementById("pass_change");
var pass_conf = document.getElementById("pass_change_conf");

document.getElementById("name_change").value = usuario;
document.getElementById("gmail_change").value = correoUsuario;

btnChangeData.addEventListener("click", function () {
    debugger;
    if (pass.value === "" && pass_conf.value === "") {
        if (nameUser.value === usuario && correo.value === correoUsuario) {
            toastr.info("No hay cambios que guardar.");
            setTimeout(function () {
                // Redireccionar a otra página
                window.location.href = "../html/index.html";
            }, 1500);
        }
    }

    var jsonData = {
        "correo_json": correo.value,
        "name_json": nameUser.value,
    };

    if (pass.value !== "" && pass_conf.value !== "") {
        if (pass.value.length < 8 || !/[A-Z]/.test(pass) || pass.value.length > 16) {
            toastr.info("La contraseña debe tener entre 8 y 16 caracteres, ademas de una mayúscula.");
            return;

        } else if (pass.value !== pass_conf.value) {
            toastr.error("Las contraseñas no coinciden.");
            return;
        }

        var jsonData = {
            "correo_json": correo.value,
            "name_json": nameUser.value,
            "pass_json": pass.value
        };
    }

    $.ajax({
        type: "POST",
        url: "../../controller/cChangeUserData.php",
        data: JSON.stringify(jsonData),
        contentType: "application/json",
        success: function (response) {
            try {
                response = JSON.parse(response);
                if (response.success) {
                    // Mostrar un toast de éxito
                    toastr.success(response.message);
                    localStorage.setItem('correoUsuario', correo.value);
                    localStorage.setItem('usuario', nameUser.value);
                    setTimeout(function () {
                        // Redireccionar a otra página
                        window.location.href = "../html/index.html";
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
});
btnDeleteUser.addEventListener("click", function () {
    // Mostrar el modal cuando se hace clic en "Eliminar Usuario"
    $('#confirmDeleteModal').modal('show');
});

// Agregar evento clic al botón "Sí" dentro del modal
document.getElementById("btnConfirmDelete").addEventListener("click", function () {
    // Lógica para eliminar el usuario
    eliminarUsuario(correoUsuario);
    // Cerrar el modal
    $('#confirmDeleteModal').modal('hide');
});
document.getElementById("btnCancelDelete").addEventListener("click", function () {
    // Cerrar el modal si se hace clic en "No"
    $('#confirmDeleteModal').modal('hide');
});
function eliminarUsuario(correoUsuario) {
    debugger;
    // Lógica para eliminar el usuario
    $.ajax({
        type: "POST",
        url: "../../controller/cDeleteUser.php",
        data: JSON.stringify({ "correoUsuario": correoUsuario }),
        contentType: "application/json",
        success: function (response) {
            try {
                response = JSON.parse(response);
                if (response.success) {
                    toastr.success(response.message);
                    localStorage.clear();
                    setTimeout(function () {
                        // Redireccionar a otra página
                        window.location.href = "../html/index.html";
                    }, 750);
                } else {
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