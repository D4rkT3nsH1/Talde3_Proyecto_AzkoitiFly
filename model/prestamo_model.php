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

    public function PrestamoByUsuario($idUsuario)
    {
        $this->OpenConnect();

        $sql = "SELECT * FROM prestamo WHERE idUsuario = '$idUsuario'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $prestamo_array = array();
            while ($row = $result->fetch_assoc()) {
                $prestamo = new prestamo_class();
                $prestamo->setIdPrestamo($row['idPrestamo']);
                $prestamo->setIdUsuario($row['idUsuario']);
                $prestamo->setFechaInicio($row['fechaInicio']);
                $prestamo->setFechaFin($row['fechaFin']);
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
