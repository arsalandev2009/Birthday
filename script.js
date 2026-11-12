(function(){
  var COLS=["#FF8A7A","#FFD04D","#7CC4EE","#8FD9C4","#FFB3C7","#B7A3F2"];
  function $(id){return document.getElementById(id)}

  /* floating balloons and stars (fewer on small screens) */
  var sky=$("sky"),count=window.innerWidth<600?5:9,i,el,b;
  for(i=0;i<8;i++){
    el=document.createElement("span");el.className="star";
    el.style.left=(8+(i*37)%84)+"%";el.style.top=(6+(i*29)%88)+"%";el.style.animationDelay=(i*.4)+"s";
    sky.appendChild(el);
  }
  for(i=0;i<count;i++){
    el=document.createElement("div");el.className="b";
    el.style.left=(i*(100/count)+3)+"%";
    el.style.animationDuration=(16+(i*5)%11)+"s";
    el.style.animationDelay=(-i*3.3)+"s";
    b=document.createElement("i");
    var w=40+(i*7)%28;
    b.style.cssText="width:"+w+"px;height:"+(w*1.18)+"px;background:"+COLS[i%6]+";animation-duration:"+(3+i%3)+"s";
    el.appendChild(b);sky.appendChild(el);
  }

  /* countdown */
  var target=new Date($("cd").getAttribute("data-date")).getTime();
  function pad(n){return String(n).padStart(2,"0")}
  function tick(){
    var s=Math.floor((target-Date.now())/1000);
    if(s<=0){$("cd").hidden=true;$("cd-done").hidden=false;return false}
    $("cd-d").textContent=pad(Math.floor(s/86400));
    $("cd-h").textContent=pad(Math.floor(s%86400/3600));
    $("cd-m").textContent=pad(Math.floor(s%3600/60));
    $("cd-s").textContent=pad(s%60);
    return true;
  }
  if(tick()){var t=setInterval(function(){if(!tick())clearInterval(t)},1000)}

  /* RSVP */
  function confetti(){
    for(var k=0;k<44;k++){
      var c=document.createElement("span");c.className="cf";
      c.style.left=Math.random()*100+"%";c.style.background=COLS[k%6];
      c.style.animationDuration=(2.4+Math.random()*2.2)+"s";c.style.animationDelay=(Math.random()*.6)+"s";
      document.body.appendChild(c);
      setTimeout(function(n){return function(){n.remove()}}(c),5500);
    }
  }
  function reply(yes){
    var n=$("guest").value.trim()||"friend";
    $("reply-t").textContent=yes?"Hooray, "+n+"! See you there 🎈":"We’ll miss you, "+n+" 💙";
    $("reply-s").textContent=yes?"Your reply is noted. Bring your best dance moves.":"Thank you for letting us know. We’ll send you a cake photo.";
    $("ask").hidden=true;$("reply").hidden=false;
    if(yes)confetti();
  }
  $("yes").addEventListener("click",function(){reply(true)});
  $("no").addEventListener("click",function(){reply(false)});
  $("undo").addEventListener("click",function(){$("reply").hidden=true;$("ask").hidden=false});
})();
