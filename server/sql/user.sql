# 新增用户表
DROP TABLE USER;
CREATE TABLE USER (
    uid INT NOT NULL AUTO_INCREMENT UNIQUE comment '用户id',
    gender CHAR(1) comment '性别',
    nickName VARCHAR(50) comment '用户昵称',
    avatarUrl VARCHAR(255) comment '用户头像',
    createAt int comment '创建时间',
    updateAt int comment '更新时间',
    PRIMARY KEY  ( uid )
)CHARSET=utf8;

# 新增第三方绑定表
DROP TABLE THIRD_BIND;
CREATE TABLE THIRD_BIND (
    id INT NOT NULL AUTO_INCREMENT comment '自增id',
    uid INT NOT NULL comment '用户id',
    unionId VARCHAR(100) comment '第三方unionid',
    openId VARCHAR(100) NOT NULL UNIQUE comment '第三方openId',
    type VARCHAR(50) NOT NULL comment '第三方名称',
    nickName VARCHAR(50) comment '用户昵称',
    avatarUrl VARCHAR(255) comment '用户头像',
    createAt int comment '创建时间',
    updateAt int comment '更新时间',
    PRIMARY KEY  ( id )
)CHARSET=utf8;

# 新增用户
INSERT INTO USER (openid, create_time) 
    VALUES ('suibian',CURTIME());

# 新增感想表
DROP TABLE tought;
CREATE TABLE tought(
    id INT NOT NULL AUTO_INCREMENT,
    uid INT NOT NULL comment '用户id',
    type VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    content TEXT,
    image TEXT,
    create_time int,
    update_time int,
    PRIMARY KEY  ( id )
)CHARSET=utf8;