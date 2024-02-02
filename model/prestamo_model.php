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
        $this->conn = null;
    }

    public function getAllPrestamos()
    {
        $this->OpenConnect();

        $sql = "SELECT * FROM prestamo";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $prestamo_array = array();
            while ($row = $result->fetch_assoc()) {
                $prestamo = new prestamo_class();
                $prestamo->setIdUsuario($row['id_user']);
                $prestamo->setIdPrestamo($row['id_pres']);
                $prestamo->setMontoPrestamo($row['monto']);
                $prestamo->setCantPagada($row['cant_pagada']);
                $prestamo->setFechaInicio($row['fec_ini']);
                $prestamo->setFechaFin($row['fec_fin']);
                $prestamo->setEstado($row['estado']);
                array_push($prestamo_array, $prestamo);
            }
            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return $prestamo_array;
        } else {
            return false;
        }
    }

    public function PrestamoByUsuario($idUsuario)
    {
        $this->OpenConnect();

        $sql = "SELECT * FROM prestamo WHERE idUsuario = '$idUsuario'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $prestamo_array = array();
            while ($row = $result->fetch_assoc()) {
                $prestamo = new prestamo_class();
                $prestamo->setIdUsuario($row['id_user']);
                $prestamo->setIdPrestamo($row['id_pres']);
                $prestamo->setMontoPrestamo($row['monto']);
                $prestamo->setCantPagada($row['cant_pagada']);
                $prestamo->setFechaInicio($row['fec_ini']);
                $prestamo->setFechaFin($row['fec_fin']);
                $prestamo->setEstado($row['estado']);
                array_push($prestamo_array, $prestamo);
            }
            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return $prestamo_array;
        } else {
            return false;
        }
    }
}
