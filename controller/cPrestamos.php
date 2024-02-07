<?php
include_once '../model/prestamo_model.php';

$Prestamo_Model = new prestamo_model();

try {
    // Intenta realizar la inserción
    $result = $Prestamo_Model->getAllPrestamos();

    // Convertir objetos prestamo_class a arrays asociativos
    $prestamosArray = [];
    foreach ($result as $prestamo) {
        $prestamosArray[] = $prestamo->toArray();
    }

    // Retorna un mensaje JSON según el resultado
    if ($result) {
        echo json_encode(["success" => true, "message" => "Prestamos encontrados!", "prestamos" => $prestamosArray]);
    } else {
        echo json_encode(["success" => false, "message" => "No se encontraron prestamos."]);
    }
} catch (Exception $e) {
    // Captura cualquier excepción y retorna un mensaje de error
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}
