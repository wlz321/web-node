const {Op, Model} = require('sequelize');
const util = require('util');
const FilmBiz = require('../biz/FilmBiz');

module.exports = {
    "GET /":async ( ctx, next )=>{
        try{
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
            let film_ids = await Film1.findAll({offset, limit, raw: true , group : 'FilmID' ,attributes: ['FilmID']}).then((fids)=>{
                return fids.map((v)=>{
                    return v.FilmID
                })
            })

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
            var data = {
                "src":"/assets/image/film-cover.jpg",
                "title":"单车少年 蓝光原盘下载+高清MKV版/骑单车的男孩(台) / 单车男孩(港) / 骑脚踏车的小男生 / Boy with a Bike / Set Me Free / The Kid with a Bike 2011 Le gamin au vélo 41.0G",
                "date":"08-04",
                "type":"蓝光高清"
            };
            ctx.state.movie = data;
            await ctx.render('movie.html',{});
        }catch(e){
            ctx.response.body = e.message;
        }
        await next();
    }
}