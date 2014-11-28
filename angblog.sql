-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 28-11-2014 a las 15:34:04
-- Versión del servidor: 5.6.12-log
-- Versión de PHP: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `angblog`
--
CREATE DATABASE IF NOT EXISTS `angblog` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `angblog`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE IF NOT EXISTS `autores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`id`, `nombre`, `email`) VALUES
(1, 'Peter', 'peter@peter.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'misc'),
(2, 'Personal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `config`
--

CREATE TABLE IF NOT EXISTS `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `val` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `config`
--

INSERT INTO `config` (`id`, `name`, `val`) VALUES
(2, 'descrip', 'Just an Ang Blog'),
(3, 'titulo', 'Ang Blog');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nav`
--

CREATE TABLE IF NOT EXISTS `nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  `url` varchar(50) NOT NULL,
  `class` varchar(50) NOT NULL,
  `order` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `nav`
--

INSERT INTO `nav` (`id`, `label`, `url`, `class`, `order`) VALUES
(3, 'Informacion', '#/archivo/categoria/1/misc', '', 1),
(4, 'Admin', '#/admin', '', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `body` text NOT NULL,
  `autor` int(10) NOT NULL,
  `fecha` date NOT NULL,
  `categoria` int(10) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoria` (`categoria`),
  KEY `autor` (`autor`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `titulo`, `body`, `autor`, `fecha`, `categoria`, `imagen`) VALUES
(8, 'Welcome', '<p>Lorem fistrum la caidita diodeno está la cosa muy malar tiene musho peligro papaar papaar diodenoo. No puedor diodeno a gramenawer ese que llega a gramenawer por la gloria de mi madre. Ese pedazo de diodenoo diodenoo qué dise usteer. Qué dise usteer al ataquerl apetecan de la pradera benemeritaar mamaar sexuarl. A wan caballo blanco caballo negroorl ahorarr por la gloria de mi madre a gramenawer ahorarr diodenoo te voy a borrar el cerito a wan. Ese hombree ese hombree ese que llega torpedo te va a hasé pupitaa ahorarr ahorarr pecador se calle ustée condemor.\n\nCondemor la caidita quietooor apetecan caballo blanco caballo negroorl no te digo trigo por no llamarte Rodrigor. Mamaar por la gloria de mi madre ese que llega condemor benemeritaar no te digo trigo por no llamarte Rodrigor a peich diodeno de la pradera a wan. No te digo trigo por no llamarte Rodrigor no te digo trigo por no llamarte Rodrigor diodenoo amatomaa ese hombree. Va usté muy cargadoo está la cosa muy malar benemeritaar de la pradera ahorarr de la pradera a wan va usté muy cargadoo. Papaar papaar benemeritaar sexuarl está la cosa muy malar benemeritaar apetecan diodeno torpedo sexuarl ese que llega apetecan. Ese hombree benemeritaar la caidita jarl. Por la gloria de mi madre al ataquerl torpedo qué dise usteer me cago en tus muelas ahorarr mamaar fistro.\n\nPapaar papaar se calle ustée mamaar diodenoo torpedo quietooor quietooor. No te digo trigo por no llamarte Rodrigor qué dise usteer está la cosa muy malar amatomaa amatomaa diodeno te va a hasé pupitaa me cago en tus muelas. Al ataquerl pupita llevame al sircoo no puedor torpedo papaar papaar se calle ustée mamaar hasta luego Lucas a peich te voy a borrar el cerito. No puedor apetecan al ataquerl caballo blanco caballo negroorl diodeno no te digo trigo por no llamarte Rodrigor. Está la cosa muy malar al ataquerl caballo blanco caballo negroorl pupita ese que llega ese que llega benemeritaar apetecan. Al ataquerl por la gloria de mi madre te voy a borrar el cerito a gramenawer amatomaa ese pedazo de apetecan qué dise usteer qué dise usteer está la cosa muy malar mamaar. Apetecan pupita fistro me cago en tus muelas diodenoo tiene musho peligro ahorarr condemor hasta luego Lucas pupita te voy a borrar el cerito.</p>', 1, '2014-11-27', 1, 'http://placekitten.com/g/300/300'),
(9, 'Lorem Ipsum', '<p>Lorem fistrum de la pradera no te digo trigo por no llamarte Rodrigor ese hombree ex condemor está la cosa muy malar. Condemor llevame al sircoo incididunt de la pradera ese pedazo de no puedor al ataquerl voluptate pupita diodenoo ahorarr. Aliquip ut qué dise usteer consequat qué dise usteer te voy a borrar el cerito torpedo está la cosa muy malar. Pecador eiusmod dolor condemor cillum adipisicing ese que llega. Está la cosa muy malar sed ahorarr qui jarl. Ese pedazo de qui incididunt no puedor nisi va usté muy cargadoo. De la pradera mamaar mamaar aliquip aute elit ese pedazo de duis nostrud voluptate caballo blanco caballo negroorl. Quis cillum enim officia ese hombree irure cillum a peich ut duis por la gloria de mi madre.\n\nCommodo sit amet magna jarl nisi llevame al sircoo qué dise usteer et eiusmod mamaar ad. Me cago en tus muelas de la pradera veniam ad elit pecador condemor. Esse magna está la cosa muy malar dolore esse. Se calle ustée ese que llega mamaar sit amet ese que llega aliqua ullamco. Veniam magna veniam sed ese que llega sexuarl. Jarl se calle ustée consequat por la gloria de mi madre labore al ataquerl exercitation por la gloria de mi madre te va a hasé pupitaa esse. Te va a hasé pupitaa la caidita incididunt está la cosa muy malar enim voluptate a gramenawer ahorarr hasta luego Lucas. Pupita dolore nisi caballo blanco caballo negroorl me cago en tus muelas veniam quis aute. Aliquip se calle ustée ese que llega te voy a borrar el cerito a peich quis la caidita a wan dolore.\n\n</p>', 1, '2014-11-13', 2, 'http://placekitten.com/g/300/300');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `rol` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `rol`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `widgets`
--

CREATE TABLE IF NOT EXISTS `widgets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `html` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `widgets`
--

INSERT INTO `widgets` (`id`, `nombre`, `html`) VALUES
(1, 'About', '<p>Lorem fistrum de la pradera no te digo trigo por no llamarte Rodrigor ese hombree ex condemor está la cosa muy malar. Condemor</p>');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`autor`) REFERENCES `autores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
