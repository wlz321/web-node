
/**
 * todo fix me
 * 注册登录页面应该具有独立的页面，不至于未登录状态和登录状态的逻辑处理重叠，比如首页会增加ctx.state.User
 */
const createError = require('http-errors');
module.exports = {
    "POST /consultSubmit": async (ctx, next)=>{
        const request = ctx.request;
        console.log('body', request.body )
        console.log('files',request.files)
        const body = request.body || {};
        // if (!body.age) ctx.throw(400, '.age required');
        ctx.body = { age: body.age || '---' };
        await next();
    }
}