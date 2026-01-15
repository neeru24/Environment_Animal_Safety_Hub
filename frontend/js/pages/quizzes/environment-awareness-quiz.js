
const questions=[
  {q:"Why should we plant trees?",o:["Decoration","More oxygen","Noise","Waste"],a:1},
  {q:"Which gas causes global warming?",o:["Oxygen","Carbon dioxide","Nitrogen","Helium"],a:1},
  {q:"Best way to save water?",o:["Leave taps open","Fix leaks","Waste water","Ignore"],a:1},
  {q:"Which helps reduce pollution?",o:["Burning waste","Planting trees","Cutting forests","Throwing trash"],a:1},
  {q:"Which is eco-friendly transport?",o:["Car","Bike","Cycle","Plane"],a:2},
  {q:"Why recycle waste?",o:["Increase trash","Save resources","Pollute air","Waste money"],a:1},
  {q:"Which energy is renewable?",o:["Coal","Solar","Oil","Gas"],a:1},
  {q:"What harms oceans the most?",o:["Clean water","Plastic waste","Fish","Sand"],a:1},
  {q:"What should we do with lights?",o:["Keep on","Switch off","Break","Ignore"],a:1},
  {q:"Clean environment means?",o:["Healthy life","More disease","Dirty water","Less oxygen"],a:0}
];

let index=0,score=0,seconds=120,timer;

function startQuiz(){
  startScreen.style.display="none";
  quizScreen.style.display="block";
  loadQuestion();
  startTimer();
}

function startTimer(){
  updateTime();
  timer=setInterval(()=>{
    seconds--;
    updateTime();
    if(seconds<=0){
      clearInterval(timer);
      showResult();
    }
  },1000);
}

function updateTime(){
  let m=Math.floor(seconds/60);
  let s=seconds%60;
  time.textContent=`${m}:${s<10?'0':''}${s}`;
}

function loadQuestion(){
  let q=questions[index];
  question.textContent=`Q${index+1}. ${q.q}`;
  options.innerHTML="";
  q.o.forEach((opt,i)=>{
    let div=document.createElement("div");
    div.className="option";
    div.textContent=opt;
    div.onclick=()=>selectOption(div,i);
    options.appendChild(div);
  });
}

function selectOption(el,i){
  document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"));
  el.classList.add("selected");
  el.dataset.correct=i===questions[index].a;
}

function nextQuestion(){
  let selected=document.querySelector(".option.selected");
  if(!selected) return alert("Please select an option 😊");
  if(selected.dataset.correct==="true") score++;
  index++;
  if(index<questions.length) loadQuestion();
  else showResult();
}

function showResult(){
  clearInterval(timer);
  quizScreen.style.display="none";
  resultScreen.style.display="block";
  scoreEl.textContent=`${score} / ${questions.length}`;
  remark.textContent= score>=8 ? "🌟 Eco Champion!" : score>=5 ? "👍 Good effort!" : "🌱 Keep learning!";
}

const scoreEl=document.getElementById("score");
