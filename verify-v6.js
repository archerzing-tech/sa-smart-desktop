const fs=require('fs');
const h=fs.readFileSync('D:\\work2026\\sa_workspace\\sa-workbench-enhanced.html','utf8');
const c=[
  ['SA SMART DESKTOP',h.includes('SA SMART DESKTOP')],
  ['DOCTYPE',h.includes('<!DOCTYPE')],
  ['style',h.includes('<style>')],
  ['script',h.includes('<script>')],
  ['No BERT model name',!h.includes('BERT')],
  ['No KNN model name',!h.includes('KNN')],
  ['No LDA model name',!h.includes('LDA')],
  ['Realistic script_intent',h.includes('script_intent')],
  ['Realistic script_planning',h.includes('script_planning')],
  ['Realistic script_execution',h.includes('script_execution')],
  ['Realistic script_verify',h.includes('script_verify')],
  ['Realistic script_delivery',h.includes('script_delivery')],
  ['Retry behavior',h.includes('retry')||h.includes('retry')],
  ['Failed link simulation',h.includes('失效')||h.includes('找不到')],
  ['Alternative sources',h.includes('替代')],
  ['Natural language thoughts',(h.includes('理解')||h.includes('看看')||h.includes('考虑'))&&!h.includes('inform the user')&&!h.includes('leverage')],
  ['Search attempts',h.includes('搜索')||h.includes('查找')||h.includes('查阅')],
  ['Variable timing',h.includes('rand')||h.includes('delay')],
  ['Event system',h.includes('evIcon')||h.includes('evHTML')],
  ['Phase definitions',h.includes('const PHASES')],
  ['Assets with download',h.includes('renderAssets')],
  ['3 request types',h.includes("'new'")&&h.includes("'append'")&&h.includes("'rework'")],
  ['toggleP function',h.includes('function toggleP')],
  ['send function',h.includes('async function send')],
  ['send2 function',h.includes('async function send2')],
  ['startProcess',h.includes('async function startProcess')],
  ['execPhase async',h.includes('async function execPhase')],
  ['Workspace layout',h.includes('workspace')],
  ['Phase card',h.includes('p-card')],
  ['Typing indicator',h.includes('typing-el')],
  ['Toast',h.includes('toast-global')],
  ['Final summary',h.includes('final-summary')],
  ['Bottom input',h.includes('ws-bottom')],
  ['Light theme',!h.includes('#0b0b1a')&&h.includes('#f4f5f7')],
  ['Welcome footer',h.includes('welcome-footer')],
  ['Model name GPT-4o',h.includes('GPT-4o')],
  ['Version v1.2.0',h.includes('v1.2.0')],
  ['Larger input',h.includes('padding:18px 20px')],
  ['Notification panel',h.includes('notif-stack')],
  ['notify function',h.includes('function notify')],
  ['Notif action mapping',h.includes('NOTIF_ACTIONS')],
  ['Notif cap at 6',h.includes('children.length > 6')],
  ['Notif 5s duration',h.includes('5000')],
  ['Notif diverse cats',h.includes("'工具'")&&h.includes("'技能'")&&h.includes("'编码'")&&h.includes("'文档'")&&h.includes("'汇总'")],
  ['Close button',h.includes('notif-close')],
  ['dismissNotif',h.includes('dismissNotif')],
  ['Cat border colors',h.includes('cat-tool')&&h.includes('cat-skill')&&h.includes('cat-doc')],
  ['Varied text clamp',h.includes('clamp1')&&h.includes('clamp2')&&h.includes('full')],
  ['File gen spinner',h.includes('gen-spinner')],
  ['Spinner ring',h.includes('gs-ring')],
  ['Spinner ~5s delay',h.includes('genTime')&&h.includes('rand(4000,6000)')],
  ['Tag balance',true],
];
let ok=true;
c.forEach(([n,v])=>{console.log((v?'✓':'✗')+' '+n);if(!v)ok=false});
['html','body','style','script'].forEach(t=>{
  const o=(h.match(new RegExp('<'+t+'[>\\s]','g'))||[]).length;
  const c2=(h.match(new RegExp('</'+t+'>','g'))||[]).length;
  if(o!==c2){console.log('  ✗ '+t+' '+o+'/'+c2);ok=false}
});
const js=h.match(/<script>([\s\S]*?)<\/script>/);
if(js){
  const j=js[1];
  const b=(j.match(/{/g)||[]).length,bc=(j.match(/}/g)||[]).length;
  const p=(j.match(/\(/g)||[]).length,pc=(j.match(/\)/g)||[]).length;
  if(b!==bc||p!==pc)ok=false;
  console.log((b===bc?'✓':'✗')+' JS braces '+b+'/'+bc);
  console.log((p===pc?'✓':'✗')+' JS parens '+p+'/'+pc);
}
console.log('\n'+(ok?'ALL PASSED':'SOME FAILED'));
