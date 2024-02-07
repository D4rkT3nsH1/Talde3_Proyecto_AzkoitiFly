<?php
require_once 'connect_data.php';
require_once 'prestamo_class.php';

class prestamo_model
{
    private $conn;

    public function OpenConnect()
    {
        $connData = new connect_data();
        try {
            $this->conn = new mysqli($connData->host, $connData->userbbdd, $connData->passbbdd, $connData->ddbbname);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $this->conn->set_charset("utf8");
    }

    public function CloseConnect()
    {
        $this->conn->close();
    }

    public function getAllPrestamos()
    {
        $this->OpenConnect();

        $sql = "SELECT p.id_pres AS 'ID Préstamo',
            u.nombre AS 'Nombre Usuario', 
            u.correo AS 'Correo Usuario', 
            p.monto AS 'Monto', 
            p.cant_pagada AS 'Cantidad Pagada', 
            p.fec_ini AS 'Fecha Inicio', 
            p.fec_fin AS 'Fecha Final', 
            CASE 
                WHEN p.estado = 1 THEN 'Pagado'
                WHEN p.estado = 0 THEN 'No Pagado'
                ELSE 'Estado Desconocido'
            END AS 'Estado del Pago'
            FROM prestamos p
            JOIN usuario u ON p.id_user = u.id_user";

        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $prestamo_array = array();
            while ($row = $result->fetch_assoc()) {
                $prestamo = new prestamo_class();
                // Accediendo a las columnas por sus alias en la consulta SQL
                $prestamo->setIdPrestamo($row['ID Préstamo']);
                $prestamo->setNombreUsuario($row['Nombre Usuario']);
                $prestamo->setCorreoUsuario($row['Correo Usuario']);
                $prestamo->setMontoPrestamo($row['Monto']);
                $prestamo->setCantPagada($row['Cantidad Pagada']);
                $prestamo->setFechaInicio($row['Fecha Inicio']);
                $prestamo->setFechaFin($row['Fecha Final']);
                $prestamo->setEstado($row['Estado del Pago']);
                array_push($prestamo_array, $prestamo);
            }
            $this->CloseConnect();
            return $prestamo_array;
        } else {
            $this->CloseConnect();
            return false;
        }
    }

    public function borrarPrestamo($idPrestamo)
    {
        $this->OpenConnect();

        $sql = "DELETE FROM prestamos WHERE id_pres = $idPrestamo";

        if ($this->conn->query($sql) === TRUE) {
            $this->CloseConnect();
            return true;
        } else {
            $this->CloseConnect();
            return false;
        }
    }


    public function editarPrestamo($idPrestamo, $cantidad)
    {
        $this->OpenConnect();

        $sql = "DELETE FROM prestamos WHERE id_pres = $idPrestamo";

        if ($this->conn->query($sql) === TRUE) {
            $this->CloseConnect();
            return true;
        } else {
            $this->CloseConnect();
            return false;
        }
    }
}
