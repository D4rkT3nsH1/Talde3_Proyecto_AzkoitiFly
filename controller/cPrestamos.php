<?php
include_once '../model/prestamo_model.php';

session_start();

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
} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Obtiene el id del préstamo a borrar desde la URL
    $idPrestamo = $_GET['idPrestamo'];
    $importe = $_GET['importe'];

    try {
        // Intenta borrar el préstamo con el id proporcionado
        $editado = $Prestamo_Model->editPrestamo($idPrestamo, $importe);

        // Retorna un mensaje JSON según el resultado del borrado
        if ($editado) {
            echo json_encode(["success" => true, "message" => "Préstamo pagado con éxito."]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo efectuar el pago."]);
        }
    } catch (Exception $e) {
        // Captura cualquier excepción y retorna un mensaje de error
        echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
    }
} else {
    try {
        // Intenta realizar la inserción
        if ($_SESSION['is_admin'] == 1) {
            $result = $Prestamo_Model->getAllPrestamos();
        } else {
            $result = $Prestamo_Model->getPrestamosByUser($_SESSION['userId']);
        }

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
