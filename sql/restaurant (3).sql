-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-10-2022 a las 04:34:57
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
  `FechaCompra` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`IdCompra`, `Codigo`, `IdUsuario`, `IdProveedor`, `Descripcion`, `Cantidad`, `MontoTotal`, `PrecioVenta`, `Observacion`, `FechaCompra`) VALUES
(175, 'S1-1', 'ferch', 'BSL', 'Silla Grande', 0, '100.00', '150.00', NULL, '2022-10-23 04:00:00'),
(176, 'S1-2', 'ferch', 'BSL', 'Silla Grande', 3, '100.00', '30.00', 'colores distintos', '2022-10-23 04:00:00'),
(177, 'M1-1', 'ferch', 'BSL', 'Mesas', 10, '500.00', '40.00', NULL, '2022-10-23 04:00:00');

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
(8, 'Silla Grande', 'S1', '2022-10-23 19:13:19'),
(9, 'Mesas', 'M1', '2022-10-23 19:19:15');

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
('BSL', '67067602', NULL, '2022-10-23 19:11:14');

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
(10, 'S1-1', 'BSL', 'Silla Grande', 0, '150.00', '2022-10-23 19:14:26', ''),
(11, 'S1-2', 'BSL', 'Silla Grande', 0, '30.00', '2022-10-23 19:17:25', 'colores distintos'),
(12, 'M1-1', 'BSL', 'Mesas', 0, '40.00', '2022-10-23 19:19:53', '');

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
(76, 'S1-1', 'ferch', 'BSL', 'Silla Grande', 1, 'X12', '200.00', '150.00', '2022-10-23 04:00:00', 'Luis'),
(77, 'S1-2', 'ferch', 'BSL', 'Silla Grande', 1, 'X11', '50.00', '30.00', '2022-10-23 04:00:00', 'Jose'),
(78, 'M1-1', 'ferch', 'BSL', 'Mesas', 1, 'X13', '50.00', '40.00', '2022-10-23 04:00:00', ''),
(79, 'm1-1', 'USER', 'BSL', 'Mesas', 2, '1234567', '50.00', '40.00', '2022-10-23 04:00:00', 'juan perez'),
(80, 'm1-1', 'USER', 'BSL', 'Mesas', 1, '52525', '55.00', '40.00', '2022-10-23 04:00:00', 'hugo suarez'),
(81, 'm1-1', 'USER', 'BSL', 'Mesas', 1, '454679º', '40.00', '40.00', '2022-10-23 04:00:00', 'hugo suarez'),
(82, 'M1-1', 'ferch', 'BSL', 'Mesas', 1, '123', '50.00', '40.00', '2022-10-23 04:00:00', ''),
(83, 'm1-1', 'ferch', 'BSL', 'Mesas', 1, 'X22', '50.00', '40.00', '2022-10-23 04:00:00', ''),
(84, 'm1-1', 'ferch', 'BSL', 'Mesas', 1, 'X11', '50.00', '40.00', '2022-10-23 04:00:00', ''),
(85, 'm1-1', 'ferch', 'BSL', 'Mesas', 1, 'X11', '50.00', '40.00', '2022-10-23 04:00:00', ''),
(86, 'm1-1', 'ferch', 'BSL', 'Mesas', 1, '11', '50.00', '40.00', '2022-10-23 04:00:00', ''),
(87, 's1-2', 'ferch', 'BSL', 'Silla Grande', 1, 'X11', '30.00', '30.00', '2022-10-23 04:00:00', '');

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
  MODIFY `IdCompra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `IdTIenda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `IdVenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `users` (`user`);

--
-- Filtros para la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD CONSTRAINT `tienda_ibfk_1` FOREIGN KEY (`Codigo`) REFERENCES `compras` (`Codigo`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_codigo` FOREIGN KEY (`Codigo`) REFERENCES `compras` (`Codigo`),
  ADD CONSTRAINT `fk_idusuario` FOREIGN KEY (`IdUsuario`) REFERENCES `users` (`user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
