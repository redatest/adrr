-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 19, 2013 at 06:28 PM
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
CREATE DATABASE IF NOT EXISTS `conc` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `conc`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_before_casting`
--

CREATE TABLE IF NOT EXISTS `tbl_before_casting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `shift_id` int(11) NOT NULL,
  `ir` int(11) NOT NULL,
  `lre` enum('Yes','No','N/A') NOT NULL,
  `lre_comment` text,
  `cte` enum('Yes','No','N/A') NOT NULL,
  `cte_comment` text,
  `lte` enum('Yes','No','N/A') NOT NULL,
  `lte_comment` text,
  `cpp` enum('Yes','No','N/A') NOT NULL,
  `cpp_comment` text,
  `frs` enum('Yes','No','N/A') NOT NULL,
  `frs_comment` text,
  `cdd` enum('Yes','No','N/A') NOT NULL,
  `cdd_comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `tbl_before_casting`
--

INSERT INTO `tbl_before_casting` (`id`, `user_id`, `date`, `shift_id`, `ir`, `lre`, `lre_comment`, `cte`, `cte_comment`, `lte`, `lte_comment`, `cpp`, `cpp_comment`, `frs`, `frs_comment`, `cdd`, `cdd_comment`) VALUES
(1, 2, '2013-11-14', 2, 0, 'Yes', '123', 'Yes', '123', 'No', '123', 'N/A', '', 'N/A', '123', 'N/A', '123'),
(2, 2, '2013-11-14', 1, 0, 'N/A', '123', 'N/A', '123', 'N/A', '123', 'N/A', '123', 'N/A', '123', 'N/A', '123'),
(3, 2, '2013-11-14', 1, 0, 'N/A', '123', 'N/A', '123', 'N/A', '123', 'N/A', '123', 'N/A', '123', 'N/A', '123'),
(4, 2, '2013-11-17', 2, 12, 'N/A', NULL, 'N/A', NULL, 'N/A', NULL, 'N/A', NULL, 'N/A', NULL, 'N/A', NULL),
(5, 2, '2013-11-19', 1, 12, 'N/A', NULL, 'N/A', NULL, 'N/A', NULL, 'N/A', NULL, 'N/A', NULL, 'N/A', NULL),
(6, 2, '2013-11-17', 2, 12, 'N/A', NULL, 'N/A', NULL, 'Yes', NULL, 'No', NULL, 'No', NULL, 'No', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_concrete_type`
--

CREATE TABLE IF NOT EXISTS `tbl_concrete_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` enum('flow','slump') NOT NULL,
  `flow_norm_from` int(11) DEFAULT NULL,
  `flow_norm_to` int(11) DEFAULT NULL,
  `flow_acpt_from` int(11) DEFAULT NULL,
  `flow_acpt_to` int(11) DEFAULT NULL,
  `slump_norm_from` int(11) DEFAULT NULL,
  `slump_norm_to` int(11) DEFAULT NULL,
  `slump_acpt_from` int(11) DEFAULT NULL,
  `slump_acpt_to` int(11) DEFAULT NULL,
  `temp_from` int(11) NOT NULL,
  `temp_to` int(11) NOT NULL,
  `dept_start` time NOT NULL,
  `dept_end` time NOT NULL,
  `very_frequent` tinyint(1) NOT NULL DEFAULT '0',
  `sample_counter` int(11) DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_concrete_type`
--

INSERT INTO `tbl_concrete_type` (`id`, `name`, `category`, `flow_norm_from`, `flow_norm_to`, `flow_acpt_from`, `flow_acpt_to`, `slump_norm_from`, `slump_norm_to`, `slump_acpt_from`, `slump_acpt_to`, `temp_from`, `temp_to`, `dept_start`, `dept_end`, `very_frequent`, `sample_counter`, `note`) VALUES
(1, 'First Concrete Type', 'flow', 5, 9, 2, 20, NULL, NULL, NULL, NULL, 1, 12, '02:20:00', '02:30:00', 1, NULL, ''),
(2, 'Second Concrete Type', 'slump', NULL, NULL, NULL, NULL, 5, 10, 2, 20, 1, 12, '02:00:00', '02:00:00', 1, NULL, ''),
(3, 'Third Conc Type', 'slump', NULL, NULL, NULL, NULL, 5, 10, 1, 15, 5, 10, '00:00:00', '00:00:00', 1, NULL, ''),
(4, 'Fourth', 'flow', 5, 10, 1, 15, NULL, NULL, NULL, NULL, 5, 10, '00:00:00', '00:00:00', 0, NULL, '');

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
  `location_cmt` text,
  `precaution` enum('Yes','No','N/A') NOT NULL,
  `precaution_cmt` text,
  `formwork` enum('Yes','No','N/A') NOT NULL,
  `formwork_cmt` text,
  `contractor` enum('Yes','No','N/A') NOT NULL,
  `contractor_cmt` text,
  `consultant` enum('Yes','No','N/A') NOT NULL,
  `consultant_cmt` text,
  `drop_height` enum('Yes','No','N/A') NOT NULL,
  `drop_height_cmt` text,
  `vibration` enum('Yes','No','N/A') NOT NULL,
  `vibration_cmt` text,
  `finishing` enum('Yes','No','N/A') NOT NULL,
  `finishing_cmt` text,
  `curing` enum('Yes','No','N/A') NOT NULL,
  `curing_cmt` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ir`
--

CREATE TABLE IF NOT EXISTS `tbl_ir` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ir` int(11) NOT NULL,
  `zone_id` int(11) NOT NULL,
  `area` varchar(255) NOT NULL,
  `volume` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_ir`
--

INSERT INTO `tbl_ir` (`id`, `ir`, `zone_id`, `area`, `volume`, `project_id`) VALUES
(1, 123, 13, 'asdf', 123, NULL),
(2, 234, 20, 'asdf', 123, NULL),
(4, 12, 11, 'sadf', 21, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ir_al`
--

CREATE TABLE IF NOT EXISTS `tbl_ir_al` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ir_id` int(11) NOT NULL,
  `axis` text NOT NULL,
  `level` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tbl_ir_al`
--

INSERT INTO `tbl_ir_al` (`id`, `ir_id`, `axis`, `level`) VALUES
(1, 1, 'asdf', 'asdf'),
(2, 4, 'asdf', 'asd'),
(3, 4, 'fds', 'sd');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ir_pt`
--

CREATE TABLE IF NOT EXISTS `tbl_ir_pt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ir_id` int(11) NOT NULL,
  `pouring_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tbl_ir_pt`
--

INSERT INTO `tbl_ir_pt` (`id`, `ir_id`, `pouring_type_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(5, 1, 2),
(7, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lab`
--

CREATE TABLE IF NOT EXISTS `tbl_lab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `shift_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `conc_type_id` int(11) NOT NULL,
  `plant` int(11) NOT NULL,
  `truck` int(11) NOT NULL,
  `ticket` varchar(255) NOT NULL,
  `dept_time` datetime NOT NULL,
  `arriv_time` datetime NOT NULL,
  `truck_load` int(11) NOT NULL DEFAULT '12',
  `temp` int(11) NOT NULL,
  `slump` int(11) DEFAULT NULL,
  `flow` int(11) DEFAULT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  `red` set('flow','slump','temp') DEFAULT NULL,
  `yellow` set('flow','slump') DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `returned` tinyint(1) NOT NULL DEFAULT '0',
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `update` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `tbl_lab`
--

INSERT INTO `tbl_lab` (`id`, `user_id`, `date`, `shift_id`, `supplier_id`, `conc_type_id`, `plant`, `truck`, `ticket`, `dept_time`, `arriv_time`, `truck_load`, `temp`, `slump`, `flow`, `accepted`, `red`, `yellow`, `create_time`, `returned`, `approved`, `archived`, `update`) VALUES
(1, 2, '2013-11-01', 1, 1, 1, 9, 9, '22', '2013-11-01 23:09:00', '2013-11-01 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-01 20:43:55', 0, 0, 1, '2013-11-13 15:54:02'),
(2, 2, '2013-11-01', 1, 1, 1, 11, 11, '11', '2013-11-01 11:01:00', '2013-11-01 11:11:00', 11, 11, NULL, 11, 1, NULL, 'flow', '2013-11-01 20:44:39', 0, 0, 1, '2013-11-13 15:54:02'),
(3, 2, '2013-11-01', 1, 1, 1, 99, 99, '99', '2013-11-01 23:09:00', '2013-11-01 23:59:00', 12, 99, NULL, 99, 1, 'flow,temp', 'flow', '2013-11-01 20:46:51', 1, 0, 0, '2013-11-13 19:29:56'),
(4, 2, '2013-11-03', 1, 1, 1, 123, 123, '33', '2013-11-03 12:21:00', '2013-11-03 12:59:00', 12, 4123, NULL, 123, 1, 'flow,temp', 'flow', '2013-11-03 09:54:28', 0, 0, 0, '2013-11-11 05:41:45'),
(5, 2, '2013-11-03', 1, 1, 2, 234523, 2345, '44', '2013-11-03 23:04:00', '2013-11-03 23:59:00', 12, 345, 345, NULL, 0, 'slump,temp', 'slump', '2013-11-03 10:23:10', 0, 0, 0, '2013-11-11 05:41:45'),
(6, 2, '2013-11-04', 1, 1, 1, 9, 9, '55', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 12, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:56:00', 0, 0, 0, '2013-11-11 05:41:45'),
(7, 2, '2013-11-04', 1, 1, 1, 9, 9, '66', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:56:25', 0, 0, 0, '2013-11-11 05:41:45'),
(8, 2, '2013-11-04', 2, 1, 1, 9, 9, '77', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:56:52', 0, 0, 0, '2013-11-11 05:41:45'),
(9, 2, '2013-11-04', 1, 1, 1, 9, 9, '88', '2013-11-04 09:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:57:11', 0, 0, 0, '2013-11-11 05:41:45'),
(10, 2, '2013-11-04', 1, 1, 1, 99, 99, '111', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:57:40', 0, 0, 0, '2013-11-11 05:41:45'),
(11, 2, '2013-11-04', 1, 1, 1, 9, 9, '222', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:57:57', 0, 0, 0, '2013-11-11 05:41:45'),
(12, 2, '2013-11-04', 1, 1, 1, 9, 9, '333', '2013-11-04 08:09:00', '2013-11-04 23:09:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:58:22', 0, 0, 0, '2013-11-11 05:41:45'),
(13, 2, '2013-11-04', 1, 1, 1, 9, 9, '444', '2013-11-04 22:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 8, 1, NULL, NULL, '2013-11-04 02:58:39', 0, 0, 0, '2013-11-11 05:41:45'),
(14, 2, '2013-11-05', 2, 2, 2, 9, 9, '555', '2013-11-05 09:09:00', '2013-11-05 09:59:00', 9, 11, 9, NULL, 1, NULL, NULL, '2013-11-05 02:13:26', 0, 0, 0, '2013-11-11 05:41:45'),
(17, 2, '2013-11-06', 1, 1, 2, 1234, 1234, '666', '2013-11-06 21:59:00', '2013-11-06 23:59:00', 12, 1234, 1234, NULL, 1, 'slump,temp', 'slump', '2013-11-06 09:28:01', 0, 0, 0, '2013-11-11 05:41:45'),
(18, 2, '2013-11-06', 1, 2, 2, 435, 345, '777', '2013-11-06 23:03:00', '2013-11-06 23:59:00', 12, 345, 345, NULL, 1, 'slump,temp', 'slump', '2013-11-06 10:52:26', 0, 0, 0, '2013-11-11 05:41:45'),
(23, 2, '2013-11-05', 1, 2, 2, 99, 99, '888', '2013-11-05 12:00:00', '2013-11-05 14:00:00', 8, 999, 99, NULL, 0, 'slump,temp', NULL, '2013-11-06 19:58:50', 0, 0, 0, '2013-11-11 05:41:45'),
(24, 2, '2013-11-05', 1, 2, 2, 9, 99, '999', '2013-11-05 12:00:00', '2013-11-05 13:05:00', 9, 99, 99, NULL, 1, 'slump,temp', NULL, '2013-11-06 20:08:06', 0, 0, 0, '2013-11-11 05:41:45'),
(25, 2, '2013-11-05', 1, 2, 2, 99, 99, '1111', '2013-11-05 12:00:00', '2013-11-05 13:03:00', 9, 999, 999, NULL, 1, 'slump,temp', NULL, '2013-11-06 20:08:59', 0, 0, 0, '2013-11-11 05:41:45'),
(26, 2, '2013-11-07', 1, 1, 2, 123, 123, '2222', '2013-11-07 01:01:00', '2013-11-07 02:02:00', 12, 123, 123, NULL, 1, 'slump,temp', '', '2013-11-07 19:28:57', 0, 0, 0, '2013-11-11 05:41:45');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lab_comment`
--

CREATE TABLE IF NOT EXISTS `tbl_lab_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lab_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_lab_comment`
--

INSERT INTO `tbl_lab_comment` (`id`, `lab_id`, `user_id`, `comment`, `date_time`) VALUES
(1, 1, 1, '123', '2013-11-13 11:37:16'),
(2, 3, 1, 'asdf', '2013-11-13 19:29:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lab_temperature`
--

CREATE TABLE IF NOT EXISTS `tbl_lab_temperature` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `shift_type_id` int(11) NOT NULL,
  `date_time` datetime NOT NULL,
  `time` time NOT NULL,
  `temp` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `tbl_lab_temperature`
--

INSERT INTO `tbl_lab_temperature` (`id`, `user_id`, `shift_type_id`, `date_time`, `time`, `temp`) VALUES
(1, 2, 1, '2013-11-02 00:00:00', '12:00:00', 22.5),
(2, 2, 1, '2013-11-02 01:55:59', '23:59:00', 9.9),
(3, 2, 1, '2013-11-02 01:59:19', '23:09:00', 99.9),
(4, 2, 1, '2013-11-02 01:59:39', '23:09:00', 99.99),
(5, 2, 1, '2013-11-02 02:00:27', '11:11:00', 11);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

CREATE TABLE IF NOT EXISTS `tbl_notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `tbl_notification`
--

INSERT INTO `tbl_notification` (`id`, `message_id`, `user_id`, `read`) VALUES
(1, 1, 1, 0),
(2, 2, 1, 0),
(3, 3, 1, 0),
(4, 4, 1, 0),
(5, 5, 1, 0),
(6, 6, 1, 0),
(7, 7, 1, 0),
(8, 8, 1, 0),
(9, 9, 1, 0),
(10, 10, 1, 0),
(11, 11, 1, 0),
(12, 12, 1, 0),
(13, 13, 1, 0),
(14, 14, 1, 0),
(15, 15, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification_message`
--

CREATE TABLE IF NOT EXISTS `tbl_notification_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `link` text NOT NULL,
  `target` text NOT NULL,
  `model` varchar(255) NOT NULL,
  `record_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `one_response` tinyint(1) NOT NULL DEFAULT '0',
  `unregistered` tinyint(1) NOT NULL DEFAULT '0',
  `read` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `tbl_notification_message`
--

INSERT INTO `tbl_notification_message` (`id`, `message`, `link`, `target`, `model`, `record_id`, `type`, `one_response`, `unregistered`, `read`) VALUES
(1, '@Lab in flow', 'the link goes here', '{"roles":["senior"]}', 'Lab', 2, 'yellow', 1, 0, 1),
(2, '@Lab in flow', 'the link goes here', '{"roles":["senior"]}', 'Lab', 2, 'yellow', 1, 0, 1),
(3, '@Lab in temp,flow', 'the link goes here', '{"roles":["senior"]}', 'Lab', 3, 'red', 1, 0, 1),
(4, '@Lab in temp,flow', 'the link goes here', '{"roles":["senior"]}', 'Lab', 4, 'red', 1, 0, 0),
(5, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 5, 'red', 1, 0, 0),
(6, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 15, 'red', 1, 0, 0),
(7, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 16, 'red', 1, 0, 0),
(8, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 17, 'red', 1, 0, 0),
(9, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 18, 'red', 1, 0, 0),
(10, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 20, 'red', 1, 0, 0),
(11, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 21, 'red', 1, 0, 0),
(12, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 23, 'red', 1, 0, 0),
(13, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 24, 'red', 1, 0, 0),
(14, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 25, 'red', 1, 0, 0),
(15, '@Lab in temp,slump', 'the link goes here', '{"roles":["senior"]}', 'Lab', 26, 'red', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pouring`
--

CREATE TABLE IF NOT EXISTS `tbl_pouring` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `pouring_type_id` int(11) DEFAULT NULL,
  `ir` int(11) DEFAULT NULL,
  `zone_id` int(11) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `axis` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `est_vol` int(11) DEFAULT NULL,
  `ticket` int(11) DEFAULT NULL,
  `truck` int(11) DEFAULT NULL,
  `conc_type_id` int(11) DEFAULT NULL,
  `truck_load` int(11) DEFAULT NULL,
  `poured_qty` int(11) DEFAULT NULL,
  `dept_time` datetime DEFAULT NULL,
  `slump_b` int(11) DEFAULT NULL,
  `hrwr` int(11) DEFAULT NULL,
  `water` int(11) DEFAULT NULL,
  `slump_a` int(11) DEFAULT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  `pump_id` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `red` tinyint(1) NOT NULL DEFAULT '0',
  `yellow` tinyint(1) NOT NULL DEFAULT '0',
  `returned` tinyint(1) NOT NULL DEFAULT '0',
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `draft` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL,
  `update` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `tbl_pouring`
--

INSERT INTO `tbl_pouring` (`id`, `date`, `user_id`, `shift_id`, `supplier_id`, `pouring_type_id`, `ir`, `zone_id`, `area`, `axis`, `level`, `est_vol`, `ticket`, `truck`, `conc_type_id`, `truck_load`, `poured_qty`, `dept_time`, `slump_b`, `hrwr`, `water`, `slump_a`, `accepted`, `pump_id`, `start_time`, `end_time`, `red`, `yellow`, `returned`, `approved`, `archived`, `draft`, `create_time`, `update`) VALUES
(5, '2013-10-07', 2, 1, 1, 3, 12, 11, 'sadf', 'asdf', 'asd', 21, 11, 11, 1, 11, 1, '2013-11-01 11:01:00', 56, 345, 345, 345, 1, 3, '2013-10-07 03:04:00', '2013-10-07 04:04:00', 0, 0, 0, 0, 0, 0, '2013-11-14 17:16:45', '2013-11-16 14:20:17'),
(6, '2013-10-07', 2, 1, 1, 3, 12, 11, 'sadf', 'asdf', 'asd', 21, 11, 11, 1, 11, 2, '2013-11-01 11:01:00', 12, 21, 12, 21, 1, 3, '2013-10-07 12:12:00', '2013-10-07 12:12:00', 0, 0, 0, 0, 0, 0, '2013-11-15 14:48:41', '2013-11-15 14:48:41'),
(7, '2013-10-07', 2, 1, 1, 3, 12, 11, 'sadf', 'asdf', 'asd', 21, 11, 11, 1, 11, 2, '2013-11-01 11:01:00', 3, 3, 3, 3, 1, 3, '2013-10-07 01:01:00', '2013-10-07 01:01:00', 0, 0, 0, 0, 0, 0, '2013-11-15 14:50:40', '2013-11-15 14:50:40'),
(8, '2013-10-07', 2, 1, 1, 3, 12, 11, 'sadf', 'asdf', 'asd', 21, 11, 11, 1, 11, 1, '2013-11-01 11:01:00', 2, 2, 2, 2, 1, 4, '2013-10-07 03:03:00', '2013-10-07 03:03:00', 0, 0, 0, 0, 0, 0, '2013-11-15 14:52:38', '2013-11-15 14:52:38'),
(9, '2013-10-07', 2, 1, 1, 3, 12, 11, 'sadf', 'asdf', 'asd', 21, 11, 11, 1, 11, 1, '2013-11-01 11:01:00', 21, 12, 12, 21, 1, 4, '2013-10-07 01:01:00', '2013-10-07 01:01:00', 0, 0, 0, 0, 0, 0, '2013-11-15 14:54:51', '2013-11-16 14:11:05'),
(10, '2013-10-07', 2, 1, 1, 1, 123, 13, 'asdf', 'asdf', 'asdf', 123, 22, 9, 1, 9, 1, '2013-11-01 23:09:00', 9, 9, 9, 9, 1, 3, '2013-10-07 03:03:00', '2013-10-07 03:03:00', 0, 0, 0, 0, 0, 0, '2013-11-15 16:07:38', '2013-11-16 14:20:45'),
(11, '2013-11-15', 2, 2, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 0, 0, 0, 0, 1, '2013-11-16 14:21:20', '2013-11-16 14:21:20'),
(12, '2013-10-07', 2, 1, 1, 1, 123, 13, 'asdf', 'asdf', 'asdf', 123, 11, 11, 1, 11, 4, '2013-11-01 11:01:00', 3, 3, 3, 3, 1, 3, '2013-10-07 03:03:00', '2013-10-07 03:03:00', 0, 0, 0, 0, 0, 0, '2013-11-16 14:57:45', '2013-11-16 14:57:45'),
(13, '2013-10-07', 2, 1, 1, 3, 12, 11, 'sadf', 'asdf', 'asd', 21, 22, 9, 1, 9, 2, '2013-11-01 23:09:00', NULL, NULL, NULL, NULL, 1, 4, '2013-10-07 01:30:00', '2013-10-07 01:39:00', 0, 1, 0, 0, 0, 0, '2013-11-18 16:03:08', '2013-11-18 16:03:08'),
(14, '2013-10-07', 2, 1, 1, 3, 12, 11, 'sadf', 'asdf', 'asd', 21, 22, 9, 1, 9, 2, '2013-11-01 23:09:00', NULL, NULL, NULL, NULL, 1, 4, '2013-10-07 01:30:00', '2013-10-07 01:40:00', 1, 1, 0, 0, 0, 0, '2013-11-18 16:04:07', '2013-11-18 16:28:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pouring_comment`
--

CREATE TABLE IF NOT EXISTS `tbl_pouring_comment` (
  `id` int(11) NOT NULL,
  `pouring_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `date_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_pouring_comment`
--

INSERT INTO `tbl_pouring_comment` (`id`, `pouring_id`, `user_id`, `comment`, `date_time`) VALUES
(0, 1, 1, 'check it again please', '2013-11-14 05:30:08'),
(0, 1, 2, 'cool man', '2013-11-14 05:34:19'),
(0, 2, 1, 'check this out please', '2013-11-14 10:43:45'),
(0, 13, 2, 'asdf', '2013-11-18 16:03:08'),
(0, 14, 2, 'asdf', '2013-11-18 16:04:07');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pouring_type`
--

CREATE TABLE IF NOT EXISTS `tbl_pouring_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '1',
  `v_r` enum('hor','ver') CHARACTER SET latin1 NOT NULL,
  `priority` enum('normal','medium','high','urgent') CHARACTER SET latin1 NOT NULL,
  `very_frequent` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tbl_pouring_type`
--

INSERT INTO `tbl_pouring_type` (`id`, `name`, `state`, `v_r`, `priority`, `very_frequent`) VALUES
(1, 'First Pouring Type', 1, 'hor', 'high', 1),
(2, 'Second Pouring Type', 1, 'hor', 'high', 0),
(3, 'Third Pouring Type', 1, 'ver', 'medium', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profiles`
--

CREATE TABLE IF NOT EXISTS `tbl_profiles` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `emp_num` int(11) NOT NULL DEFAULT '0',
  `mobile` text NOT NULL,
  `shift_type_id` int(11) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `bravo` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `tbl_profiles`
--

INSERT INTO `tbl_profiles` (`user_id`, `name`, `last_name`, `emp_num`, `mobile`, `shift_type_id`, `role`, `bravo`) VALUES
(1, 'Administrator', 'Admin', 1, '', 0, 3, 0),
(2, 'Raeef', '', 5, '', 1, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profiles_fields`
--

CREATE TABLE IF NOT EXISTS `tbl_profiles_fields` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `varname` varchar(50) NOT NULL DEFAULT '',
  `title` varchar(255) NOT NULL DEFAULT '',
  `field_type` varchar(50) NOT NULL DEFAULT '',
  `field_size` int(3) NOT NULL DEFAULT '0',
  `field_size_min` int(3) NOT NULL DEFAULT '0',
  `required` int(1) NOT NULL DEFAULT '0',
  `match` varchar(255) NOT NULL DEFAULT '',
  `range` varchar(255) NOT NULL DEFAULT '',
  `error_message` varchar(255) NOT NULL DEFAULT '',
  `other_validator` text,
  `default` varchar(255) NOT NULL DEFAULT '',
  `widget` varchar(255) NOT NULL DEFAULT '',
  `widgetparams` text,
  `position` int(3) NOT NULL DEFAULT '0',
  `visible` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `tbl_profiles_fields`
--

INSERT INTO `tbl_profiles_fields` (`id`, `varname`, `title`, `field_type`, `field_size`, `field_size_min`, `required`, `match`, `range`, `error_message`, `other_validator`, `default`, `widget`, `widgetparams`, `position`, `visible`) VALUES
(1, 'name', 'First Name', 'VARCHAR', 255, 3, 2, '', '', 'Incorrect First Name (length between 3 and 50 characters).', '', '', '', '', 1, 3),
(2, 'last_name', 'Last Name', 'VARCHAR', 255, 3, 2, '', '', 'Incorrect Last Name (length between 3 and 50 characters).', '', '', '', '', 2, 3),
(4, 'emp_num', 'Employee No.', 'INTEGER', 11, 0, 1, '', '', '', '', '', '', '', 0, 3),
(7, 'shift_type_id', 'Shift Type', 'INTEGER', 11, 0, 0, '', '', '', '', '', '', '', 0, 3),
(8, 'role', 'Role', 'INTEGER', 11, 0, 0, '', '', '', '', '', '', '', 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE IF NOT EXISTS `tbl_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`id`, `name`, `description`) VALUES
(1, 'First Project', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pump`
--

CREATE TABLE IF NOT EXISTS `tbl_pump` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `very_frequent` tinyint(1) NOT NULL DEFAULT '0',
  `state` tinyint(1) NOT NULL DEFAULT '1',
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_pump`
--

INSERT INTO `tbl_pump` (`id`, `name`, `very_frequent`, `state`, `description`) VALUES
(3, 'Third pump', 1, 1, ''),
(4, 'Fourth pump', 0, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_shift_list`
--

CREATE TABLE IF NOT EXISTS `tbl_shift_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list` text NOT NULL,
  `date` date NOT NULL,
  `time` int(11) DEFAULT NULL,
  `shift_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tbl_shift_list`
--

INSERT INTO `tbl_shift_list` (`id`, `list`, `date`, `time`, `shift_id`, `status`) VALUES
(1, '1', '2013-10-07', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_shift_type`
--

CREATE TABLE IF NOT EXISTS `tbl_shift_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `name_ar` varchar(11) DEFAULT NULL,
  `description` text,
  `description_ar` text,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `create_user_id` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  `overlap` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tbl_shift_type`
--

INSERT INTO `tbl_shift_type` (`id`, `name`, `name_ar`, `description`, `description_ar`, `start_time`, `end_time`, `create_time`, `create_user_id`, `update_time`, `update_user_id`, `overlap`) VALUES
(1, 'First Shift Type', NULL, '', NULL, '10:00:00', '18:00:00', NULL, NULL, NULL, NULL, 0),
(2, 'Second Shift Type', NULL, '', NULL, '20:00:00', '04:00:00', NULL, NULL, NULL, NULL, 1),
(3, 'Third Shift Type', NULL, '', NULL, '00:00:00', '00:00:00', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier`
--

CREATE TABLE IF NOT EXISTS `tbl_supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `prefix` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '1',
  `very_frequent` tinyint(1) NOT NULL DEFAULT '1',
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_supplier`
--

INSERT INTO `tbl_supplier` (`id`, `name`, `prefix`, `state`, `very_frequent`, `description`) VALUES
(1, 'First Supplier', 'b1-', 1, 1, ''),
(2, 'Second Supplier', 'wow-', 1, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(128) NOT NULL DEFAULT '',
  `activkey` varchar(128) NOT NULL DEFAULT '',
  `superuser` int(1) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '0',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastvisit_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username` (`username`),
  UNIQUE KEY `user_email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `username`, `password`, `email`, `activkey`, `superuser`, `status`, `create_at`, `lastvisit_at`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'webmaster@example.com', '9a40f7b4a621974f14d93103bd64e82e', 1, 1, '2013-08-22 16:51:20', '2013-11-19 15:00:27'),
(2, 'rstars', '213a4202e9302b6ec7e893316a1c3f31', 'raeef.refai@live.com', 'dce72f672eeff1bafc2b9512bffa2137', 0, 1, '2013-10-25 11:44:00', '2013-11-19 15:00:50');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_zone`
--

CREATE TABLE IF NOT EXISTS `tbl_zone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '1',
  `very_frequent` tinyint(1) NOT NULL DEFAULT '0',
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `tbl_zone`
--

INSERT INTO `tbl_zone` (`id`, `name`, `state`, `very_frequent`, `description`) VALUES
(11, 'First Zone', 1, 1, ''),
(13, 'Second Zone', 1, 1, ''),
(20, 'Third Zone', 1, 0, ''),
(21, 'Fourth Zone', 1, 1, '');

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_lab_plant`
--
CREATE TABLE IF NOT EXISTS `view_lab_plant` (
`plant` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `view_lab_truck`
--
CREATE TABLE IF NOT EXISTS `view_lab_truck` (
`truck` int(11)
);
-- --------------------------------------------------------

--
-- Structure for view `view_lab_plant`
--
DROP TABLE IF EXISTS `view_lab_plant`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_lab_plant` AS select distinct `tbl_lab`.`plant` AS `plant` from `tbl_lab`;

-- --------------------------------------------------------

--
-- Structure for view `view_lab_truck`
--
DROP TABLE IF EXISTS `view_lab_truck`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_lab_truck` AS select distinct `tbl_lab`.`truck` AS `truck` from `tbl_lab`;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_profiles`
--
ALTER TABLE `tbl_profiles`
  ADD CONSTRAINT `user_profile_id` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
