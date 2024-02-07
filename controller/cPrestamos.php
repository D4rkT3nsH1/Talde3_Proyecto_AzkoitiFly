<?php
include_once '../model/prestamo_model.php';

$Prestamo_Model = new prestamo_model();

// Verifica si la solicitud es de tipo DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Obtiene el id del préstamo a borrar desde la URL
    $idPrestamo = $_GET['idPrestamo'];

    try {
        // Intenta borrar el préstamo con el id proporcionado
        $borrado = $Prestamo_Model->borrarPrestamo($idPrestamo);

        // Retorna un mensaje JSON según el resultado del borrado
        if ($borrado) {
            echo json_encode(["success" => true, "message" => "Préstamo borrado con éxito."]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo borrar el préstamo."]);
        }
    } catch (Exception $e) {
        // Captura cualquier excepción y retorna un mensaje de error
        echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
    }

} else if($_SERVER['REQUEST_METHOD'] === 'PUT'){
// Obtiene el id del préstamo a borrar desde la URL
$idPrestamo = $_GET['idPrestamo'];

try {
    // Intenta borrar el préstamo con el id proporcionado
    $borrado = $Prestamo_Model->borrarPrestamo($idPrestamo);

    // Retorna un mensaje JSON según el resultado del borrado
    if ($borrado) {
        echo json_encode(["success" => true, "message" => "Préstamo pagado con éxito."]);
    } else {
        echo json_encode(["success" => false, "message" => "No se pudo efectuar el pago."]);
    }
} catch (Exception $e) {
    // Captura cualquier excepción y retorna un mensaje de error
    echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
}

} else {
    // Si la solicitud no es de tipo DELETE, devuelve todos los préstamos como lo hacías antes
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
}
