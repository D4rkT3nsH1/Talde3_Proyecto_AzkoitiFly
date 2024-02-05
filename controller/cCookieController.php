<?php
session_start();
if (!isset($_COOKIE['user'])) {
    try {
        $result = session_destroy();
        if ($result) {
            echo json_encode(["success" => true, "message" => "Sesión Caducada!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Ha ocurrido un error al cerrar la sesión"]);
        }
    } catch (Exception $e) {
        // Captura cualquier excepción y retorna un mensaje de error
        echo json_encode(["success" => false, "message" => "Error en el servidor: " . $e->getMessage()]);
    }
} else {
    exit();
}
