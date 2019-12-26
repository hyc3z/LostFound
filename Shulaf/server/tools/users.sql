create table users(
    id int not null auto_increasement primary key,
    nickName varchar(50) not null,
    name varchar(50) ,
    studentId varchar(100),
    major varchar(100),
    password varchar(100),
    openId varchar(500)
)