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
(1, 2, 1500, 800, '2023-03-10', '2024-03-10', b'0'),
(1, 3, 1200, 600, '2024-01-01', '2025-01-01', b'0'),
(1, 4, 800, 400, '2024-02-08', '2025-02-08', b'0'),
(1, 5, 2000, 1000, '2024-03-15', '2025-03-15', b'0'),
(2, 6, 1500, 700, '2024-04-22', '2025-04-22', b'0'),
(1, 7, 1800, 900, '2024-05-29', '2025-05-29', b'0'),
(1, 8, 1000, 500, '2024-06-05', '2025-06-05', b'0'),
(3, 9, 1300, 650, '2024-07-12', '2025-07-12', b'0'),
(1, 10, 1600, 800, '2024-08-19', '2025-08-19', b'0'),
(1, 11, 1400, 700, '2024-09-26', '2025-09-26', b'0'),
(4, 12, 900, 450, '2024-10-03', '2025-10-03', b'0'),
(1, 13, 1100, 550, '2024-11-10', '2025-11-10', b'0'),
(1, 14, 1700, 850, '2024-12-17', '2025-12-17', b'0'),
(5, 15, 1900, 950, '2025-01-24', '2026-01-24', b'0'),
(1, 16, 1000, 500, '2025-02-01', '2026-02-01', b'0'),
(1, 17, 1200, 600, '2025-03-09', '2026-03-09', b'0'),
(6, 18, 800, 400, '2025-04-16', '2026-04-16', b'0'),
(1, 19, 2000, 1000, '2025-05-23', '2026-05-23', b'0'),
(1, 20, 1500, 750, '2025-06-30', '2026-06-30', b'0');


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
(2, b'0', 'Usuario 2', 'usuario2@example.com', '$2y$10$h3BfBdje6xC8wLjRyis/neN0e9meoFc/SGTfYfN4FkzmESqY.BhzO'),
(3, b'0', 'Usuario 3', 'usuario3@example.com', '$2y$10$h3BfBdje6xC8wLjRyis/neN0e9meoFc/SGTfYfN4FkzmESqY.BhzO'),
(4, b'0', 'Usuario 4', 'usuario4@example.com', '$2y$10$h3BfBdje6xC8wLjRyis/neN0e9meoFc/SGTfYfN4FkzmESqY.BhzO'),
(5, b'0', 'Usuario 5', 'usuario5@example.com', '$2y$10$h3BfBdje6xC8wLjRyis/neN0e9meoFc/SGTfYfN4FkzmESqY.BhzO');


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
  MODIFY `id_pres` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
