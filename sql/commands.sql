-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2022 a las 05:31:25
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurant`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `IdCompra` int(11) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `IdUsuario` varchar(50) NOT NULL,
  `IdProveedor` varchar(30) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `MontoTotal` decimal(9,2) NOT NULL,
  `PrecioVenta` decimal(9,2) NOT NULL,
  `Observacion` varchar(50) DEFAULT NULL,
  `FechaCompra` timestamp NOT NULL DEFAULT current_timestamp(),
  `FechaVencimiento` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`IdCompra`, `Codigo`, `IdUsuario`, `IdProveedor`, `Descripcion`, `Cantidad`, `MontoTotal`, `PrecioVenta`, `Observacion`, `FechaCompra`, `FechaVencimiento`) VALUES
(11, 'S-2', 'ferch', 'BSL', '1', 0, '1.00', '1.00', '1', '2022-09-11 04:00:00', NULL),
(12, 'S-3', 'ferch', 'BSL', '1', 1, '1.00', '1.00', '1', '2022-09-11 04:00:00', NULL),
(13, 'M-1', 'ferch', 'BSL', '1', 1, '1.00', '1.00', '1', '2022-09-11 04:00:00', NULL),
(32, 'S-4', 'ferch', 'NOSE', 'Silla (plastico)', 1, '12.00', '12.00', NULL, '2022-09-19 04:00:00', NULL),
(33, 'S-5', 'ferch', 'BSL', 'Silla (plastico)', 4, '12.00', '3.00', NULL, '2022-09-20 04:00:00', NULL),
(34, 'S-6', 'ferch', 'BSL', 'Silla (plastico)', 4, '12.00', '3.00', NULL, '2022-09-20 04:00:00', NULL),
(35, 'S-7', 'ferch', 'BSL', 'Silla (plastico)', 4, '12.00', '3.00', NULL, '2022-09-20 04:00:00', NULL),
(36, 'M-2', 'ferch', 'BSL', 'Mesa Madera', 4, '12.00', '3.00', NULL, '2022-09-20 04:00:00', NULL),
(37, 'S-8', 'ferch', 'BSL', '1', 2, '1.00', '0.50', '1', '2022-09-26 04:00:00', NULL),
(58, 'S-10', 'ferch', 'BSL', '1', 35, '100.00', '149.43', '1', '2022-09-27 04:00:00', NULL),
(60, 'S-11', 'ferch', 'BSL', '1', 1, '1.00', '1.00', '1', '2022-09-27 04:00:00', NULL),
(62, 'S-12', 'ferch', 'BSL', '1', 1, '1.00', '1.00', '1', '2022-09-27 04:00:00', NULL),
(146, 'S-13', 'ferch', 'BSL', 'Mesa Madera', 1, '1.00', '0.01', NULL, '2022-09-27 04:00:00', NULL),
(147, 'S-14', 'ferch', 'BSL', 'Mesa Madera', 1, '1.00', '0.01', NULL, '2022-09-27 04:00:00', NULL),
(148, 'S-15', 'ferch', 'BSL', 'Mesa Madera', 1, '1.00', '0.01', NULL, '2022-09-27 04:00:00', NULL),
(149, 'S-16', 'ferch', 'BSL', 'Mesa Madera', 1, '1.00', '0.01', NULL, '2022-09-27 04:00:00', NULL),
(150, 'S-17', 'ferch', 'BSL', 'Mesa Madera', 1, '1.00', '0.01', NULL, '2022-09-27 04:00:00', NULL),
(151, 'S-18', 'ferch', 'BSL', 'Mesa Madera', 1, '1.00', '0.01', NULL, '2022-09-27 04:00:00', NULL),
(152, 'S-19', 'ferch', 'BSL', 'Mesa Madera', 1, '1.00', '0.01', NULL, '2022-09-27 04:00:00', NULL),
(153, 'S-20', 'ferch', 'BSL', 'Mesa Madera', 1, '1.00', '0.01', NULL, '2022-09-27 04:00:00', NULL),
(165, 'S1-1', 'ferch', 'BSL', 'Cómoda Azul', 3, '60.00', '30.00', NULL, '2022-10-09 04:00:00', NULL),
(166, 'S1-2', 'ferch', 'BSL', 'Cómoda Azul', 1, '60.00', '90.00', NULL, '2022-10-09 04:00:00', NULL),
(167, 'R-1', 'ferch', 'BSL', 'Ropero', 1, '70.00', '105.00', NULL, '2022-10-09 04:00:00', NULL),
(168, 'R-2', 'ferch', 'BSL', 'Ropero', 1, '70.00', '105.00', NULL, '2022-10-09 04:00:00', NULL),
(169, 'R-3', 'ferch', 'BSL', 'Ropero', 1, '70.00', '105.00', NULL, '2022-10-09 04:00:00', NULL),
(170, 'R-4', 'ferch', 'BSL', 'Ropero', 1, '70.00', '105.00', NULL, '2022-10-09 04:00:00', NULL),
(171, 'R-5', 'ferch', 'BSL', 'Ropero', 1, '70.00', '105.00', NULL, '2022-10-09 04:00:00', NULL),
(173, 'C1-1', 'ferch', 'BSL', 'Catres', 0, '100.00', '3.00', NULL, '2022-10-22 04:00:00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `misc`
--

CREATE TABLE `misc` (
  `telf` varchar(30) NOT NULL,
  `calle` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `nit` int(10) NOT NULL,
  `actividad` varchar(30) NOT NULL,
  `porcentaje` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `misc`
--

INSERT INTO `misc` (`telf`, `calle`, `nombre`, `nit`, `actividad`, `porcentaje`) VALUES
('60503503', 'Av. Vanguardia', 'Fernando', 0, 'Polleria', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `producto` varchar(50) NOT NULL,
  `codigo` varchar(15) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `producto`, `codigo`, `fecha`) VALUES
(2, 'Silla', 'S', '2022-09-12 00:56:57'),
(3, 'Mesa Madera', 'M', '2022-09-12 01:09:43'),
(4, 'AAaa', 'A', '2022-09-15 04:37:10'),
(5, 'Cómoda Azul', 'S1', '2022-10-10 00:57:20'),
(6, 'Ropero', 'R', '2022-10-10 01:05:58'),
(7, 'Catres', 'C1', '2022-10-22 18:15:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `IdProveedor` varchar(30) NOT NULL,
  `Telefono` varchar(17) DEFAULT NULL,
  `Correo` varchar(30) DEFAULT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`IdProveedor`, `Telefono`, `Correo`, `FechaCreacion`) VALUES
('BSL', NULL, NULL, '2022-09-11 18:20:55'),
('NOSE', '67067602', 'yo@gmail.com', '2022-09-06 01:44:46'),
('YT', '67067602', 'elfernando1a@gmail.com', '2022-09-08 05:14:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

CREATE TABLE `tienda` (
  `IdTIenda` int(11) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `IdProveedor` varchar(30) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  `qty` int(11) NOT NULL,
  `PrecioDeVenta` decimal(9,2) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `Observacion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`IdTIenda`, `Codigo`, `IdProveedor`, `Descripcion`, `qty`, `PrecioDeVenta`, `Fecha`, `Observacion`) VALUES
(5, 'S-2', 'BSL', '1', 0, '1.00', '2022-10-22 18:21:15', '1'),
(7, 'S-10', 'BSL', '1', 7, '149.43', '2022-10-22 18:52:36', '1'),
(9, 'C1-1', 'BSL', 'Catres', 48, '3.00', '2022-10-22 22:41:47', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `fechaCreacion` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user`, `password`, `role`, `fechaCreacion`) VALUES
('ferch', '123', 0, '2022-09-01 02:42:08'),
('USER', '123', 1, '2022-10-22 19:29:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `IdVenta` int(11) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `IdUsuario` varchar(50) NOT NULL,
  `IdProveedor` varchar(30) NOT NULL,
  `Descripcion` varchar(50) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `FacVenta` varchar(20) NOT NULL,
  `MontoPagado` decimal(9,2) NOT NULL,
  `PrecioProd` decimal(9,2) NOT NULL,
  `FechaVenta` timestamp NOT NULL DEFAULT current_timestamp(),
  `Cliente` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`IdVenta`, `Codigo`, `IdUsuario`, `IdProveedor`, `Descripcion`, `Cantidad`, `FacVenta`, `MontoPagado`, `PrecioProd`, `FechaVenta`, `Cliente`) VALUES
(17, 'S-11', 'ferch', 'BSL', '1', 2, 'X11', '12.00', '1.00', '2022-10-03 04:00:00', 'YO'),
(18, 'S-11', 'ferch', 'BSL', '1', 2, 'X11', '12.00', '1.00', '2022-10-03 04:00:00', 'EL'),
(19, 'S-11', 'ferch', 'BSL', '1', 2, 'X11', '12.00', '1.00', '2022-10-03 04:00:00', 'EL'),
(20, 'S-11', 'ferch', 'BSL', '1', 2, 'X11', '12.00', '1.00', '2022-10-03 04:00:00', 'EL'),
(21, 'S-11', 'ferch', 'BSL', '1', 2, 'X11', '12.00', '1.00', '2022-10-03 04:00:00', 'EL'),
(22, 'S-11', 'ferch', 'BSL', '1', 2, 'X11', '12.00', '1.00', '2022-10-03 04:00:00', 'EL'),
(23, 'M-1', 'ferch', 'BSL', '1', 2, 'X11', '12.00', '1.00', '2022-10-08 04:00:00', 'EL'),
(24, 'M-1', 'ferch', 'BSL', '2', 2, 'X11', '12.00', '1.00', '2022-10-08 04:00:00', 'EL'),
(25, 'M-1', 'ferch', 'BSL', '3', 2, 'X11', '12.00', '1.00', '2022-10-08 04:00:00', 'EL'),
(27, 'S-3', 'ferch', 'BSL', '1', 1, 'X11', '21.00', '1.00', '2022-10-09 04:00:00', 'FERCH'),
(34, 'R-2', 'ferch', 'BSL', 'Ropero', 1, 'X11', '189.00', '105.00', '2022-10-09 04:00:00', ''),
(44, 'S-2', 'ferch', 'BSL', '1', 1, 'X11', '12.00', '1.00', '2022-10-18 04:00:00', ''),
(49, 'S-2', 'ferch', 'BSL', '1', 1, 'X11', '2.00', '1.00', '2022-10-22 04:00:00', 'YO'),
(55, 'S-10', 'ferch', 'BSL', '1', 1, 'X11', '1000.00', '149.43', '2022-10-22 04:00:00', ''),
(56, 'S-10', 'ferch', 'BSL', '1', 1, 'X11', '150.00', '149.43', '2022-10-22 04:00:00', ''),
(57, 'S-10', 'ferch', 'BSL', '1', 1, 'X11', '1000.00', '149.43', '2022-10-22 04:00:00', ''),
(58, 'S-10', 'ferch', 'BSL', '1', 1, 'X11', '1000.00', '149.43', '2022-10-22 04:00:00', ''),
(59, 'S-10', 'ferch', 'BSL', '1', 1, 'X11', '1000.00', '149.43', '2022-10-22 04:00:00', ''),
(60, 'S-10', 'ferch', 'BSL', '1', 1, 'X121', '10000.00', '149.43', '2022-10-22 04:00:00', ''),
(61, 'C1-1', 'ferch', 'BSL', 'Catres', 2, 'X11', '5.00', '3.00', '2022-10-22 04:00:00', 'Luis'),
(63, 'C1-1', 'ferch', 'NOSE', 'AAAAAAAAAA silaa tv nose aA', 1, 'X11', '100.00', '1.00', '2022-09-30 01:00:55', ''),
(64, 'C1-1', 'ferch', 'BSL', 'Silla', 12, 'X11', '100.00', '1.00', '2021-10-29 01:01:40', ''),
(65, 'C1-1', 'ferch', 'BSL', 'Silla', 12, 'X11', '100.00', '1.00', '2022-11-24 01:04:15', ''),
(66, 'C1-1', 'ferch', 'BSL', 'Silla', 12, 'X11', '100.00', '1.00', '2022-02-01 01:13:42', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`IdCompra`),
  ADD UNIQUE KEY `Codigo` (`Codigo`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdProveedor` (`IdProveedor`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`IdProveedor`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`IdTIenda`),
  ADD KEY `Codigo` (`Codigo`),
  ADD KEY `IdProveedor` (`IdProveedor`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`IdVenta`),
  ADD KEY `fk_codigo` (`Codigo`),
  ADD KEY `fk_idusuario` (`IdUsuario`),
  ADD KEY `fk_idproveedor` (`IdProveedor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `IdCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `IdTIenda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `IdVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `users` (`user`),
  ADD CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`IdProveedor`) REFERENCES `proveedores` (`IdProveedor`);

--
-- Filtros para la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD CONSTRAINT `tienda_ibfk_1` FOREIGN KEY (`Codigo`) REFERENCES `compras` (`Codigo`),
  ADD CONSTRAINT `tienda_ibfk_2` FOREIGN KEY (`IdProveedor`) REFERENCES `proveedores` (`IdProveedor`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_codigo` FOREIGN KEY (`Codigo`) REFERENCES `compras` (`Codigo`),
  ADD CONSTRAINT `fk_idproveedor` FOREIGN KEY (`IdProveedor`) REFERENCES `proveedores` (`IdProveedor`),
  ADD CONSTRAINT `fk_idusuario` FOREIGN KEY (`IdUsuario`) REFERENCES `users` (`user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
