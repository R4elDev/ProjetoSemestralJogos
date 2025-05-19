#CRIA O DATABASE
create database db_controle_jogos_bb;

#ATIVA O DATABASE
use db_controle_jogos_bb;
show databases;

#CRIAR TABELA


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
    nome                      varchar(200) not null,
    logo                      varchar(200) not null,
    link                      varchar(200) not null
);


/**TABELAS DE RELACIONAMENTO **/

create table tbl_jogo(
	id 					int not null primary key auto_increment,
    nome 				varchar(80) not null,
    data_lancamento 	date not null,
    versao 				varchar(10) not null,
	tamanho 			varchar(10),
    descricao 			text,
    foto_capa 			varchar(200),
	link 				varchar(200),
    id_classificacao    int not null,
    FOREIGN KEY (id_classificacao) REFERENCES tbl_classificacao(id)
);



create table tbl_plataforma_jogo(
	id int not null primary key auto_increment,
    id_plataforma int not null,
    id_jogo int not null,
    id_versao int not null,
    hardware varchar(150) not null,
    FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma(id),
    FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
    FOREIGN KEY (id_versao) REFERENCES tbl_versao(id)
);

create table tbl_jogo_genero(
	id int not null primary key auto_increment,
    id_jogo int not null,
    id_genero int not null,
    FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
    FOREIGN KEY (id_genero) REFERENCES tbl_genero(id)
);

create table tbl_jogo_desenvolvedora(
	id int not null primary key auto_increment,
    id_jogo int not null,
    id_desenvolvedora int not null,
    FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
    FOREIGN KEY (id_desenvolvedora) REFERENCES tbl_desenvolvedora(id)
);

create table tbl_avaliacoes(
    id int not null primary key auto_increment,
    comentarios varchar(500) not null,
    quantidade_de_estrelas INT,
    id_jogo int not null,
    FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id)
);




select tbl_versao.* from tbl_jogo
                    inner join tbl_plataforma_jogo
                      on tbl_jogo.id = tbl_plataforma_jogo.id_jogo
                    inner join tbl_versao
                      on tbl_versao.id = tbl_plataforma_jogo.id_versao
                  where tbl_jogo.id = 5;



show tables;
desc tbl_plataforma;
select * from tbl_jogo_genero;




