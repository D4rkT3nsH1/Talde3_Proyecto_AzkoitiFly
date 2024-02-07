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
        $this->conn->close();
    }

    public function UserByCorreo($correo)
    {
        $this->OpenConnect();

        $sql = "SELECT * FROM usuario WHERE correo = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $stmt->close();
            $this->CloseConnect();
            return $result;
        } else {
            $stmt->close();
            $this->CloseConnect();
            return false;
        }
    }

    public function CheckUserLogin($correo, $pass)
    {
        $this->OpenConnect();

        $sql = "SELECT * FROM usuario WHERE correo = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Verificar la contraseña usando password_verify()
            if (password_verify($pass, $row['contraseña'])) {
                $datosUser["id"] = $row['id_user'];
                $datosUser["is_admin"] = $row['is_admin'];
                $datosUser["nombre"] = $row['nombre'];
                $datosUser["correo"] = $row['correo'];
                $stmt->close();
                $this->CloseConnect();
                return $datosUser;
            }
        }
        $stmt->close();
        $this->CloseConnect();
        return false; // Correo o contraseña incorrectos
    }


    public function RegisterUser($correo, $name, $pass)
    {
        // Verificar si el correo ya existe
        $existingUser = $this->UserByCorreo($correo);

        if ($existingUser) {
            return false; // El correo ya está registrado
        }

        $this->OpenConnect();

        // Cifrar la contraseña
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);

        // Insertar nuevo usuario con la contraseña cifrada
        $sql = "INSERT INTO usuario (correo, nombre, contraseña) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sss", $correo, $name, $hashedPass);
        $result = $stmt->execute();

        if ($result) {
            $stmt->close();
            $this->CloseConnect();
            return true;
        } else {
            $stmt->close();
            $this->CloseConnect();
            return false; // Error al registrar usuario
        }
    }

    public function changePass($correo, $pass)
    {
        $this->OpenConnect();

        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);

        $sql = "UPDATE usuario SET contraseña=? WHERE correo=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ss", $hashedPass, $correo);
        $result = $stmt->execute();

        if ($result) {
            $stmt->close();
            $this->CloseConnect();
            return true;
        } else {
            $stmt->close();
            $this->CloseConnect();
            return false;
        }
    }

    public function changeUserData($userId, $correo, $name, $pasahitza)
    {
        $this->OpenConnect();
        $sql = "UPDATE usuario SET correo='$correo', contraseña='$pasahitza', nombre='$name' WHERE id_user ='$userId'";
        $result = $this->conn->query($sql);
        if ($result) {
            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return true;
        } else {
            return false;
        }
    }

    public function changeUserDataWoPass($userId, $correo, $name)
    {
        $this->OpenConnect();
        $sql = "UPDATE usuario SET correo='$correo', nombre='$name' WHERE id_user ='$userId'";
        $result = $this->conn->query($sql);
        if ($result) {
            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return true;
        } else {
            return false;
        }
    }

    public function insertarPrestamo($monto, $años) {
        // Calcular la fecha de inicio y final del préstamo
        $fecha_inicio = date('Y-m-d');
        $fecha_fin = date('Y-m-d', strtotime("+$años years", strtotime($fecha_inicio)));
    
        // Preparar la consulta SQL utilizando marcadores de posición para evitar inyección SQL
        $sql = "INSERT INTO prestamos (monto, cant_pagada, fec_ini, fec_fin) VALUES (?, 0, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        
        // Vincular los parámetros y ejecutar la consulta
        $stmt->bind_param("sss", $monto, $fecha_inicio, $fecha_fin);
        $stmt->execute();
        
        // Verificar si la consulta fue exitosa
        if ($stmt->affected_rows > 0) {
            return true; // Éxito
        } else {
            return false; // Falló la inserción
        }
    }
}
