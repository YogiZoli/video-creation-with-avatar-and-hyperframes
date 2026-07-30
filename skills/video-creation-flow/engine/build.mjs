// Video Creation Flow — HyperFrames exp-v9 kinetic motion-graphics engine, per DESIGN.md. Brand independent.
// Per video: edit ONLY the S array. Timing = word-count proportion of the VO (assets/vo.mp3).
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
let D = 30;
try { D = parseFloat(execSync('ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 assets/vo.mp3').toString().trim()) || D; } catch (e) {}
const rr = n => Math.round(n*100)/100;
const BLUE='#1a73e8', NAVY='#0e2038', GREEN='#34a853', ORANGE=GREEN; // accent = GREEN (Zoltan 2026-07-30, no orange)

// ---- SCENES (demo set; replace with full script mapped to scenes). `w` = spoken text for timing. ----
const S = [
  { type:'hero', kick:'WELCOME', title:'YOUR TITLE', sub:'Your subtitle goes here.', w:'Open with a short hook that tells them what they will get.' },
  { type:'statement', kick:'BIG IDEA', lines:['One clear','MESSAGE'], emph:1, w:'State one clear message and emphasize a single key word.' },
  { type:'arrow', a:'PROBLEM', b:'RESULT', glow:'OWN', w:'Show the transformation from the problem to the result they want.' },
  { type:'funnel', kick:'THREE LEVELS', sub:'Top, middle, bottom.', w:'Break your idea into three simple levels from biggest to smallest.' },
  { type:'pill', text:'Comment <b>WORD</b> below', w:'Give them one simple action, a single keyword to type or click.' },
  { type:'split', left:'The old way', right:'The better way', word:'BETTER', sub:'Contrast two options.', w:'Contrast the old way with the better way and name the winner.' },
  { type:'gohighlevel', sub:'Every step tracked in your dashboard.', w:'Show the tool where the name and the email get captured and tracked.' },
  { type:'leadzoom', sub:'Every contact becomes yours to keep.', w:'Zoom in on one record so they see the detail you capture and own.' },
  { type:'counterbars', kick:'THE NUMBERS', sub:'Small change, big result.', w:'Put two bars side by side and let the numbers count up to the payoff.' },
  { type:'personas', kick:'WORKS FOR ANYONE', sub:'Creator, team, or agency.', w:'Reassure them this works for every type of person in your audience.' },
  { type:'endcta', title:'Reply <b>YES</b>', pill:'YOUR PROMISE', btn:'Get Started', w:'Close with one clear call to action and a soft pulsing button.' },
];

const wc = s => s.trim().split(/\s+/).length;
const totalW = S.reduce((a,s)=>a+wc(s.w||'x'),0);
let acc=0; S.forEach(s=>{ s.start=rr(D*acc/totalW); acc+=wc(s.w||'x'); });
S.forEach((s,i)=>{ const e=(i+1<S.length)?S[i+1].start:rr(D); s.dur=rr(e-s.start); });

const sections=[], tw=[];
S.forEach((s,i)=>{
  const t=s.start, d=s.dur; let inner='';
  const kick = s.kick ? '<div class="kick" id="k'+i+'">'+s.kick+'</div>' : '';
  const sub  = s.sub  ? '<div class="sub" id="sb'+i+'">'+s.sub+'</div>' : '';
  if (s.kick) tw.push('KICK("#k'+i+'",'+rr(t+0.2)+')');
  if (s.sub)  tw.push('FI("#sb'+i+'",'+rr(t+d*0.5)+')');

  if (s.type==='hero'){
    inner = kick + '<div class="herowrap"><span class="ring rl" id="rl'+i+'"></span><div class="title" id="h'+i+'">'+s.title+'</div><span class="ring rr" id="rr'+i+'"></span></div><div class="uln" id="u'+i+'"></div>' + sub;
    tw.push('RISE("#h'+i+'",'+rr(t+0.4)+')'); tw.push('RING("#rl'+i+'",'+rr(t+0.7)+')'); tw.push('RING("#rr'+i+'",'+rr(t+0.85)+')'); tw.push('GX("#u'+i+'",'+rr(t+1.3)+',0.7)');
  } else if (s.type==='statement'){
    let ls=''; s.lines.forEach((l,j)=>{ const cl=(j===s.emph)?'title blue':'title navy sm'; ls+='<div class="'+cl+' ln'+i+'">'+l+'</div>'; });
    inner = kick + '<div class="stmt">'+ls+'</div>' + sub;
    tw.push('REVEAL("#s'+i+' .ln'+i+'",'+rr(t+0.4)+')');
  } else if (s.type==='arrow'){
    inner = kick + '<div class="arrow"><div class="bigw blue" id="a1'+i+'">'+s.a+'</div><svg class="arsvg" width="220" height="110" viewBox="0 0 220 110"><line id="arl'+i+'" x1="12" y1="55" x2="160" y2="55" stroke="'+ORANGE+'" stroke-width="12" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><polyline id="arh'+i+'" points="142,32 190,55 142,78" fill="none" stroke="'+ORANGE+'" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg><div class="bigw blue" id="a2'+i+'">'+s.b+'</div></div>'+(s.glow?'<div class="glow" id="gw'+i+'">'+s.glow+'</div>':'')+sub;
    tw.push('RISE("#a1'+i+'",'+rr(t+0.3)+')'); tw.push('DRAW("#arl'+i+'",'+rr(t+0.8)+',0.5)'); tw.push('DRAW("#arh'+i+'",'+rr(t+1.2)+',0.35)'); tw.push('RISE("#a2'+i+'",'+rr(t+1.5)+')');
    if (s.glow){ tw.push('POP("#gw'+i+'",'+rr(t+2.0)+')'); tw.push('BURN("#gw'+i+'",'+rr(t+2.4)+','+rr(d-3)+')'); }
  } else if (s.type==='funnel'){
    const rows=[['COLD','most',BLUE,96],['WARM','some',ORANGE,66],['HOT','a few',NAVY,38]];
    let f='<div class="funnel">'; rows.forEach(r=>{ f+='<div class="frow"><div class="fbar fb'+i+'" style="width:'+r[3]+'%;background:'+r[2]+'"><span class="fl">'+r[0]+'</span><span class="fr">'+r[1]+'</span></div></div>'; }); f+='</div>';
    inner = kick + f + sub; tw.push('BARS("#s'+i+' .fb'+i+'",'+rr(t+0.5)+')');
  } else if (s.type==='pill'){
    inner = '<div class="cpill" id="cp'+i+'"><span class="cpic"></span>'+s.text+'</div>' + sub;
    tw.push('POP("#cp'+i+'",'+rr(t+0.4)+')');
  } else if (s.type==='branch'){
    inner = kick + '<svg class="branch" width="1400" height="440" viewBox="0 0 1400 440"><g class="bn'+i+'"><rect x="60" y="175" rx="18" width="300" height="90" fill="#fff" stroke="'+BLUE+'" stroke-width="4"/><text x="210" y="233" text-anchor="middle" font-family="Inter" font-size="42" font-weight="800" fill="'+NAVY+'">'+s.from+'</text></g><path id="bp1'+i+'" d="M360 205 C 620 205, 620 95, 880 95" fill="none" stroke="'+BLUE+'" stroke-width="6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path id="bp2'+i+'" d="M360 235 C 620 235, 620 345, 880 345" fill="none" stroke="'+ORANGE+'" stroke-width="6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><g class="ba'+i+'"><rect x="880" y="40" rx="18" width="460" height="110" fill="#eaf1ff" stroke="'+BLUE+'" stroke-width="3"/><text x="1110" y="92" text-anchor="middle" font-family="Inter" font-size="44" font-weight="800" fill="'+BLUE+'">'+s.a[0]+'</text><text x="1110" y="132" text-anchor="middle" font-family="Inter" font-size="26" fill="#5b6b86">to '+s.a[1]+'</text></g><g class="bb'+i+'"><rect x="880" y="290" rx="18" width="460" height="110" fill="#fdeede" stroke="'+ORANGE+'" stroke-width="3"/><text x="1110" y="342" text-anchor="middle" font-family="Inter" font-size="44" font-weight="800" fill="'+ORANGE+'">'+s.b[0]+'</text><text x="1110" y="382" text-anchor="middle" font-family="Inter" font-size="26" fill="#5b6b86">to '+s.b[1]+'</text></g></svg>' + sub;
    tw.push('POP("#s'+i+' .bn'+i+'",'+rr(t+0.4)+')'); tw.push('DRAW("#bp1'+i+'",'+rr(t+0.9)+',0.9)'); tw.push('DRAW("#bp2'+i+'",'+rr(t+1.1)+',0.9)'); tw.push('POP("#s'+i+' .ba'+i+'",'+rr(t+1.9)+')'); tw.push('POP("#s'+i+' .bb'+i+'",'+rr(t+2.2)+')');
  } else if (s.type==='split'){
    inner = kick + '<div class="split"><div class="scard sc'+i+'"><div class="mk x">&#10007;</div><div class="scl">'+s.left+'</div></div><div class="scard sc'+i+'"><div class="mk ok">&#10003;</div><div class="scl">'+s.right+'</div></div></div><div class="bigw blue" id="sw'+i+'" style="margin-top:34px">'+s.word+'</div>' + sub;
    tw.push('POPS("#s'+i+' .sc'+i+'",'+rr(t+0.5)+')'); tw.push('RISE("#sw'+i+'",'+rr(t+1.4)+')');
  } else if (s.type==='gohighlevel'){
    inner = '<div class="ghl" id="gh'+i+'"><div class="ghside"><div class="ghbrand"><span class="ghlogo"></span>Dashboard</div><div class="ghnav on">Contacts</div><div class="ghnav">Calendars</div><div class="ghnav">Messages</div></div><div class="ghmain"><div class="ghtitle">Contact Details</div><div class="ghlbl">Full name</div><div class="ghinp" id="gn'+i+'"></div><div class="ghlbl">Email address</div><div class="ghinp" id="ge'+i+'"></div></div><div class="ghbubble" id="gb'+i+'">"How can I sign up?"</div></div>' + sub;
    tw.push('R("#gh'+i+'",'+rr(t+0.4)+',1.0)'); tw.push('TYPE("#gn'+i+'","Alex Rivers",'+rr(t+1.2)+',1.4)'); tw.push('TYPE("#ge'+i+'","alex@email.com",'+rr(t+2.8)+',1.8)'); tw.push('POP("#gb'+i+'",'+rr(t+1.0)+')');
  } else if (s.type==='leadzoom'){
    inner = '<div class="lead" id="ld'+i+'"><div class="lhead"><div class="lav">AR</div><div><div class="lname">Alex Rivers</div><div class="lrole">YouTube viewer</div></div><div class="lbadge">ACTIVE LEAD</div></div><div class="lfields"><div><div class="lfk">PRIMARY INTENT</div><div class="lfv">Wants the guide</div></div><div><div class="lfk">TEMPERATURE</div><div class="lfv orange">Warm to Hot</div></div></div><div class="zoom" id="zm'+i+'"></div><div class="ztag" id="zt'+i+'">EXACTLY</div></div>' + sub;
    tw.push('R("#ld'+i+'",'+rr(t+0.4)+',1.0)'); tw.push('ZOOM("#zm'+i+'",'+rr(t+1.2)+','+rr(d-2)+')'); tw.push('POP("#zt'+i+'",'+rr(t+2.4)+')');
  } else if (s.type==='counterbars'){
    inner = kick + '<div class="bars"><div class="bcol"><div class="bnum" id="bn1'+i+'" style="color:'+BLUE+'">0</div><div class="bbar" id="ba1'+i+'" style="background:'+BLUE+';height:120px"></div><div class="blbl">Subscribers</div></div><div class="bcol"><div class="bnum" id="bn2'+i+'" style="color:'+GREEN+'">0</div><div class="bwrap"><span class="bbadge" id="bd'+i+'">+312%</span><div class="bbar" id="ba2'+i+'" style="background:'+GREEN+';height:280px"></div></div><div class="blbl">Email list</div></div></div>' + sub;
    tw.push('BARSH("#ba1'+i+'",'+rr(t+0.5)+')'); tw.push('BARSH("#ba2'+i+'",'+rr(t+0.8)+')'); tw.push('COUNT("#bn1'+i+'",12400,'+rr(t+0.5)+')'); tw.push('COUNT("#bn2'+i+'",47900,'+rr(t+0.8)+')'); tw.push('POP("#bd'+i+'",'+rr(t+d-1.4)+')');
  } else if (s.type==='personas'){
    const ps=[['Course Creator'],['YouTuber'],['Agency']];
    let g='<div class="pers">'; ps.forEach((p,j)=>{ g+='<div class="pcol"><div class="pcirc pc'+i+'"><span class="porb"></span><span class="pico"></span></div><div class="plbl">'+p[0]+'</div></div>'; }); g+='</div>';
    inner = kick + g + sub; tw.push('POPS("#s'+i+' .pc'+i+'",'+rr(t+0.5)+')'); tw.push('ORBIT("#s'+i+' .porb",'+rr(t+1.2)+','+rr(d-2)+')');
  } else if (s.type==='endcta'){
    inner = '<div class="appic" id="ai'+i+'"></div><div class="ectitle" id="et'+i+'">'+s.title+'</div><div class="ecpill" id="ep'+i+'">'+s.pill+'</div><div class="ecbtn" id="eb'+i+'">'+s.btn+' &#8594;</div>';
    tw.push('POP("#ai'+i+'",'+rr(t+0.3)+')'); tw.push('POP("#et'+i+'",'+rr(t+0.7)+')'); tw.push('FI("#ep'+i+'",'+rr(t+1.4)+')'); tw.push('POP("#eb'+i+'",'+rr(t+1.9)+')'); tw.push('SOFT("#eb'+i+'",'+rr(t+2.3)+','+rr(d-3)+')');
  }
  sections.push('<section id="s'+i+'" class="clip" data-start="'+rr(s.start)+'" data-duration="'+rr(s.dur)+'" data-track-index="1"><div class="cam">'+inner+'</div></section>');
});
// ambient + per-scene enter/exit + camera
tw.push('tl.to(".grid",{backgroundPositionX:"64px",backgroundPositionY:"40px",duration:'+rr(D)+',ease:"none"},0)');
tw.push('tl.fromTo(".brk",{opacity:0},{opacity:1,duration:1.0,ease:"power2.out"},0.2)');
tw.push('tl.to(".g1",{xPercent:10,yPercent:8,duration:'+rr(D)+',ease:"sine.inOut"},0)');
tw.push('tl.to(".g2",{xPercent:-8,yPercent:-6,duration:'+rr(D)+',ease:"sine.inOut"},0)');
S.forEach((s,i)=>{ const t=s.start,d=s.dur,sel='#s'+i+' .cam';
  tw.push('tl.fromTo("'+sel+'",{opacity:0,y:44,scale:.97},{opacity:1,y:0,scale:1,duration:.5,ease:"power3.out"},'+rr(t)+')');
  tw.push('tl.to("'+sel+'",{scale:1.03,duration:'+rr(d)+',ease:"sine.inOut"},'+rr(t)+')');
  if(i>0){ tw.push('tl.to("'+sel+'",{opacity:0,y:-30,duration:.32,ease:"power2.in"},'+rr(t+d-0.32)+')'); tw.push('tl.set("'+sel+'",{opacity:0},'+rr(t+d)+')'); }
});

const css = `
 body{margin:0;font-family:Inter,system-ui,sans-serif;background:#eef3f7;}
 #root{position:relative;width:1920px;height:1080px;overflow:hidden;color:${NAVY};background:radial-gradient(1500px 1000px at 50% 12%,#ffffff 0%,#eef3f7 55%,#e6edf6 100%);}
 .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(26,115,232,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(26,115,232,.09) 1px,transparent 1px);background-size:104px 104px;-webkit-mask-image:radial-gradient(1300px 820px at 50% 46%,#000 0%,transparent 88%);mask-image:radial-gradient(1300px 820px at 50% 46%,#000 0%,transparent 88%);}
 .g1,.g2{position:absolute;border-radius:50%;filter:blur(70px);} .g1{width:820px;height:820px;background:radial-gradient(circle,rgba(52,168,83,.10),transparent 70%);top:-220px;right:-140px;} .g2{width:820px;height:820px;background:radial-gradient(circle,rgba(26,115,232,.17),transparent 70%);bottom:-220px;left:-140px;}
 .brk{position:absolute;width:120px;height:120px;border:0 solid rgba(14,32,56,.28);} .b1{top:64px;left:64px;border-left-width:6px;border-top-width:6px;} .b2{top:64px;right:64px;border-right-width:6px;border-top-width:6px;} .b3{bottom:64px;left:64px;border-left-width:6px;border-bottom-width:6px;} .b4{bottom:64px;right:64px;border-right-width:6px;border-bottom-width:6px;}
 .clip{position:absolute;inset:0;}
 .cam{position:absolute;inset:0;padding:0 150px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:30px;transform-origin:center;will-change:transform;box-sizing:border-box;}
 .kick{font-size:46px;letter-spacing:9px;font-weight:800;color:${BLUE};text-transform:uppercase;}
 .sub{font-size:52px;font-weight:600;color:#41527a;max-width:1400px;line-height:1.25;}
 .herowrap{position:relative;display:inline-flex;align-items:center;justify-content:center;padding:0 30px;}
 .title{font-size:130px;font-weight:800;line-height:.96;letter-spacing:-2px;overflow:hidden;padding:0 8px;white-space:nowrap;} .title.sm{font-size:92px;} .navy{color:${NAVY};} .blue{color:${BLUE};} .orange{color:${ORANGE};}
 .ring{position:absolute;width:190px;height:190px;border:7px solid ${ORANGE};border-radius:50%;top:50%;transform:translateY(-50%);} .rl{left:-30px;} .rr{right:-30px;}
 .ch{display:inline-block;} .sp{display:inline-block;width:.28em;}
 .uln{width:340px;height:9px;border-radius:6px;background:linear-gradient(90deg,${BLUE},${ORANGE});transform-origin:left center;}
 .stmt{display:flex;flex-direction:column;gap:8px;}
 .bigw{font-size:128px;font-weight:800;letter-spacing:-2px;overflow:hidden;padding:0 8px;white-space:nowrap;}
 .arrow{display:flex;align-items:center;gap:36px;} .arsvg{overflow:visible;flex:none;}
 .glow{font-size:112px;font-weight:800;color:${GREEN};text-shadow:0 0 30px rgba(52,168,83,.42);}
 .funnel{display:flex;flex-direction:column;gap:26px;width:1300px;} .frow{display:flex;justify-content:center;} .fbar{height:120px;border-radius:18px;display:flex;align-items:center;justify-content:space-between;padding:0 42px;overflow:hidden;white-space:nowrap;box-shadow:0 22px 54px -20px rgba(14,32,56,.4);} .fl{font-size:60px;font-weight:800;color:#fff;} .fr{font-size:36px;font-weight:600;color:rgba(255,255,255,.9);}
 .cpill{display:inline-flex;align-items:center;gap:22px;background:#fff;border-radius:70px;padding:30px 56px;font-size:62px;font-weight:800;color:${NAVY};box-shadow:0 26px 60px -22px rgba(14,32,56,.35);} .cpill b{color:${BLUE};} .cpic{width:56px;height:56px;border-radius:50%;background:#eaf1ff;flex:none;}
 .branch{overflow:visible;} .split{display:flex;gap:90px;} .scard{width:360px;height:300px;background:#fff;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;box-shadow:0 26px 60px -22px rgba(14,32,56,.3);} .mk{width:100px;height:100px;border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:56px;font-weight:800;} .mk.x{background:#fdeaea;color:#e24b4a;} .mk.ok{background:#e6f6ee;color:#17b26a;} .scl{font-size:44px;font-weight:800;color:${NAVY};}
 .ghl{position:relative;width:1500px;height:640px;background:#fff;border-radius:26px;display:flex;overflow:hidden;box-shadow:0 34px 80px -30px rgba(14,32,56,.35);} .ghside{width:330px;background:#f6f9ff;border-right:1px solid #e9eff8;padding:34px;text-align:left;} .ghbrand{display:flex;align-items:center;gap:12px;font-size:30px;font-weight:800;color:${BLUE};margin-bottom:40px;} .ghlogo{width:40px;height:40px;border-radius:11px;background:${BLUE};} .ghnav{font-size:26px;font-weight:600;color:#5b6b86;padding:16px 18px;border-radius:12px;margin-bottom:8px;} .ghnav.on{background:#eaf1ff;color:${BLUE};} .ghmain{flex:1;padding:44px 50px;text-align:left;} .ghtitle{font-size:52px;font-weight:800;color:${BLUE};margin-bottom:30px;} .ghlbl{font-size:22px;font-weight:700;letter-spacing:2px;color:#8a99b5;text-transform:uppercase;margin-top:24px;} .ghinp{margin-top:12px;background:#f4f8ff;border:2px solid #e3ecf8;border-radius:14px;padding:22px 26px;font-size:36px;min-height:30px;color:${NAVY};} .ghbubble{position:absolute;top:40px;right:44px;background:${ORANGE};color:#fff;font-size:30px;font-weight:700;padding:20px 28px;border-radius:18px 18px 4px 18px;box-shadow:0 18px 40px -14px rgba(245,124,31,.5);}
 .lead{position:relative;width:1400px;height:520px;background:#fff;border-radius:26px;padding:50px 60px;text-align:left;box-shadow:0 34px 80px -30px rgba(14,32,56,.35);overflow:hidden;} .lhead{display:flex;align-items:center;gap:22px;} .lav{width:92px;height:92px;border-radius:50%;background:${BLUE};color:#fff;font-size:38px;font-weight:800;display:flex;align-items:center;justify-content:center;} .lname{font-size:46px;font-weight:800;color:${NAVY};} .lrole{font-size:26px;color:#8a99b5;} .lbadge{margin-left:auto;background:#eaf1ff;color:${BLUE};font-size:24px;font-weight:700;padding:12px 24px;border-radius:40px;} .lfields{display:flex;gap:160px;margin-top:44px;} .lfk{font-size:24px;letter-spacing:1px;color:${BLUE};font-weight:700;} .lfv{font-size:44px;font-weight:800;color:${NAVY};margin-top:8px;} .zoom{position:absolute;top:150px;left:820px;width:300px;height:300px;border:8px solid ${BLUE};border-radius:50%;box-shadow:0 0 44px rgba(26,115,232,.25);} .ztag{position:absolute;top:270px;left:1120px;font-size:80px;font-weight:800;color:${ORANGE};}
 .bars{display:flex;gap:220px;align-items:flex-end;height:400px;margin-top:36px;} .bcol{display:flex;flex-direction:column;align-items:center;} .bnum{font-size:54px;font-weight:800;} .bwrap{position:relative;display:flex;flex-direction:column;align-items:center;} .bbar{width:170px;border-radius:16px 16px 0 0;margin-top:14px;transform-origin:bottom;} .blbl{font-size:36px;color:#5b6b86;font-weight:600;margin-top:20px;} .bbadge{position:absolute;top:-52px;left:50%;transform:translateX(-50%);white-space:nowrap;background:${GREEN};color:#fff;font-size:30px;font-weight:800;padding:10px 22px;border-radius:40px;box-shadow:0 14px 30px -12px rgba(52,168,83,.45);}
 .pers{display:flex;gap:180px;} .pcol{display:flex;flex-direction:column;align-items:center;gap:24px;} .pcirc{position:relative;width:220px;height:220px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 26px 60px -24px rgba(14,32,56,.3);} .porb{position:absolute;inset:-10px;border:5px solid ${ORANGE};border-top-color:transparent;border-radius:50%;} .pico{width:100px;height:100px;border-radius:22px;background:${BLUE};} .plbl{font-size:42px;font-weight:800;color:${NAVY};}
 .appic{width:112px;height:112px;border-radius:26px;background:${BLUE};box-shadow:0 22px 50px -20px rgba(26,115,232,.5);} .ectitle{font-size:128px;font-weight:800;letter-spacing:-2px;color:${NAVY};overflow:hidden;padding:0 8px;} .ectitle b{color:${BLUE};} .ecpill{font-size:38px;font-weight:700;letter-spacing:5px;color:#5b6b86;background:#fff;border-radius:50px;padding:18px 44px;box-shadow:0 14px 34px -14px rgba(14,32,56,.35);} .ecbtn{font-size:54px;font-weight:800;color:#fff;background:${ORANGE};border-radius:22px;padding:28px 60px;box-shadow:0 26px 60px -18px rgba(245,124,31,.6);}
`;

const H = '<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=1920, height=1080"/><title>Motion Graphics Video</title>'+
 '<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></scr'+'ipt><style>'+css+'</style></head><body>'+
 '<div id="root" data-composition-id="main" data-start="0" data-width="1920" data-height="1080" data-duration="'+rr(D)+'">'+
 '<div class="g1"></div><div class="g2"></div><div class="grid"></div>'+
 '<div class="brk b1"></div><div class="brk b2"></div><div class="brk b3"></div><div class="brk b4"></div>'+
 '<audio id="vo" src="assets/vo.mp3" data-start="0" data-duration="'+rr(D)+'" data-track-index="10" data-volume="1"></audio>'+
 sections.join('')+'</div><script>\n'+
 'const tl=gsap.timeline({paused:true});\n'+
 'const R=(s,at,d)=>tl.from(s,{opacity:0,y:44,duration:d||1.0,ease:"power3.out"},at);\n'+
 'const KICK=(s,at)=>tl.from(s,{opacity:0,y:-16,duration:.55,ease:"power2.out"},at);\n'+
 'const FI=(s,at,d)=>tl.from(s,{opacity:0,y:24,duration:d||.7,ease:"power2.out"},at);\n'+
 'const REVEAL=(s,at)=>tl.from(s,{opacity:0,y:40,duration:.6,stagger:.12,ease:"power3.out"},at);\n'+
 'const RISE=(s,at)=>{const e=document.querySelector(s);if(e){e.innerHTML=e.textContent.split("").map(function(c){return c===" "?"<span class=\\"sp\\"></span>":"<span class=\\"ch\\">"+c+"</span>";}).join("");tl.from(e.querySelectorAll(".ch"),{yPercent:120,opacity:0,duration:.6,stagger:.045,ease:"power4.out"},at);}};\n'+
 'const POP=(s,at)=>tl.fromTo(s,{scale:.3,opacity:0,transformOrigin:"center"},{scale:1,opacity:1,duration:.6,ease:"back.out(1.7)"},at);\n'+
 'const POPS=(s,at)=>tl.fromTo(s,{scale:0,opacity:0,transformOrigin:"center"},{scale:1,opacity:1,duration:.55,stagger:.18,ease:"back.out(1.8)"},at);\n'+
 'const DRAW=(s,at,d)=>tl.fromTo(s,{strokeDashoffset:1},{strokeDashoffset:0,duration:d||.7,ease:"power1.inOut"},at);\n'+
 'const GX=(s,at,d)=>tl.fromTo(s,{scaleX:0},{scaleX:1,duration:d||.8,ease:"power3.out"},at);\n'+
 'const RING=(s,at)=>tl.fromTo(s,{scale:0,opacity:0,transformOrigin:"center"},{scale:1,opacity:1,duration:.7,ease:"back.out(1.7)"},at);\n'+
 'const BURN=(s,at,d)=>tl.to(s,{scale:1.06,duration:.85,repeat:Math.max(1,Math.round((d||3)/0.85)),yoyo:true,transformOrigin:"center",ease:"sine.inOut"},at);\n'+
 'const SOFT=(s,at,d)=>tl.to(s,{scale:1.04,duration:1.0,repeat:Math.max(1,Math.round((d||3)/1.0)),yoyo:true,transformOrigin:"center",ease:"sine.inOut"},at);\n'+
 'const BARS=(s,at)=>tl.from(s,{width:0,duration:1.0,stagger:.18,ease:"power3.out"},at);\n'+
 'const BARSH=(s,at)=>tl.fromTo(s,{scaleY:0},{scaleY:1,transformOrigin:"bottom",duration:1.1,ease:"power3.out"},at);\n'+
 'const COUNT=(s,val,at)=>{const o={v:0};tl.to(o,{v:val,duration:2.2,ease:"power1.out",onUpdate:function(){const e=document.querySelector(s);if(e)e.textContent=(val>=1000?(o.v/1000).toFixed(1)+"k":Math.round(o.v));}},at);};\n'+
 'const TYPE=(s,txt,at,d)=>{const o={n:0};tl.to(o,{n:txt.length,duration:d,ease:"none",onUpdate:function(){const e=document.querySelector(s);if(e)e.textContent=txt.slice(0,Math.round(o.n));}},at);};\n'+
 'const ZOOM=(s,at,d)=>tl.fromTo(s,{x:120,opacity:0},{x:-260,opacity:1,duration:d||3,yoyo:true,repeat:1,ease:"sine.inOut"},at);\n'+
 'const ORBIT=(s,at,d)=>tl.to(s,{rotation:360,duration:2.4,repeat:Math.max(1,Math.round((d||3)/2.4)),ease:"none",transformOrigin:"center"},at);\n'+
 tw.join(';\n')+';\n'+
 'window.__timelines=window.__timelines||{};window.__timelines["main"]=tl;\n</scr'+'ipt></body></html>';
writeFileSync('index.html', H);
console.log('build.mjs OK — D',rr(D),'scenes',S.length);
