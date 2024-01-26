<?php
require_once 'connect_data.php';

class usuario_model
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

    public function UserByCorreo($correo)
    {
        $this->OpenConnect();

        $sql = "SELECT * FROM usuarios WHERE correoUsuario = '$correo'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $usuario_array = array();
            $usuario_array['correoUsuario'] = $row['correoUsuario'];
            $usuario_array['nameUsuario'] = $row['nameUsuario'];
            $usuario_array['passUsuario'] = $row['passUsuario'];
            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return $usuario_array;
        } else {
            return false;
        }
    }

    public function CheckUserLogin($correo, $pass)
    {
        $this->OpenConnect();

        $sql = "SELECT * FROM usuarios WHERE correoUsuario = '$correo' AND passUsuario = '$pass'";
        $result = $this->conn->query($sql);

        $datosUser = array();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc(); // Obtener la fila de la consulta

            $datosUser["idUsuario"] = $row['idUsuario'];
            $datosUser["is_admin"] = $row['is_admin'];
            $datosUser["correoUsuario"] = $row['correoUsuario'];
            $datosUser["nameUsuario"] = $row['nameUsuario'];

            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return $datosUser;
        } else {
            return false;
        }
    }
}
