-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 12, 2013 at 06:52 AM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `tbl_before_casting`
--

CREATE TABLE IF NOT EXISTS `tbl_before_casting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `shift_id` int(11) NOT NULL,
  `lre` tinyint(1) DEFAULT NULL,
  `lre_comment` text NOT NULL,
  `cte` tinyint(1) DEFAULT NULL,
  `cte_comment` text NOT NULL,
  `lte` tinyint(1) DEFAULT NULL,
  `lte_comment` text NOT NULL,
  `cpp` tinyint(1) DEFAULT NULL,
  `cpp_comment` text NOT NULL,
  `frs` tinyint(1) DEFAULT NULL,
  `frs_comment` text NOT NULL,
  `cdd` tinyint(1) DEFAULT NULL,
  `cdd_comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
