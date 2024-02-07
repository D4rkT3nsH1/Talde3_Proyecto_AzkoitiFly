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
        $_SESSION['is_admin'] = $result["is_admin"];
        $_SESSION['correo'] = $result["correo"];
        $_SESSION['user'] = $result["nombre"]; // usuario
        $_SESSION['userId'] = $result["id"]; // idUsuario
        $_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
        setcookie('user', $result["nombre"], time() + 86400, "/"); // 86400 = 1 día
    }

    // Retorna un mensaje JSON según el resultado
    if ($result) {
        echo json_encode(["success" => true, "message" => "Te damos la bienvenida!", "ip" => $_SESSION['ip'], "usuario" =>  $_SESSION['user'], "correo" => $_SESSION['correo'], "userId" => $_SESSION['userId'], "is_admin" => $_SESSION['is_admin']]);
    } else {
        echo json_encode(["success" => false, "message" => "Correo o contraseña incorrectos"]);
    }
} catch (Exception $e) {
    // Captura cualquier excepción y retorna un mensaje de error
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}
