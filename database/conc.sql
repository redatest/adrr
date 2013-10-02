-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 02, 2013 at 01:55 AM
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
  `category` enum('flow','slamp') NOT NULL,
  `flow_norm_from` int(11) DEFAULT NULL,
  `flow_norm_to` int(11) DEFAULT NULL,
  `flow_acpt_from` int(11) DEFAULT NULL,
  `flow_acpt_to` int(11) DEFAULT NULL,
  `slamp_norm_from` int(11) DEFAULT NULL,
  `slamp_norm_to` int(11) DEFAULT NULL,
  `slamp_acpt_from` int(11) DEFAULT NULL,
  `slamp_acpt_to` int(11) DEFAULT NULL,
  `temp_from` int(11) NOT NULL,
  `temp_to` int(11) NOT NULL,
  `very_frequent` tinyint(1) NOT NULL DEFAULT '0',
  `sample_counter` int(11) DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lab`
--

CREATE TABLE IF NOT EXISTS `tbl_lab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `shift_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `conc_type_id` int(11) NOT NULL,
  `plant` int(11) NOT NULL,
  `truck` int(11) NOT NULL,
  `ticket` varchar(255) NOT NULL,
  `dept_time` time NOT NULL,
  `arriv_time` time NOT NULL,
  `truck_load` int(11) NOT NULL DEFAULT '12',
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `tbl_lab_plant`
--
CREATE TABLE IF NOT EXISTS `tbl_lab_plant` (
`plant` int(11)
);
-- --------------------------------------------------------

--
-- Stand-in structure for view `tbl_lab_truck`
--
CREATE TABLE IF NOT EXISTS `tbl_lab_truck` (
`truck` int(11)
);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profiles`
--

CREATE TABLE IF NOT EXISTS `tbl_profiles` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `emp_num` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE IF NOT EXISTS `tbl_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
  `start_time` int(2) NOT NULL,
  `end_time` int(2) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `create_user_id` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `update_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_supplier`
--

CREATE TABLE IF NOT EXISTS `tbl_supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `prefix` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '1',
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_zone`
--

CREATE TABLE IF NOT EXISTS `tbl_zone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '1',
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure for view `tbl_lab_plant`
--
DROP TABLE IF EXISTS `tbl_lab_plant`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tbl_lab_plant` AS select distinct `tbl_lab`.`plant` AS `plant` from `tbl_lab`;

-- --------------------------------------------------------

--
-- Structure for view `tbl_lab_truck`
--
DROP TABLE IF EXISTS `tbl_lab_truck`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tbl_lab_truck` AS select distinct `tbl_lab`.`truck` AS `truck` from `tbl_lab`;

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
