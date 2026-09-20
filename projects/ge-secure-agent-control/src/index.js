import { AgentControl } from './control-plane.js';
import { createServer } from './server.js';

const control=new AgentControl({executors:{default:async({action,request})=>({ok:true,action:action.code,requestId:request.requestId})}});
const port=Number(process.env.PORT||8080);
createServer(control).listen(port,'0.0.0.0',()=>console.log(`G|E Secure Agent Control listening on :${port}`));
