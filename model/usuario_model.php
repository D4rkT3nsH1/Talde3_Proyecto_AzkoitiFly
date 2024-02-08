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

    public function deleteUser($userId)
    {
        $this->OpenConnect();

        $sql = "DELETE FROM usuario WHERE id_user=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $result = $stmt->execute();

        if ($result) {
            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return true;
        } else {
            return false;
        }
    }

    public function changeUserData($userId, $correo, $name, $pasahitza)
    {
        $this->OpenConnect();

        $sql = "UPDATE usuario SET correo=?, contraseña=?, nombre=? WHERE id_user=?";
        $stmt = $this->conn->prepare($sql);

        // Hash de la contraseña utilizando password_hash
        $hashedPassword = password_hash($pasahitza, PASSWORD_DEFAULT);

        // Vincular parámetros y ejecutar la sentencia
        $stmt->bind_param("sssi", $correo, $hashedPassword, $name, $userId);
        $result = $stmt->execute();

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

        $sql = "UPDATE usuario SET correo=?, nombre=? WHERE id_user=?";
        $stmt = $this->conn->prepare($sql);

        // Vincular parámetros y ejecutar la sentencia
        $stmt->bind_param("ssi", $correo, $name, $userId);
        $result = $stmt->execute();

        if ($result) {
            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return true;
        } else {
            return false;
        }
    }
}
