/*******************************************************************************/
/* this file was auto created by VBA,please do not modified                    */
/*                                                                             */
/*                                                                             */
/*******************************************************************************/

drop database if exists lobby;
CREATE DATABASE lobby DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE lobby;

/*******************************************************************************/
/* ��������:res_Film                                                                    */
/* ��������:��Ӱ��Դ��                                                                       */
/* ��������:                                                                            */
/* ������:������                                                                          */
/* �޸ļ�¼:                                                                            */
/* ����������:ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8                        */
/*******************************************************************************/
select 'table res_Film';
drop table if exists res_Film;
create table res_Film
(
  FilmID                    int                       NOT NULL ,/*��Ӱ���                */
  ItemName                  varchar(512)                 NOT NULL,/*��������                */
  ItemIndex                 int                       NOT NULL,/*����������              */
  ItemValue                 varchar(512)                 NOT NULL/*��������                */
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
