<?php
session_start();
require_once '../model/usuario_model.php';

$usuarioModel = new usuario_model();

try {
    $IdUser = $_SESSION['userId']; // Cogemos la id del usuario desde la variable de sesión

    // Intenta realizar la eliminacion de datos del usuario
    $result = $usuarioModel->deleteUser($IdUser);

    // Retorna un mensaje JSON según el resultado
    if ($result) {
        echo json_encode(["success" => true, "message" => "Datos del usuario eliminados con éxito."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar los datos del usuario"]);
    }
} catch (Exception $e) {
    // Captura cualquier excepción y retorna un mensaje de error
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}
