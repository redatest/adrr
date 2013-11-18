-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 18, 2013 at 04:16 PM
-- Server version: 5.5.32
-- PHP Version: 5.3.10-1ubuntu3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `conc`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_during_casting`
--

CREATE TABLE IF NOT EXISTS `tbl_during_casting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `shift_id` int(11) NOT NULL,
  `location` enum('Yes','No','N/A') NOT NULL,
  `location_cmt` text NOT NULL,
  `precaution` enum('Yes','No','N/A') NOT NULL,
  `precaution_cmt` text NOT NULL,
  `formwork` enum('Yes','No','N/A') NOT NULL,
  `formwork_cmt` text NOT NULL,
  `contractor` enum('Yes','No','N/A') NOT NULL,
  `contractor_cmt` text NOT NULL,
  `consultant` enum('Yes','No','N/A') NOT NULL,
  `consultant_cmt` text NOT NULL,
  `drop_height` enum('Yes','No','N/A') NOT NULL,
  `drop_height_cmt` text NOT NULL,
  `vibration` enum('Yes','No','N/A') NOT NULL,
  `vibration_cmt` text NOT NULL,
  `finishing` enum('Yes','No','N/A') NOT NULL,
  `finishing_cmt` text NOT NULL,
  `curing` enum('Yes','No','N/A') NOT NULL,
  `curing_cmt` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
