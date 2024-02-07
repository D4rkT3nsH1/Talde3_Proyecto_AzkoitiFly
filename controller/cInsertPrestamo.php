<?php
include_once '../model/prestamo_model.php';

session_start();

$Prestamo_Model = new prestamo_model();

try {
    // Recibe los datos JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Extrae los datos
    $monto = $data['monto_json'];
    $plazo = $data['plazo_json'];
    $idUser = $_SESSION['userId'];

    $result = $Prestamo_Model->insertarPrestamo($idUser, $monto, $plazo);

    if ($result) {
        echo json_encode(["success" => true, "message" => "Préstamo solicitado con éxito!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Ha ocurrido un error al solicitar el préstamo"]);
    }
} catch (Exception $e) {
    echo json_encode($e->getMessage());
}
