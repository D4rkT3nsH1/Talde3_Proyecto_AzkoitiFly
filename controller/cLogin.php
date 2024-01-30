<?php
include_once '../model/usuario_model.php';

$User_Model = new usuario_model();

// Inicializar la sesión
session_start();

try {
    // Recibe los datos JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Extrae los datos
    $correo = $data['gmail_json'];
    $pass = $data['pass_json'];

    // Intenta realizar la inserción
    $result = $User_Model->CheckUserLogin($correo, $pass);

    if ($result) {
        // Metemos los datos en la sesión
        $_SESSION['correo'] = $correo;
        $_SESSION['pass'] = $pass;
        $_SESSION['user'] = $result["nameUsuario"]; // usuario
        $_SESSION['userId'] = $result["idUsuario"]; // idUsuario
    }
    
    // Retorna un mensaje JSON según el resultado
    if ($result) {
        echo json_encode(["success" => true, "message" => "Te damos la bienvenida!", "usuario" => $result["nameUsuario"], "correo" => $result["correoUsuario"], "is_admin" => $result["is_admin"]]);
    } else {
        echo json_encode(["success" => false, "message" => "Correo o contraseña incorrectos"]);
    }
} catch (Exception $e) {
    // Captura cualquier excepción y retorna un mensaje de error
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}
