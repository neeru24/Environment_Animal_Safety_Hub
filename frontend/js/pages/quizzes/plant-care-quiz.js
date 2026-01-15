
const questions = [
 {q:"How often should plants be watered?",o:["Every hour","Only when soil is dry","Never","Once a year"],a:1},
 {q:"Why do plants need sunlight?",o:["For decoration","For photosynthesis","For water","For insects"],a:1},
 {q:"Which is best for plant growth?",o:["Plastic soil","Healthy soil","Dry sand","Rocks"],a:1},
 {q:"Overwatering plants can?",o:["Help growth","Kill plants","Make leaves shiny","Increase sunlight"],a:1},
 {q:"Best time to water plants?",o:["Afternoon","Morning or evening","Midnight","Anytime"],a:1},
 {q:"What helps plants grow strong?",o:["Trash","Fertilizer","Plastic","Smoke"],a:1},
 {q:"Indoor plants need?",o:["Direct sunlight always","Proper light & water","No care","Only shade"],a:1},
 {q:"Why remove dry leaves?",o:["Looks bad","Helps plant grow","Hurts plant","Attracts bugs"],a:1},
 {q:"Plants help environment by?",o:["Making noise","Producing oxygen","Using plastic","Creating waste"],a:1},
 {q:"Which is good plant habit?",o:["Overwatering","Ignoring","Regular care","Breaking stems"],a:2}
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
    score>=6 ? "🌟 Plant Care Pro!" :
    score>=4 ? "👍 Good Job!" :
    "🌱 Keep Learning!";
}
