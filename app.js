// ================================================================================================

const path  = require('path');
const UUID = require("uuid");
const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaBody = require('koa-body');
const cors = require('koa2-cors');
const createError = require('http-errors');

// ================================================================================================

global.session_name = 'session_nid';
global.CookieKeys = ['ewareartrat43tw4tfrf'];
global.ENV_Production = process.env.NODE_ENV === 'production';
global.BasePath = __dirname;
global.FrameWorkPath = path.join(BasePath, 'framework');
global.AssetsPath = path.join(BasePath, 'assets');
global.SessionExpire = 20 * 60;

// ================================================================================================

const DBManager = require(path.join(BasePath, 'db', 'DBManager.js'));
const Redis = require(path.join(BasePath, 'db', 'redis', 'client.js'));
const LoadSessionFromRedis = require(path.join(BasePath,'components','session','redis.js'))

// ================================================================================================

const Controller = require(path.join(FrameWorkPath, 'controller.js') );
const Rest = require(path.join(FrameWorkPath, 'rest.js') );
const View = require(path.join(FrameWorkPath, 'view.js') );
const Model = require(path.join(FrameWorkPath, 'model.js'));
Model.loadSQL();
// Model.loadNOSQL();

// ================================================================================================

global.SBiz = require(path.join(BasePath , 'base', 'SBiz.js' ));
const Bizes = require(path.join(FrameWorkPath, 'biz.js'));
Bizes.load();

// ================================================================================================

const app = new Koa({
	proxy:true,
	keys: CookieKeys
});
app.on('error', (err, ctx) => {console.error('app error',err.message)});
app.use(async (ctx, next) => {
    // 允许来自所有域名请求
    ctx.set("Access-Control-Allow-Origin", "*");
    // 这样就能只允许 http://localhost:8080 这个域名的请求了
    // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080"); 

    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

    // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

    // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

    // Content-Type表示具体请求中的媒体类型信息
    ctx.set("Content-Type", "application/json;charset=utf-8");

    // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
    // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
    ctx.set("Access-Control-Allow-Credentials", true);

    // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
    // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
    // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
    ctx.set("Access-Control-Max-Age", 300);

    /*
    CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
        Cache-Control、
        Content-Language、
        Content-Type、
        Expires、
        Last-Modified、
        Pragma。
    */
    // 需要获取其他字段时，使用Access-Control-Expose-Headers，
    // getResponseHeader('myData')可以返回我们所需的值
    ctx.set("Access-Control-Expose-Headers", "myData");

    await next();
})

app.use(KoaStatic(BasePath));//建议加cdn

// app.use(cors());
app.use(async (ctx, next) => {
	ctx.set('X-Response-Time-Start', `${Date.now()}`);
	await next();
});

// ================================================================================================

/**
 * 创建数据库链接、定义模型
 * 创建缓存链接
 */
app.use(async (ctx, next)=>{
	await DBManager.createDriver('sql')
	// await DBManager.createDriver('nosql')

	await DBManager.createClient('sql');//TODO pay attention to new client per req
	// await DBManager.createClient('nosql');//TODO pay attention to new client per req

	await Model.defineSql(DBManager.getClient('sql'));
	// await Model.defineNoSql(DBManager.getClient('nosql'));

	await next();
});
// app.use(async (ctx, next)=>{
// 	if(!global.DB_Redis){
// 		global.DB_Redis = new Redis();
// 	}
// 	await DB_Redis.createClient().catch((err)=>{
// 		console.log('err',err)
// 		throw createError(500, 'load redis error', {expose:true});
// 	});
// 	await next();
// });


// ================================================================================================

/** body start */
//body parse
// app.use(LoadSessionFromRedis());
// app.use(KoaBody({
// 	multipart: true,
//     encoding: 'utf-8',
//     formidable:{
//         uploadDir: path.join(BasePath, 'upload'),
//         keepExtensions: true,
//         maxFieldsSize: 5*1024*1024,
//         onFileBegin:(name, file)=>{
// 			// console.log('onFileBegin', name, file)
// 			// file.path = '/var/www/web-node/upload/upload_8test.jpg';//此处可以修改file来做修改的，比如按照年/月/日创建层级目录
//         }
// 	}
// }));
app.use(View('view', {
    noCache: !ENV_Production,
    watch: !ENV_Production
}));
//注册添加rest接口
app.use(Rest.restify());
app.use(Controller());
/** body end */

// ================================================================================================

/** footer start */
// 关闭数据库链接，断开redis连接
// app.use(async (ctx, next)=>{
	// await DBManager.quitClient('sql');
	// await DBManager.quitClient('nosql');
	// await DB_Redis.quitClient()
	// await next();
// });

app.use(async (ctx, next) => {
	const rt_start = ctx.response.get('X-Response-Time-Start');
	const ms = Date.now() - 1 * rt_start;
	console.log(`pid: ${process.pid} ; ${ctx.method} ${ctx.url} - ${ms}ms`);
	await next();
});

/** footer end */

//HttpServer
let PORT = process.env.PORT || 8090 ;
let http_server = app.listen(PORT,()=>{
	console.log('Node server 127.0.0.1:'+PORT+' 启动完成！')
}); 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// WebSocketServer
// require(path.join(BasePath,'components','websocket','wss.js'))(http_server);