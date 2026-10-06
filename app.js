// balloons
(function(){
  var c=['#ff3d8b','#ffd23f','#2fa8ff','#7ddf3b','#8c4bff','#ff6b35'],box=document.getElementById('balloons');
  for(var i=0;box&&i<14;i++){var b=document.createElement('div');b.className='balloon';
    b.style.left=(Math.random()*96)+'%';b.style.background=c[i%c.length];
    b.style.animationDuration=(14+Math.random()*14)+'s';b.style.animationDelay=(-Math.random()*20)+'s';
    var s=.6+Math.random()*.8;b.style.width=60*s+'px';b.style.height=76*s+'px';box.appendChild(b);}
})();
// reveal
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
// progress bar + glow
addEventListener('scroll',function(){var h=document.documentElement;document.getElementById('progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
var glow=document.getElementById('glow');
addEventListener('pointermove',function(e){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
// 3D tilt
document.querySelectorAll('.tilt').forEach(function(card){
  card.addEventListener('pointermove',function(e){var r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    card.style.transform='perspective(900px) rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg) translateY(-6px)'});
  card.addEventListener('pointerleave',function(){card.style.transform=''});
});
// counter
document.querySelectorAll('[data-count]').forEach(function(el){var t=+el.dataset.count,n=0,iv=setInterval(function(){n++;el.textContent=n;if(n>=t)clearInterval(iv)},400)});
// pick castle from price card
document.querySelectorAll('[data-pick]').forEach(function(a){a.addEventListener('click',function(){
  var sel=document.getElementById('item');if(!sel)return;for(var i=0;i<sel.options.length;i++){if(sel.options[i].text.indexOf(a.dataset.pick)===0)sel.selectedIndex=i}})});
// lightbox
var lb=document.getElementById('lightbox')||document.createElement('div');
document.querySelectorAll('.tile').forEach(function(t){t.addEventListener('click',function(){
  var img=t.querySelector('img');lb.innerHTML='';
  lb.appendChild(img?img.cloneNode():t.querySelector('svg').cloneNode(true));
  var el=lb.firstChild;if(el.tagName==='svg'){el.style.width='min(90vw,640px)';el.style.height='auto'}
  lb.classList.add('on')})});
lb.addEventListener('click',function(){lb.classList.remove('on')});
addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')});
// confetti burst
var cv=document.getElementById('confetti'),cx=cv.getContext('2d'),parts=[];
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
function burst(x,y){var col=['#ff3d8b','#ffd23f','#2fa8ff','#7ddf3b','#8c4bff','#ff6b35'];
  for(var i=0;i<90;i++)parts.push({x:x,y:y,vx:(Math.random()-.5)*14,vy:Math.random()*-14-4,g:.35,r:Math.random()*6+3,c:col[i%6],rot:Math.random()*6,vr:(Math.random()-.5)*.3,l:120});
  if(parts.length===90)tick()}
function tick(){cx.clearRect(0,0,cv.width,cv.height);
  parts=parts.filter(function(p){p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.rot+=p.vr;p.l--;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle=p.c;cx.globalAlpha=Math.max(p.l/120,0);cx.fillRect(-p.r,-p.r/2,p.r*2,p.r);cx.restore();return p.l>0&&p.y<cv.height+40});
  if(parts.length)requestAnimationFrame(tick);else cx.clearRect(0,0,cv.width,cv.height)}
document.querySelectorAll('.btn').forEach(function(b){b.addEventListener('click',function(e){burst(e.clientX,e.clientY)})});
if(document.getElementById('balloons'))setTimeout(function(){burst(innerWidth/2,innerHeight*.45)},900);
// WhatsApp form
(document.getElementById('bookForm')||document.createElement('form')).addEventListener('submit',function(e){e.preventDefault();
  var f=new FormData(e.target),
  t='Hi Latum Holdings! I would like to book.%0A'+
    'Name: '+encodeURIComponent(f.get('name'))+'%0A'+
    'Date: '+encodeURIComponent(f.get('date'))+'%0A'+
    'Service: '+encodeURIComponent(f.get('item'))+'%0A'+
    'Area: '+encodeURIComponent(f.get('area')||'-')+'%0A'+
    'Details: '+encodeURIComponent(f.get('msg')||'-');
  burst(innerWidth/2,innerHeight/2);
  setTimeout(function(){window.open('https://wa.me/27843194555?text='+t,'_blank')},500)});
var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();
// mobile menu
(function(){
  var bg=document.querySelector('.burger'),mm=document.querySelector('.mmenu');
  if(!bg||!mm)return;
  bg.addEventListener('click',function(){var o=mm.classList.toggle('open');bg.setAttribute('aria-expanded',o?'true':'false')});
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mm.classList.remove('open');bg.setAttribute('aria-expanded','false')})});
})();
