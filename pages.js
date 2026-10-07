(function(){
var f=document.getElementById('float'),s=['♥','★','♥','✦'];
for(var i=0;f&&i<18;i++){var e=document.createElement('i');e.textContent=s[i%4];e.style.left=Math.random()*98+'%';e.style.fontSize=12+Math.random()*22+'px';e.style.color=i%3?'#f26ba3':'#d9a441';e.style.animationDuration=12+Math.random()*14+'s';e.style.animationDelay=-Math.random()*20+'s';f.appendChild(e)}
var io=new IntersectionObserver(function(a){a.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(x){io.observe(x)});
addEventListener('scroll',function(){var h=document.documentElement;document.getElementById('bar').style.width=h.scrollTop/(h.scrollHeight-h.clientHeight)*100+'%'},{passive:true});
var cv=document.getElementById('fx'),c=cv.getContext('2d'),p=[],sy=['♥','★','✦'],co=['#f26ba3','#e6bd62','#ff93bd'];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener('resize',rs);
function burst(x,y){for(var i=0;i<45;i++)p.push({x:x,y:y,vx:(Math.random()-.5)*12,vy:Math.random()*-12-3,s:12+Math.random()*14,c:co[i%3],t:sy[i%3],l:100});if(p.length===45)tick()}
function tick(){c.clearRect(0,0,cv.width,cv.height);p=p.filter(function(a){a.vy+=.3;a.x+=a.vx;a.y+=a.vy;a.l--;c.globalAlpha=Math.max(a.l/100,0);c.fillStyle=a.c;c.font=a.s+'px serif';c.fillText(a.t,a.x,a.y);return a.l>0});if(p.length)requestAnimationFrame(tick);else c.clearRect(0,0,cv.width,cv.height)}
document.querySelectorAll('.btn,.wa').forEach(function(b){b.addEventListener('click',function(e){burst(e.clientX,e.clientY)})});
document.querySelectorAll('.seal').forEach(function(x){x.addEventListener('click',function(e){burst(e.clientX,e.clientY)})});
setTimeout(function(){burst(innerWidth/2,innerHeight*.4)},700);
var b=document.querySelector('.burger'),m=document.querySelector('.mm');
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
document.getElementById('yr').textContent=new Date().getFullYear();
})();
