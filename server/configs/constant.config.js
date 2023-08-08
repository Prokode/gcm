CREATE TABLE `my_table`
(
	my_table_id INT AUTO_INCREMENT,
    my_table_name VARCHAR(30) NOT NULL,
    my_foreign_key INT NOT NULL,
    my_tb_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	my_tb_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    PRIMARY KEY(my_table_id),
   
);