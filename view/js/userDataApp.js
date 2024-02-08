var app = angular.module('userDataApp', []);

app.controller('UserController', function ($scope, $http) {
    // AngularJS controller logic for user data

    var usuario = localStorage.getItem('usuario');
    var correoUsuario = localStorage.getItem('correo');

    $scope.nameUser = usuario;
    $scope.correo = correoUsuario;
    $scope.pass = '';
    $scope.pass_conf = '';

    $scope.changeUserData = function () {
        // AngularJS logic for changing user data
        var jsonData = {
            "correo_json": $scope.correo,
            "name_json": $scope.nameUser,
        };

        if ($scope.pass !== '' && $scope.pass_conf !== '') {
            // Additional logic for handling password change
            if ($scope.pass.length < 8 || !/[A-Z]/.test($scope.pass) || $scope.pass.length > 16) {
                toastr.info("La contraseña debe tener entre 8 y 16 caracteres, ademas de una mayúscula.");
                return;
            } else if ($scope.pass !== $scope.pass_conf) {
                toastr.error("Las contraseñas no coinciden.");
                return;
            }

            jsonData.pass_json = $scope.pass;
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
                        localStorage.setItem('correoUsuario', $scope.correo);
                        localStorage.setItem('usuario', $scope.nameUser);
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
    };

    $scope.showDeleteModal = function () {
        $('#confirmDeleteModal').modal('show');
    };


    $scope.confirmDelete = function () {
        $.ajax({
            type: "POST",
            url: "../../controller/cDeleteUser.php",
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
    };

    $scope.cancelDelete = function () {
        // AngularJS logic for canceling user deletion
        $('#confirmDeleteModal').modal('hide');
    };
});
