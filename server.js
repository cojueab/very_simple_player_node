var Koa = require('koa');
var Router = require('koa-router');
const logger = require('koa-logger')
var path = require('path')
var http = require('http'),
    fs   = require('fs'),
    filePath = '2.mp3',
    stat = fs.statSync(filePath);
  var stream = require('koa-stream');
var app = new Koa();
var router = new Router();
app.use(logger())
router.get('/', async (ctx) => {
  ctx.body = "<audio src='/1' controls></audio>"
  
})
router.get('/1', async (ctx) => {
  ctx.set('Content-Type', 'audio/mpeg');
  ctx.set('accept-ranges','bytes');
  ctx.set('Content-Length', 7549431);
  const stream = fs.createReadStream(filePath)
  ctx.req.on('close', () => {
    ctx.res.end()
  })
  ctx.response.type = 'mp3';
  ctx.body = await stream
  
})
app.use(router.routes());
app.listen(3000, '192.168.5.41')