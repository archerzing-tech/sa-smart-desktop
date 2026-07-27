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
  const ctx=await br.newContext({viewport:{width:960,height:900}});
  const p=await ctx.newPage();
  const errors=[];
  p.on('pageerror', err => errors.push('ERR: '+err.message));
  p.on('console', msg => { if(msg.type()==='error'||msg.type()==='warn') errors.push(msg.type()+': '+msg.text()); });

  try{
    await p.goto(`http://127.0.0.1:${port}/`,{waitUntil:'networkidle',timeout:15000});await p.waitForTimeout(500);
    await (await p.$$('.chip'))[0].click();
    await p.click('#sendBtn');

    for(let s=0; s<70; s+=5) {
      await p.waitForTimeout(5000);
      const events=await p.$$('.ev');
      const notifs=await p.$$('.notif');
      const donePhases=await p.$$('.ps.done');
      const stat=((await p.textContent('#wsStatus'))||'').trim();
      console.log(`t=${s+5}s  events=${events.length}  notifs=${notifs.length}  done=${donePhases.length}  ${stat.substring(0,50)}`);
      if(errors.length>0) break;
    }

    const done=await p.$$('.ps.done');
    const summary=!!(await p.$('.final-summary'));
    console.log('\n■ Done phases: '+done.length+'/5  ■ Summary: '+(summary?'yes':'no')+'  ■ Errors: '+errors.length);
    if(errors.length) errors.forEach(e=>console.log('  '+e));
    if(done.length===5&&summary) console.log('✅ ALL PHASES COMPLETE');
    else console.log('❌ INCOMPLETE');

    await p.screenshot({path:'D:\\work2026\\sa_workspace\\screenshot-end.png'});
    await br.close();srv.close();
  }catch(e){
    console.error('TEST FAIL:',e.message);
    try{await p.screenshot({path:'D:\\work2026\\sa_workspace\\screenshot-err.png'})}catch(_){}
    await br.close();srv.close();
  }
}
main();
