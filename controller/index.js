const {Op, Model} = require('sequelize');
const util = require('util');
const FilmBiz = require('../biz/FilmBiz');
const fs = require('fs');

module.exports = {
    "GET /":async ( ctx, next )=>{
        try{
            let _class = ctx.query._class || '';

            let page = ctx.query.page || 1;
            let limit = 16;
            let offset = (page-1)*limit;
            ctx.state.pager = {
                page,
                limit
            }

            let count = await Film1.count({ group: 'FilmID' }).then((groupCounts)=>{
                return groupCounts.length;
            });

            let total_page = Math.ceil(count/limit);
            if(page <= 0 || page > total_page){
                page = 1;
                return ctx.redirect('/?page=1');
            }
            let film_ids = [];
            if(_class){
                film_ids = await Film1.findAll({offset, limit, raw: true , group : 'FilmID' ,attributes: ['FilmID']}).then((fids)=>{
                    return fids.map((v)=>{
                        return v.FilmID
                    })
                })
            }else{
                film_ids = await Film1.findAll({offset, limit, raw: true , where:{ ItemName:'_class',ItemValue:'同性' }, group : 'FilmID' ,attributes: ['FilmID']}).then((fids)=>{
                    return fids.map((v)=>{
                        return v.FilmID
                    })
                })
            }

            let items  = [];
            for(let i = 0 ;i < film_ids.length ; i ++){
                let _items = await FilmBiz.getFilmItemsJSON(film_ids[i]);
                if(_items){
                    _items.filmid = film_ids[i] ;
                    items.push(_items)
                }
            }
            
            await ctx.render('index.html',{items,total_page,page,test:{time:new Date().getTime()}});
        }catch(e){
            ctx.response.body = e.message;
        }
        await next();
    },
    "GET /movie": async ( ctx, next )=>{
        try{
            let filmid = parseInt(ctx.query.id) || 0;
            if(!filmid){
                return ctx.response.body = '缺少参数id';
            }
            let data = await FilmBiz.getFilmItemsJSON(filmid);
            if(!data){
                return ctx.response.body = '资源不存在';
            }
            ctx.state.movie = data;
            await ctx.render('movie.html',{});
        }catch(e){
            ctx.response.body = e.message;
        }
        await next();
    }
}