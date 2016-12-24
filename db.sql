-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-12-24 04:54:08
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ajaxform`
--

-- --------------------------------------------------------

--
-- 表的结构 `a_data`
--

CREATE TABLE IF NOT EXISTS `a_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_a` varchar(30) NOT NULL,
  `c_b` varchar(30) NOT NULL,
  `c_c` varchar(30) NOT NULL,
  `c_d` varchar(30) NOT NULL,
  `c_e` varchar(30) NOT NULL,
  `c_f` varchar(30) NOT NULL,
  `c_g` varchar(30) NOT NULL,
  `c_h` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `a_data`
--

INSERT INTO `a_data` (`id`, `c_a`, `c_b`, `c_c`, `c_d`, `c_e`, `c_f`, `c_g`, `c_h`) VALUES
(3, 'How', 'do', 'you', 'do', 'How', 'do', 'you', 'do'),
(4, 'no', 'problem', 'no', 'problem', 'no', 'problem', 'no', 'problem');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
