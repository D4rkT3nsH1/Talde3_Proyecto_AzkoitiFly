<?php
include_once '../model/usuario_model.php';

$User_Model = new usuario_model();

try {
    // Recibe los datos JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Extrae los datos
    $correo = $data['gmail_json'];
    $pass = $data['pass_json'];

    // Intenta realizar la inserción
    $result = $User_Model->changePass($correo, $pass);

    // Retorna un mensaje JSON según el resultado
    if ($result) {
        echo json_encode(["success" => true, "message" => "Contraseña actualizada!"]);
    } else {
        echo json_encode(["success" => false, "message" => "El correo no está en nuestro sistema."]);
    }
} catch (Exception $e) {
    // Captura cualquier excepción y retorna un mensaje de error
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}