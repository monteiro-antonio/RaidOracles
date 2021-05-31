create database RaidOracles;

use RaidOracles;

create table guardiao (
idClan int primary key auto_increment,
idGuardian varchar(45),
senha varchar(45),
plataforma varchar(45),
hunter int default 0,
titan int default 0,
warlock int default 0
);

create table atividades_semanais (
fkClan int,
foreign key (fkClan) references guardiao (idClan),
cripta int,
camara_cristal int,
profecia int
);

create table matchmaking (
fkClan int,
foreign key (fkClan) references guardiao (idClan),
idGuardian varchar(45),
plataforma varchar(45),
squad varchar(45),
classe varchar(45)
);

select 
(select count(hunter) from guardiao where hunter = 1) as hunter,
(select count(titan) from guardiao where titan = 1) as titan,
(select count(warlock) from guardiao where warlock = 1) as warlock;