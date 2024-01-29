<?php
include_once '../model/usuario_model.php';

$User_Model = new usuario_model();

// Inicializar la sesión
session_start();

// ...

try {
    // Recibe los datos JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Extrae los datos
    $correo = $data['gmail_json'];
    $name = $data['name_json'];
    $pass = $data['pass_json'];

    // Intenta realizar el registro
    $result = $User_Model->RegisterUser($correo, $name, $pass);

    // Retorna un mensaje JSON según el resultado
    if ($result) {
        echo json_encode(["success" => true, "message" => "Registro exitoso", "userData" => $result]);
    } else {
        echo json_encode(["success" => false, "message" => "El correo ya está registrado o error en el registro"]);
    }
} catch (Exception $e) {
    // Captura cualquier excepción y retorna un mensaje de error
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}

// ...
