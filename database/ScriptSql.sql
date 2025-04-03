#CRIA O DATABASE
create database db_controle_jogos_bb;

#ATIVA O DATABASE
use db_controle_jogos_bb;


#CRIAR TABELA
create table tbl_jogo(
	id 					int not null primary key auto_increment,
    nome 				varchar(80) not null,
    data_lancamento 	date not null,
    versao 				varchar(10) not null,
	tamanho 			varchar(10),
    descricao 			text,
    foto_capa 			varchar(200),
	link 				varchar(200)
);

create table  tbl_plataforma(
	id                        int not null primary key auto_increment,
    tipo_de_plataforma        varchar(100) not null,
    logo                      varchar(200) not null
);

create table tbl_versao(
	id                        int not null primary key auto_increment,
	tipo_de_versao            varchar(45) not null
);

create table tbl_genero(
	id                        int not null primary key auto_increment,
    tipo_de_genero            varchar(100) not null
);

create table tbl_classificacao(
	id                        int not null primary key auto_increment,
    tipo_de_classificacao     varchar(5) not null
);

create table tbl_desenvolvedora(
	id                        int not null primary key auto_increment,
    logo                      varchar(200) not null,
    link                      varchar(200) not null
);




show tables;
desc tbl_jogo;
select * from tbl_jogo;