# 新增用户表
DROP TABLE USER;
CREATE TABLE USER (
    id INT NOT NULL AUTO_INCREMENT,
    unionId VARCHAR(100) UNIQUE,
    openId VARCHAR(100) NOT NULL UNIQUE,
    gender CHAR(1),
    nickName VARCHAR(50),
    avatarUrl VARCHAR(255),
    create_time int,
    update_time int,
    PRIMARY KEY  ( id )
)CHARSET=utf8;

# 新增用户
INSERT INTO USER (openid, create_time) 
    VALUES ('suibian',CURTIME());

# 新增感想表
DROP TABLE tought;
CREATE TABLE tought(
    id INT NOT NULL AUTO_INCREMENT,
    union_id VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    content VARCHAR(500),
    create_time int,
    update_time int,
    PRIMARY KEY  ( id )
)CHARSET=utf8;