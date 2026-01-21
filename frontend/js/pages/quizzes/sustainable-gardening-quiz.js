const questions = [
 {q:"What is composting?",o:["Throwing away food waste","Turning organic waste into fertilizer","Burning leaves","Using chemical fertilizers"],a:1},
 {q:"Why use native plants in gardening?",o:["They are cheaper","They require less water and attract local wildlife","They grow faster","They need more pesticides"],a:1},
 {q:"What is water conservation in gardening?",o:["Watering plants every hour","Using drip irrigation and mulching","Letting plants dry out","Using sprinklers all day"],a:1},
 {q:"How can you control pests without chemicals?",o:["Use ladybugs and neem oil","Spray more water","Remove affected plants","Ignore them"],a:0},
 {q:"What is mulching?",o:["Cutting plants short","Covering soil with organic material to retain moisture","Adding sand to soil","Using plastic sheets"],a:1},
 {q:"Why is biodiversity important in gardens?",o:["Makes garden look messy","Attracts beneficial insects and pollinators","Requires more work","Costs more money"],a:1},
 {q:"What is rainwater harvesting?",o:["Buying bottled water","Collecting rainwater for garden use","Using tap water only","Letting rain run off"],a:1},
 {q:"How to reduce garden waste?",o:["Throw everything away","Compost and reuse materials","Buy new tools every year","Use more chemicals"],a:1},
 {q:"What are companion plants?",o:["Plants that grow alone","Plants that help each other grow and repel pests","Plants that compete for space","Plants that need same soil"],a:1},
 {q:"Why avoid synthetic fertilizers?",o:["They are expensive","They can harm soil and water quality","They make plants grow too fast","They attract more pests"],a:1}
];

let quiz=[],index=0,score=0,timer,seconds=0;

function startQuiz(){
  quiz=[...questions].sort(()=>0.5-Math.random()).slice(0,7);
  seconds=parseInt(timeSelect.value);
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
  let q=quiz[index];
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
  el.dataset.correct=i===quiz[index].a;
}

function nextQuestion(){
  let selected=document.querySelector(".option.selected");
  if(!selected) return alert("Please select an option 🌱");
  if(selected.dataset.correct==="true") score++;
  index++;
  index<quiz.length ? loadQuestion() : showResult();
}

function showResult(){
  clearInterval(timer);
  quizScreen.style.display="none";
  resultScreen.style.display="block";
  score.textContent=`${score} / ${quiz.length}`;
  remark.textContent =
    score>=6 ? "🌟 Sustainable Gardening Expert!" :
    score>=4 ? "👍 Good Job!" :
    "🌱 Keep Learning!";
}
