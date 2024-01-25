<?php
include_once '../model/usuario_model.php';

$User_Model = new usuario_model();
// verificar_sesion.php

// Inicia la sesión (asegúrate de haber iniciado la sesión en tu aplicación)
session_start();

// Verifica si hay una sesión activa
if (isset($_SESSION['is_admin']) && $_SESSION['is_admin'] === 'esadmin') {
    // Si hay una sesión activa, devuelve 'sesion_activa'
    echo 'sesionadmin_activa';
} else {
    // Si no hay una sesión activa, devuelve otro mensaje (por ejemplo, 'sesion_no_activa')
    echo 'sesion_no_activa';
}
