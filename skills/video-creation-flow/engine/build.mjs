// C2C Expansion Pack — merged engine (exp-v9 bright kinetic base + build5 loved components), per DESIGN.md.
// Per video: edit ONLY the S array. Timing = word-count proportion of the VO (assets/vo.mp3).
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
let D = 30;
try { D = parseFloat(execSync('ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 assets/vo.mp3').toString().trim()) || D; } catch (e) {}
const rr = n => Math.round(n*100)/100;
const BLUE='#1a73e8', NAVY='#0e2038', GREEN='#34a853', ORANGE=GREEN; // accent = GREEN (Zoltan 2026-07-30, no orange)

// ---- SCENES (demo set; replace with full script mapped to scenes). `w` = spoken text for timing. ----
const S = [
  { type:'hero', kick:'YOU REPLIED YES', title:'EXPANSION PACK', sub:'Your free upgrade is unlocked.', w:'Thank you for replying YES. As promised, here is your free Expansion Pack.' },
  { type:'statement', kick:'REAL RESULTS', lines:['You actually want','REAL RESULTS'], emph:1, w:'You replied YES, so I know you actually want real results.' },
  { type:'statement', kick:'ACTION TAKER', lines:['You are an','ACTION TAKER'], emph:1, w:'You are an action taker, and I treat action takers differently.' },
  { type:'statement', lines:['No pitch here.','JUST VALUE'], emph:1, sub:'I will not try to sell you anything.', w:'Unlike most marketers, I won\'t try to sell you anything here.' },
  { type:'statement', lines:['No upsells. No upgrades.','NOTHING'], emph:1, w:'No upsells. No upgrades. Nothing.' },
  { type:'statement', kick:'YOU RAISED YOUR HAND', lines:['You replied YES.','THAT MATTERS'], emph:1, sub:'You did not just join a list.', w:'Someone who doesn\'t just join a list, but actually raises their hand and replies YES, even something that small, that person matters to me.' },
  { type:'statement', lines:['I appreciate','YOUR TRUST'], emph:1, w:'I really appreciate your trust, and I want you to get the most out of this.' },
  { type:'statement', kick:'WHAT YOU WILL LEARN', lines:['Higher opt in rate.','CONVERSIONS'], emph:1, w:'Here is what you will learn. How to increase your opt in rate and your conversions.' },
  { type:'arrow', a:'COMMENT', b:'CLIENT', w:'And the method behind Comment to Client.' },
  { type:'statement', lines:['No app needed.','SAME METHOD'], emph:1, sub:'It still lifts your conversions.', w:'Even if you never touch the app, you can use this method, and it will increase your conversions.' },
  { type:'split', left:'Cold email', right:'Authentic', word:'AUTHENTIC', sub:'Not pushy. Ever.', w:'These methods are authentic. They aren\'t pushy like cold email.' },
  { type:'statement', lines:['Use it with or','WITHOUT the app'], emph:1, w:'And you can use them with or without the app.' },
  { type:'pill', text:'Forever <b>FREE</b> plan', w:'You already have the forever free plan.' },
  { type:'gohighlevel', sub:'I run everything inside GoHighLevel.', w:'And I know not everyone uses GoHighLevel. I use it myself, and it\'s amazing, better than any other tool I have ever used.' },
  { type:'statement', lines:['The method works','WITHOUT it too'], emph:1, w:'But you can use the Comment to Client method even without it.' },
  { type:'statement', kick:'THE METHOD', lines:['Let me','SHOW YOU'], emph:1, w:'So let me show you the method.' },
  { type:'statement', kick:'ONE IDEA', lines:['It starts with','TEMPERATURE'], emph:1, w:'It starts with one idea. Lead temperature.' },
  { type:'funnel', kick:'LEAD TEMPERATURE', sub:'Hot, warm, cold. Not all the same.', w:'Your viewers aren\'t all the same. Some are hot. Some are warm. And some are cold.' },
  { type:'statement', kick:'HOT LEADS', lines:['Ready to act','RIGHT NOW'], emph:1, sub:'They know the problem and the price.', w:'Hot leads are ready to act right now. They know their problem. They know the solution. And they have the money to spend with you.' },
  { type:'arrow', a:'HOT', b:'SALES PAGE', w:'They don\'t want to waste time. So you send them straight to your sales page, where they can buy.' },
  { type:'statement', lines:['Not cold selling.','THEY ASKED'], emph:1, w:'And this isn\'t cold selling. They raised their hand first.' },
  { type:'pill', text:'They commented <b>ACTION</b>', w:'They commented ACTION, or TRIGGER, below your video.' },
  { type:'statement', lines:['You did not chase.','THEY CAME'], emph:1, w:'You didn\'t chase them. They asked you to send them your offer.' },
  { type:'statement', lines:['Not pushy.','INTERESTED'], emph:1, w:'So it\'s not pushy. They are clearly interested.' },
  { type:'statement', lines:['They came to you.','EVERYTHING'], emph:1, sub:'It changes everything.', w:'And because they came to you, it changes everything.' },
  { type:'statement', kick:'WARM AND COLD', lines:['They need','MORE FIRST'], emph:1, w:'Warm and cold leads are different. They need more first.' },
  { type:'statement', lines:['First deepen the','RELATIONSHIP'], emph:1, sub:'Before you offer anything.', w:'You deepen the relationship before you offer anything.' },
  { type:'split', left:'Cold email', right:'Real value', word:'VALUE', sub:'You never bother them.', w:'You don\'t bother them like a cold email would.' },
  { type:'pill', text:'Send the <b>GUIDE</b>', sub:'They asked for more, so you give more.', w:'They asked for more, so you give them more. You send them a guide, and you build trust.' },
  { type:'statement', lines:['When ready,','THEY TELL YOU'], emph:1, sub:'Then, and only then, you invite them to buy.', w:'When they are ready, they will tell you. Then, and only then, you invite them to buy.' },
  { type:'branch', from:'Comment', a:['GUIDE','the guide'], b:['ACTION','sales page'], sub:'The sales page is only for ACTION.', w:'So the sales page isn\'t for everyone. It is only for the people who comment ACTION or TRIGGER.' },
  { type:'statement', lines:['They said it','OUT LOUD'], emph:1, sub:'I want the result and I am ready.', w:'Those people said, out loud, I want the result and I am ready.' },
  { type:'pill', text:'Comment <b>GUIDE</b>, get the guide', w:'The people who comment GUIDE simply get your guide.' },
  { type:'statement', kick:'THE HEART OF IT', lines:['Treat viewers by','TEMPERATURE'], emph:1, w:'That is the heart of it. You treat viewers differently based on their temperature.' },
  { type:'statement', lines:['They raised their hand.','ONE SHIFT'], emph:1, sub:'One shift changes everything.', w:'They asked for it, they raised their hand. One shift changes everything.' },
  { type:'statement', kick:'INSIDE A VIDEO', lines:['Here is','HOW TO RUN IT'], emph:1, w:'Now let me show you exactly how to run this inside a video.' },
  { type:'pill', text:'Comment <b>GUIDE</b> below', sub:'Say it early in the video.', w:'Early in the video, say this: if you are interested in this, comment GUIDE below, and I will send it to you.' },
  { type:'statement', lines:['Your first','KEYWORD'], emph:1, w:'GUIDE is your first keyword.' },
  { type:'gohighlevel', sub:'A guide for their email. PDF or video.', w:'Then you deliver the guide in exchange for their email address. Usually a PDF or a video. Not a sales page.' },
  { type:'statement', kick:'PAST THE HALFWAY POINT', lines:['Spot who is','READY TO BUY'], emph:1, w:'Later, deeper into the video, past the halfway point, identify those who are ready to buy.' },
  { type:'pill', text:'Comment <b>TRIGGER</b> below', sub:'Send them the page to start today.', w:'Say this: If you are ready to pull the trigger, comment TRIGGER below, and I will send you the page where you can get it and start today.' },
  { type:'statement', lines:['By now,','THEY KNOW YOU'], emph:1, sub:'They watched most of your video.', w:'Here is why this works. By that point they have watched most of your video. They know you.' },
  { type:'statement', lines:['They comment ACTION.','READY'], emph:1, w:'So if they comment ACTION or TRIGGER, they are clearly ready.' },
  { type:'arrow', a:'COMMENT', b:'SALES PAGE', w:'Now you can send them a different page. A sales page. They asked for it. So they came to you.' },
  { type:'arrow', a:'COMMENT', b:'CLIENT', glow:'OWN', w:'This is the key. This is the shortest path from a comment to a client.' },
  { type:'statement', kick:'COURSE OR SERVICE', lines:['The fastest way from','COMMENT TO CLIENT'], emph:1, w:'If you sell a course, coaching, consulting, or a service, this is the fastest way to go from comment to client that exists.' },
  { type:'pill', text:'Comment <b>ACTION</b> for the link', sub:'You can be completely transparent.', w:'And you can be completely transparent. You can literally say: Comment ACTION, and I will send you the link to buy my course. That is fine.' },
  { type:'statement', lines:['They know you.','THEY TRUST YOU'], emph:1, w:'They already watched your video. They know you. They trust you. They know what your offer is about.' },
  { type:'statement', lines:['Exactly what','THEY ASKED FOR'], emph:1, w:'They raised their hand. Sending them the offer isn\'t pushy. It is exactly what they asked for.' },
  { type:'personas', kick:'WORKS FOR EVERYONE', sub:'Creator or agency. Same method.', w:'Think about what this gives you. It doesn\'t matter if you are a creator building your own audience, or an agency running this for your clients. The method is the same.' },
  { type:'statement', lines:['Handle every lead by','TEMPERATURE'], emph:1, w:'You handle every lead by their buying temperature.' },
  { type:'statement', lines:['Offer only after','REAL VALUE'], emph:1, w:'You only make an offer to people who actually want to buy, and only after you gave them real value.' },
  { type:'statement', lines:['Pull them deeper','WITH YOUR GUIDE'], emph:1, w:'You pull the warm and cold ones deeper into your world with your guide, before they are ready.' },
  { type:'leadzoom', sub:'You keep the contact. You own the relationship.', w:'But you never lose those who aren\'t ready to buy just yet. And you have their contact, which means you have time to build a real relationship.' },
  { type:'statement', lines:['Never bother anyone.','THEY ASKED'], emph:1, w:'You never bother anyone with an offer they didn\'t ask for.' },
  { type:'statement', lines:['Quicker for you.','FOCUS ON BUYERS'], emph:1, w:'Even better, it\'s quicker for you as well, because you focus on people who are ready to go ahead and buy, and you don\'t spend time with those who just aren\'t ready to buy yet.' },
  { type:'gohighlevel', sub:'AI drafts your reply. Every step tracked.', w:'If you use my app, your response is drafted with AI, unique and YouTube safe, and every step is tracked inside your GoHighLevel.' },
  { type:'statement', lines:['Or run it','FREE BY HAND'], emph:1, sub:'Reply to the email. I read every one.', w:'But even without the app, you can run this for free by hand. And if a question comes up about implementing it, just reply to the email, I read every one.' },
  { type:'statement', kick:'MAKE IT SIMPLE', lines:['Two steps,','THEN REPEAT'], emph:1, w:'Let me make it simple. Two steps, then repeat.' },
  { type:'pill', text:'Step one. Comment <b>GUIDE</b>', sub:'Send them to your free guide.', w:'One. Early in the video, say: Comment GUIDE below, and I will send you my guide. Send them to a page where they download your free guide. Usually a PDF, or something similar.' },
  { type:'pill', text:'Step two. Comment <b>TRIGGER</b>', sub:'They know you. They are ready to buy.', w:'Two. In the second half, say: If you are ready to pull the trigger, comment TRIGGER below, and I will help you implement this. These people already know you. They are raising their hand. They are ready to buy.' },
  { type:'statement', lines:['Repeat both calls.','GUIDE and TRIGGER'], emph:1, sub:'At least two calls to action per video.', w:'Then, at the end, repeat your calls to action, GUIDE and TRIGGER. Use at least two calls to action per video.' },
  { type:'statement', lines:['More invitations.','MORE BUYERS'], emph:1, w:'More invitations means more people sign up, and more people buy.' },
  { type:'statement', kick:'WHAT MOST GET WRONG', lines:['They play for the','ALGORITHM'], emph:1, w:'This is the part most creators get wrong. Most people play for the algorithm.' },
  { type:'statement', lines:['Views, fame, AdSense.','WRONG GAME'], emph:1, w:'They chase views, virality, fame, AdSense, or a sponsorship. That is the wrong game.' },
  { type:'statement', lines:['Play for your','AUDIENCE'], emph:1, sub:'Not the algorithm.', w:'Play for your audience, not the algorithm.' },
  { type:'arrow', a:'VIEWER', b:'CONTACT', w:'With the Comment to Client method, you turn a viewer into a real contact.' },
  { type:'statement', lines:['Build a real','RELATIONSHIP'], emph:1, sub:'Or they buy right away.', w:'Now you have time to build a real relationship. Or they buy right away.' },
  { type:'statement', lines:['They ask for it.','YOUR RESULTS'], emph:1, sub:'You never bother anyone.', w:'This one simple change, you never bother anyone, they ask for it themselves, is what changes your results.' },
  { type:'counterbars', kick:'DO THE MATH', sub:'Separate buyers from browsers. Multiply revenue.', w:'If you turn viewers into real subscribers, and you separate those who are just interested from those who are real buyers, it will multiply your revenue.' },
  { type:'statement', kick:'REVENUE ATTRIBUTION', lines:['Know which video','MAKES MONEY'], emph:1, w:'And if you use my app, you know exactly which video brings you money. Revenue attribution shows you exactly which video produced the result.' },
  { type:'statement', kick:'REMEMBER ONE THING', lines:['Build on what you','CONTROL'], emph:1, sub:'Not on hope.', w:'If you remember only one thing from this video, this is it. Build your revenue on something you control, not on hope.' },
  { type:'split', left:'AdSense, sponsors', right:'Your email list', word:'CONTROL', sub:'You do not control the first.', w:'You DO NOT control: AdSense. Affiliate. Sponsorship.' },
  { type:'statement', lines:['You cannot build on','HOPE'], emph:1, w:'You can\'t build your revenue on hope.' },
  { type:'statement', kick:'OWN IT', lines:['Real contacts,','REAL BUYERS'], emph:1, sub:'An email list, independent of the algorithm.', w:'Rely on something you can control: an email list. Real contacts, with real emails. And real buyers. Independent of the algorithm.' },
  { type:'statement', lines:['Any question?','JUST REPLY'], emph:1, sub:'I read every reply personally.', w:'If you have any question about this strategy, just reply to the email you received. I read every reply personally, and I will answer you.' },
  { type:'endcta', title:'Reply <b>BUY</b>', pill:'100% OWNERSHIP', btn:'Get Instant Access', w:'And if you are ready to experience the difference in ACTION, fully automatic, reply BUY, and I will send you my page where you can get it and start today.' },
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
    inner = '<div class="ghl" id="gh'+i+'"><div class="ghside"><div class="ghbrand"><span class="ghlogo"></span>GoHighLevel</div><div class="ghnav on">Contacts</div><div class="ghnav">Calendars</div><div class="ghnav">Messages</div></div><div class="ghmain"><div class="ghtitle">Contact Details</div><div class="ghlbl">Full name</div><div class="ghinp" id="gn'+i+'"></div><div class="ghlbl">Email address</div><div class="ghinp" id="ge'+i+'"></div></div><div class="ghbubble" id="gb'+i+'">"How can I sign up?"</div></div>' + sub;
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

const H = '<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=1920, height=1080"/><title>C2C Expansion Pack</title>'+
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
