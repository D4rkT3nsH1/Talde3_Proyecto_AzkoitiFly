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

    public function getPrestamosByUser($idUser)
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
            JOIN usuario u ON p.id_user = u.id_user
            WHERE p.id_user = $idUser";

        $result = $this->conn->query($sql);

        if ($result->num_rows > 0) {
            $prestamo_array = array();
            while ($row = $result->fetch_assoc()) {
                $prestamo = new prestamo_class();
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

    public function editPrestamo($idPrestamo, $importe)
    {
        $this->OpenConnect();

        // Prepara la consulta SQL con marcadores de posición
        $sql = "UPDATE prestamos SET cant_pagada = cant_pagada + ? WHERE id_pres = ?";

        // Prepara la sentencia
        $stmt = $this->conn->prepare($sql);

        // Vincula los parámetros a los marcadores de posición
        $stmt->bind_param("ii", $importe, $idPrestamo);

        // Ejecuta la sentencia
        if ($stmt->execute()) {
            // Verifica si se ha pagado la totalidad del préstamo
            $sql_total = "SELECT monto, cant_pagada FROM prestamos WHERE id_pres = ?";
            $stmt_total = $this->conn->prepare($sql_total);
            $stmt_total->bind_param("i", $idPrestamo);
            $stmt_total->execute();
            $result = $stmt_total->get_result();
            $row = $result->fetch_assoc();
            $montoTotal = $row['monto'];
            $cantPagada = $row['cant_pagada'];

            // Calcula la deuda restante
            $deudaRestante = $montoTotal - $cantPagada;

            // Actualiza el estado según la deuda restante
            $estado = $deudaRestante > 0 ? 'No Pagado' : 'Pagado';
            $sql_update_estado = "UPDATE prestamos SET estado = ? WHERE id_pres = ?";
            $stmt_update_estado = $this->conn->prepare($sql_update_estado);
            $stmt_update_estado->bind_param("si", $estado, $idPrestamo);
            $stmt_update_estado->execute();

            $this->CloseConnect();
            return true;
        } else {
            $this->CloseConnect();
            return false;
        }
    }


    public function insertarPrestamo($idUser, $monto, $años)
    {
        $this->OpenConnect();

        // Calcular la fecha de inicio y final del préstamo
        $fecha_inicio = date('Y-m-d');
        $fecha_fin = date('Y-m-d', strtotime("+$años years", strtotime($fecha_inicio)));

        // Preparar la consulta SQL utilizando marcadores de posición para evitar inyección SQL
        $sql = "INSERT INTO prestamos (id_user, monto, cant_pagada, fec_ini, fec_fin) VALUES (?, ?, 0, ?, ?)";
        $stmt = $this->conn->prepare($sql);

        // Vincular los parámetros y ejecutar la consulta
        $stmt->bind_param("isss", $idUser, $monto, $fecha_inicio, $fecha_fin);
        $stmt->execute();

        // Verificar si la consulta fue exitosa
        if ($stmt->affected_rows > 0) {
            $this->CloseConnect();
            return true; // Éxito
        } else {
            $this->CloseConnect();
            return false; // Falló la inserción
        }
    }
}
