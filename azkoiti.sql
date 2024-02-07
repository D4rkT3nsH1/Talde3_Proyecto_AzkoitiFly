-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2024 at 11:10 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `azkoiti`
--

-- --------------------------------------------------------

--
-- Table structure for table `prestamos`
--

CREATE TABLE `prestamos` (
  `id_user` int(11) NOT NULL,
  `id_pres` int(11) NOT NULL,
  `monto` int(11) DEFAULT NULL,
  `cant_pagada` int(11) DEFAULT NULL,
  `fec_ini` date DEFAULT NULL,
  `fec_fin` date DEFAULT NULL,
  `estado` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prestamos`
--

INSERT INTO `prestamos` (`id_user`, `id_pres`, `monto`, `cant_pagada`, `fec_ini`, `fec_fin`, `estado`) VALUES
(1, 1, 1000, 500, '2023-01-01', '2024-01-01', b'0'),
(1, 2, 1500, 800, '2023-03-10', '2024-03-10', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_user` int(11) NOT NULL,
  `is_admin` bit(1) DEFAULT b'0',
  `nombre` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_user`, `is_admin`, `nombre`, `correo`, `contraseña`) VALUES
(1, b'1', 'Admin', 'gontzalizurza@gmail.com', '$2y$10$h3BfBdje6xC8wLjRyis/neN0e9meoFc/SGTfYfN4FkzmESqY.BhzO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`id_pres`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `id_pres` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
