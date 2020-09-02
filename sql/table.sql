/*******************************************************************************/
/* this file was auto created by VBA,please do not modified                    */
/*                                                                             */
/*                                                                             */
/*******************************************************************************/

drop database if exists lobby;
CREATE DATABASE lobby DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE lobby;

/*******************************************************************************/
/* 对象名称:res_Film                                                                    */
/* 中文名称:电影资源表                                                                       */
/* 功能描述:                                                                            */
/* 表类型:档案表                                                                          */
/* 修改记录:                                                                            */
/* 表引擎类型:ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8                        */
/*******************************************************************************/
select 'table res_Film';
drop table if exists res_Film;
create table res_Film
(
  FilmID                    int                       NOT NULL ,/*电影编号                */
  ItemName                  varchar(512)                 NOT NULL,/*属性名称                */
  ItemIndex                 int                       NOT NULL,/*属性子索引              */
  ItemValue                 varchar(512)                 NOT NULL/*属性描述                */
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
