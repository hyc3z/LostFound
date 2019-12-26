create table posts(
    id int not null auto_increasement primary key,
    openId varchar(500) not null,
    nickName varchar(100) not null,
    type varchar(100) not null,
    time varchar(100) not null,
    place varchar(500) not null,
    types varchar(100) not null,
    state varchar(100) not null,
    postTime varchar(100) not null,
    content varchar(1000),
    pic1 varchar(500),
    pic2 varchar(500),
    pic3 varchar(500),
    avatarUrl varchar(500)
)