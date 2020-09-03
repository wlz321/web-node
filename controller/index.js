const {Op, Model} = require('sequelize');
const util = require('util');

module.exports = {
    "GET /":async ( ctx, next )=>{
        try{
            let page = ctx.query.page || 1;
            let limit = 100;
            let offset = (page-1)*limit;
            ctx.state.pager = {
                page,
                limit
            }
            let items = await Film1.findAll({offset, limit, raw: true , group : 'FilmID' });
            let count = await Film1.count({ group: 'FilmID' });
            console.log('items',items);
            console.log('count',count);

            await ctx.render('index.html',{test:{time:new Date().getTime()}});
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