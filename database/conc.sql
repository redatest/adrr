-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 11, 2013 at 08:16 PM
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
-- CREATE DATABASE IF NOT EXISTS `conc` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
-- USE `conc`;

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
  `very_frequent` tinyint(1) NOT NULL DEFAULT '0',
  `sample_counter` int(11) DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_concrete_type`
--

INSERT INTO `tbl_concrete_type` (`id`, `name`, `category`, `flow_norm_from`, `flow_norm_to`, `flow_acpt_from`, `flow_acpt_to`, `slump_norm_from`, `slump_norm_to`, `slump_acpt_from`, `slump_acpt_to`, `temp_from`, `temp_to`, `very_frequent`, `sample_counter`, `note`) VALUES
(1, 'First Concrete Type', 'flow', 5, 9, 2, 20, NULL, NULL, NULL, NULL, 1, 12, 1, NULL, ''),
(2, 'Second Concrete Type', 'slump', NULL, NULL, NULL, NULL, 5, 10, 2, 20, 1, 12, 1, NULL, ''),
(3, 'Third Conc Type', 'slump', NULL, NULL, NULL, NULL, 5, 10, 1, 15, 5, 10, 1, NULL, ''),
(4, 'Fourth', 'flow', 5, 10, 1, 15, NULL, NULL, NULL, NULL, 5, 10, 0, NULL, '');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_ir_pt`
--

CREATE TABLE IF NOT EXISTS `tbl_ir_pt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ir_id` int(11) NOT NULL,
  `pouring_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tbl_ir_pt`
--

INSERT INTO `tbl_ir_pt` (`id`, `ir_id`, `pouring_type_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1);

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
(1, 2, '2013-11-01', 1, 1, 1, 9, 9, '23423', '2013-11-01 23:09:00', '2013-11-01 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-01 20:43:55', 0, 0, 0, '2013-11-11 05:41:45'),
(2, 2, '2013-11-01', 1, 1, 1, 11, 11, '11', '2013-11-01 11:01:00', '2013-11-01 11:11:00', 11, 11, NULL, 11, 1, NULL, 'flow', '2013-11-01 20:44:39', 0, 0, 0, '2013-11-11 05:41:45'),
(3, 2, '2013-11-01', 1, 1, 1, 99, 99, '99', '2013-11-01 23:09:00', '2013-11-01 23:59:00', 12, 99, NULL, 99, 1, 'flow,temp', 'flow', '2013-11-01 20:46:51', 0, 0, 0, '2013-11-11 05:41:45'),
(4, 2, '2013-11-03', 1, 1, 1, 123, 123, '1231', '2013-11-03 12:21:00', '2013-11-03 12:59:00', 12, 4123, NULL, 123, 1, 'flow,temp', 'flow', '2013-11-03 09:54:28', 0, 0, 0, '2013-11-11 05:41:45'),
(5, 2, '2013-11-03', 1, 1, 2, 234523, 2345, '2345', '2013-11-03 23:04:00', '2013-11-03 23:59:00', 12, 345, 345, NULL, 0, 'slump,temp', 'slump', '2013-11-03 10:23:10', 0, 0, 0, '2013-11-11 05:41:45'),
(6, 2, '2013-11-04', 1, 1, 1, 9, 9, '99', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 12, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:56:00', 0, 0, 0, '2013-11-11 05:41:45'),
(7, 2, '2013-11-04', 1, 1, 1, 9, 9, '9', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:56:25', 0, 0, 0, '2013-11-11 05:41:45'),
(8, 2, '2013-11-04', 2, 1, 1, 9, 9, '99', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:56:52', 0, 0, 0, '2013-11-11 05:41:45'),
(9, 2, '2013-11-04', 1, 1, 1, 9, 9, '9', '2013-11-04 09:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:57:11', 0, 0, 0, '2013-11-11 05:41:45'),
(10, 2, '2013-11-04', 1, 1, 1, 99, 99, '9', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:57:40', 0, 0, 0, '2013-11-11 05:41:45'),
(11, 2, '2013-11-04', 1, 1, 1, 9, 9, '657', '2013-11-04 23:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:57:57', 0, 0, 0, '2013-11-11 05:41:45'),
(12, 2, '2013-11-04', 1, 1, 1, 9, 9, '4234', '2013-11-04 08:09:00', '2013-11-04 23:09:00', 9, 9, NULL, 9, 1, NULL, NULL, '2013-11-04 02:58:22', 0, 0, 0, '2013-11-11 05:41:45'),
(13, 2, '2013-11-04', 1, 1, 1, 9, 9, '34534', '2013-11-04 22:09:00', '2013-11-04 23:59:00', 9, 9, NULL, 8, 1, NULL, NULL, '2013-11-04 02:58:39', 0, 0, 0, '2013-11-11 05:41:45'),
(14, 2, '2013-11-05', 2, 2, 2, 9, 9, '34534', '2013-11-05 09:09:00', '2013-11-05 09:59:00', 9, 11, 9, NULL, 1, NULL, NULL, '2013-11-05 02:13:26', 0, 0, 0, '2013-11-11 05:41:45'),
(17, 2, '2013-11-06', 1, 1, 2, 1234, 1234, '6345', '2013-11-06 21:59:00', '2013-11-06 23:59:00', 12, 1234, 1234, NULL, 1, 'slump,temp', 'slump', '2013-11-06 09:28:01', 0, 0, 0, '2013-11-11 05:41:45'),
(18, 2, '2013-11-06', 1, 2, 2, 435, 345, '345', '2013-11-06 23:03:00', '2013-11-06 23:59:00', 12, 345, 345, NULL, 1, 'slump,temp', 'slump', '2013-11-06 10:52:26', 0, 0, 0, '2013-11-11 05:41:45'),
(23, 2, '2013-11-05', 1, 2, 2, 99, 99, '234234', '2013-11-05 12:00:00', '2013-11-05 14:00:00', 8, 999, 99, NULL, 0, 'slump,temp', NULL, '2013-11-06 19:58:50', 0, 0, 0, '2013-11-11 05:41:45'),
(24, 2, '2013-11-05', 1, 2, 2, 9, 99, '234234', '2013-11-05 12:00:00', '2013-11-05 13:05:00', 9, 99, 99, NULL, 1, 'slump,temp', NULL, '2013-11-06 20:08:06', 0, 0, 0, '2013-11-11 05:41:45'),
(25, 2, '2013-11-05', 1, 2, 2, 99, 99, '234234', '2013-11-05 12:00:00', '2013-11-05 13:03:00', 9, 999, 999, NULL, 1, 'slump,temp', NULL, '2013-11-06 20:08:59', 0, 0, 0, '2013-11-11 05:41:45'),
(26, 2, '2013-11-07', 1, 1, 2, 123, 123, '123', '2013-11-07 01:01:00', '2013-11-07 02:02:00', 12, 123, 123, NULL, 1, 'slump,temp', '', '2013-11-07 19:28:57', 0, 0, 0, '2013-11-11 05:41:45');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
  `shift_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `pouring_type_id` int(11) NOT NULL,
  `ir` int(11) NOT NULL,
  `zone_id` int(11) NOT NULL,
  `area` varchar(255) NOT NULL,
  `axis` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `est_vol` int(11) NOT NULL,
  `ticket` int(11) NOT NULL,
  `truck` int(11) NOT NULL,
  `conc_type_id` int(11) NOT NULL,
  `truck_load` int(11) NOT NULL,
  `poured_qty` int(11) NOT NULL,
  `dept_time` datetime NOT NULL,
  `slump_b` int(11) NOT NULL,
  `hrwr` int(11) NOT NULL,
  `water` int(11) NOT NULL,
  `slump_a` int(11) NOT NULL,
  `accepted` tinyint(1) NOT NULL,
  `pump_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `returned` tinyint(1) NOT NULL DEFAULT '0',
  `approved` tinyint(1) DEFAULT '0',
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `update` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_pouring_type`
--

INSERT INTO `tbl_pouring_type` (`id`, `name`, `state`, `v_r`, `priority`, `very_frequent`) VALUES
(1, 'First Pouring Type', 1, 'hor', 'high', 1),
(2, 'Second Pouring Type', 1, 'hor', 'high', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profiles`
--

CREATE TABLE IF NOT EXISTS `tbl_profiles` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `emp_num` int(11) NOT NULL DEFAULT '0',
  `senior` tinyint(1) NOT NULL DEFAULT '0',
  `eng` tinyint(1) NOT NULL DEFAULT '0',
  `shift_type_id` int(11) DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_profiles`
--

INSERT INTO `tbl_profiles` (`user_id`, `name`, `last_name`, `emp_num`, `senior`, `eng`, `shift_type_id`) VALUES
(1, 'Administrator', 'Admin', 1, 1, 0, 0),
(2, 'Raeef', 'Refai', 60, 0, 1, 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tbl_profiles_fields`
--

INSERT INTO `tbl_profiles_fields` (`id`, `varname`, `title`, `field_type`, `field_size`, `field_size_min`, `required`, `match`, `range`, `error_message`, `other_validator`, `default`, `widget`, `widgetparams`, `position`, `visible`) VALUES
(1, 'name', 'First Name', 'VARCHAR', 255, 3, 2, '', '', 'Incorrect First Name (length between 3 and 50 characters).', '', '', '', '', 1, 3),
(2, 'last_name', 'Last Name', 'VARCHAR', 255, 3, 2, '', '', 'Incorrect Last Name (length between 3 and 50 characters).', '', '', '', '', 2, 3),
(4, 'emp_num', 'Employee No.', 'INTEGER', 11, 0, 1, '', '', '', '', '', '', '', 0, 3),
(5, 'senior', 'Senior', 'BOOL', 0, 0, 3, '', '1==Yes;0==No', '', '', '0', '', '', 0, 1),
(6, 'eng', 'Engineer', 'BOOL', 0, 0, 3, '', '1==Yes;0==No', '', '', '0', '', '', 0, 1),
(7, 'shift_type_id', 'Shift Type', 'INTEGER', 11, 0, 0, '', '', '', '', '', '', '', 0, 3);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_shift_type`
--

INSERT INTO `tbl_shift_type` (`id`, `name`, `name_ar`, `description`, `description_ar`, `start_time`, `end_time`, `create_time`, `create_user_id`, `update_time`, `update_user_id`, `overlap`) VALUES
(1, 'First Shift Type', NULL, '', NULL, '10:00:00', '18:00:00', NULL, NULL, NULL, NULL, 0),
(2, 'Second Shift Type', NULL, '', NULL, '20:00:00', '04:00:00', NULL, NULL, NULL, NULL, 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `username`, `password`, `email`, `activkey`, `superuser`, `status`, `create_at`, `lastvisit_at`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'webmaster@example.com', '9a40f7b4a621974f14d93103bd64e82e', 1, 1, '2013-08-22 16:51:20', '2013-11-11 03:31:44'),
(2, 'rstars', '7e73d06707f5fb75ec77cc5f2bd9bb92', 'raeef.refai@live.com', 'dce72f672eeff1bafc2b9512bffa2137', 1, 1, '2013-10-25 11:44:00', '2013-11-11 04:55:43');

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
