-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 14, 2013 at 11:09 AM
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
  `lre` enum('Yes','No','N/A') NOT NULL,
  `lre_comment` text NOT NULL,
  `cte` enum('Yes','No','N/A') NOT NULL,
  `cte_comment` text NOT NULL,
  `lte` enum('Yes','No','N/A') NOT NULL,
  `lte_comment` text NOT NULL,
  `cpp` enum('Yes','No','N/A') NOT NULL,
  `cpp_comment` text NOT NULL,
  `frs` enum('Yes','No','N/A') NOT NULL,
  `frs_comment` text NOT NULL,
  `cdd` enum('Yes','No','N/A') NOT NULL,
  `cdd_comment` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
