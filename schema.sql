CREATE DATABASE `notifications`;

CREATE TABLE notifications.messages (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` varchar(200) DEFAULT NULL,
  `date` varchar(8) NOT NULL,
  `recipient_email` varchar(45) DEFAULT NULL,
  `isSend` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
;