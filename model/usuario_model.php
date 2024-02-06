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

        $sql = "SELECT * FROM usuario WHERE correo = '$correo'";
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

        $sql = "SELECT * FROM usuario WHERE correo = '$correo'";
        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Verificar la contraseña usando password_verify()
            if (password_verify($pass, $row['contraseña'])) {
                $datosUser["id"] = $row['id_user'];
                $datosUser["is_admin"] = $row['is_admin'];
                $datosUser["correo"] = $row['correo'];
                $datosUser["nombre"] = $row['nombre'];

                if ($this->conn !== null) {
                    $this->CloseConnect();
                }
                return $datosUser;
            }
        }
        return false; // Correo o contraseña incorrectos
    }


    public function RegisterUser($correo, $name, $pass)
    {
        $this->OpenConnect();

        // Verificar si el correo ya existe
        $existingUser = $this->UserByCorreo($correo);

        if ($existingUser) {
            return false; // El correo ya está registrado
        }

        // Cifrar la contraseña
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);

        // Insertar nuevo usuario con la contraseña cifrada
        $sql = "INSERT INTO usuario (correo, nombre, contraseña) VALUES ('$correo', '$name', '$hashedPass')";
        $result = $this->conn->query($sql);

        if ($result) {
            if ($this->conn !== null) {
                $this->CloseConnect();
            }
            return true;
        } else {
            return false; // Error al registrar usuario
        }
    }
    public function changePass($correo, $pass)
    {
        $this->OpenConnect();

        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);

        $sql = "UPDATE usuario SET contraseña='$hashedPass' WHERE correo='$correo'";
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

}
