<?php
session_start();
include_once '../model/usuario_model.php';

$User_Model = new usuario_model();

try {
    // Recibe los datos JSON
    $data = json_decode(file_get_contents("php://input"), true);

    $userId = $_SESSION['userId']; // Cogemos la id del usuario desde la variable de sesión
    $correo = $data['correo_json'];
    $name = $data['name_json'];
    // Verifica si pass_json está presente en los datos JSON
    $pass = isset($data['pass_json']) ? $data['pass_json'] : null;

    if ($pass !== null) {
        // Intenta realizar la inserción si existe la contraseña
        $result = $User_Model->changeUserData($userId, $correo, $name, $pass);
    } else {
        $result = $User_Model->changeUserDataWoPass($userId, $correo, $name);
    }

    // Retorna un mensaje JSON según el resultado
    if ($result) {
        $_SESSION['user'] = $name; // Actualizamos el nombre de usuario en la variable de sesión
        $_SESSION['correo'] = $correo; // Actualizamos el correo en la variable de sesión
        echo json_encode(["success" => true, "message" => "Usuario actualizado!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar el usuario"]);
    }
} catch (Exception $e) {
    // Captura cualquier excepción y retorna un mensaje de error
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}
