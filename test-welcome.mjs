import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { createServer as netServer } from 'net';

function fp(){return new Promise(r=>{const s=netServer();s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>r(p))})})}

async function main(){
  const h=readFileSync('D:\\work2026\\sa_workspace\\sa-workbench-enhanced.html','utf8');
  const port=await fp();
  const srv=createServer((req,res)=>{res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});res.end(h)});
  await new Promise(r=>srv.listen(port,'127.0.0.1',r));
  console.log(`http://127.0.0.1:${port}/`);

  const br=await chromium.launch({headless:true});
  const ctx=await br.newContext({viewport:{width:860,height:900}});
  const p=await ctx.newPage();
  await p.goto(`http://127.0.0.1:${port}/`,{waitUntil:'networkidle',timeout:15000});await p.waitForTimeout(500);

  // Measure input box width
  const box = await p.$('.input-box');
  const boxSize = await box.boundingBox();
  console.log('Input box width:', Math.round(boxSize.width), 'px');

  // Check footer visibility
  const footer = await p.$('.welcome-footer');
  const fVis = footer ? await footer.isVisible() : false;
  console.log('Footer visible:', fVis);

  // Check h1 text
  const h1 = await p.textContent('h1');
  console.log('Title:', h1.trim());

  // Check footer text
  const fText = footer ? await footer.textContent() : 'N/A';
  console.log('Footer text:', fText.replace(/\s+/g,' ').trim());

  // Check if input has larger padding
  const inp = await p.$('.input-box textarea');
  const pad = await inp.evaluate(el => getComputedStyle(el).padding);
  console.log('Input padding:', pad);

  await p.screenshot({path:'D:\\work2026\\sa_workspace\\screenshot-welcome.png'});
  console.log('\nDone');
  await br.close();srv.close();
}
main();
