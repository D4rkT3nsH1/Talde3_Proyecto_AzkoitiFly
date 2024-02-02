<?php
class prestamo_class
{
    private $idPrestamo;
    private $idUsuario;
    private $fechaInicio;
    private $fechaFin;
    private $estado;

    public function getIdPrestamo()
    {
        return $this->idPrestamo;
    }


    public function setIdPrestamo($idPrestamo)
    {
        $this->idPrestamo = $idPrestamo;
    }

    public function getIdUsuario()
    {
        return $this->idUsuario;
    }

    public function setIdUsuario($idUsuario)
    {
        $this->idUsuario = $idUsuario;
    }

    public function getFechaInicio()
    {
        return $this->fechaInicio;
    }

    public function setFechaInicio($fechaInicio)
    {
        $this->fechaInicio = $fechaInicio;
    }

    public function getFechaFin()
    {
        return $this->fechaFin;
    }

    public function setFechaFin($fechaFin)
    {
        $this->fechaFin = $fechaFin;
    }

    public function getEstado()
    {
        return $this->estado;
    }

    public function setEstado($estado)
    {
        $this->estado = $estado;
    }
}
