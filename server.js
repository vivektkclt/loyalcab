const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.svg':'image/svg+xml','.txt':'text/plain'};
http.createServer((req,res)=>{
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end('Bad request'); }
  const file = path.resolve(root,'.'+(pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root+path.sep) || !['index.html','styles.css','app.js','robots.txt','assets'].includes(path.relative(root,file).split(path.sep)[0])) { res.writeHead(404); return res.end('Not found'); }
  fs.readFile(file,(err,data)=>{ if(err){res.writeHead(404);return res.end('Not found');} res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(data); });
}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Loyal Cab: http://localhost:'+(process.env.PORT||3000)));
