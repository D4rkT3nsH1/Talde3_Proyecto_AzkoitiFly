<?php
class prestamo_class
{
    private $idPrestamo;
    private $idUsuario;
    private $montoPrestamo;
    private $cantPagada;
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

    public function getMontoPrestamo()
    {
        return $this->montoPrestamo;
    }

    public function setMontoPrestamo($montoPrestamo)
    {
        $this->montoPrestamo = $montoPrestamo;
    }

    public function getCantPagada()
    {
        return $this->cantPagada;
    }

    public function setCantPagada($cantPagada)
    {
        $this->cantPagada = $cantPagada;
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
