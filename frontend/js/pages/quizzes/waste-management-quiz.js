
const questions=[
 {q:"Where should vegetable peels go?",o:["Dry Waste","Wet Waste","Plastic","Glass"],a:1},
 {q:"Which item is recyclable?",o:["Food waste","Plastic bottle","Used tissue","Leaves"],a:1},
 {q:"Where does broken glass go?",o:["Wet","Dry","Hazardous","Plastic"],a:2},
 {q:"Best way to reduce waste?",o:["Burn it","Reuse items","Throw away","Ignore"],a:1},
 {q:"Which bin for paper?",o:["Wet","Dry","Hazardous","Medical"],a:1},
 {q:"Plastic bags harm because?",o:["They dissolve","They pollute","They help soil","They vanish"],a:1},
 {q:"What is composting?",o:["Burning waste","Recycling plastic","Turning waste to manure","Dumping trash"],a:2},
 {q:"Used batteries go to?",o:["Wet","Dry","Hazardous","Recycle bin"],a:2},
 {q:"Which helps environment?",o:["Littering","Segregation","Burning trash","Plastic use"],a:1},
 {q:"Wet waste mainly comes from?",o:["Kitchen","Bathroom","Road","Factory"],a:0}
];

let index=0,score=0,time=180,timer;

function startQuiz(){
 startScreen.style.display="none";
 quizScreen.style.display="block";
 loadQuestion();
 startTimer();
}

function startTimer(){
 updateTime();
 timer=setInterval(()=>{
   time--;
   updateTime();
   if(time<=0){
     clearInterval(timer);
     showResult();
   }
 },1000);
}

function updateTime(){
 let m=Math.floor(time/60);
 let s=time%60;
 document.getElementById("time").textContent=`${m}:${s<10?'0':''}${s}`;
}

function loadQuestion(){
 let q=questions[index];
 question.textContent=`Q${index+1}. ${q.q}`;
 options.innerHTML="";
 q.o.forEach((opt,i)=>{
   let div=document.createElement("div");
   div.className="option";
   div.innerHTML=`<i class="fa-solid fa-trash"></i> ${opt}`;
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
 document.getElementById("score").textContent=`${score} / ${questions.length}`;
 remark.textContent =
   score>=8 ? "🌟 Waste Warrior!" :
   score>=5 ? "👍 Good Effort!" :
   "🌱 Keep Learning!";
}
