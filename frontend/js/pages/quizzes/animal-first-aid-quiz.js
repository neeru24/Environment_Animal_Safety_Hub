const questions=[
 {q:"What should you do first when you find an injured animal?",o:["Pick it up immediately","Approach slowly and assess","Run away","Call friends"],a:1},
 {q:"How should you treat a snake bite on an animal?",o:["Suck out the venom","Apply ice and keep calm","Cut the wound","Give alcohol"],a:1},
 {q:"What are signs of poisoning in animals?",o:["Excessive drooling and vomiting","Happy and playful","Sleeping normally","Eating well"],a:0},
 {q:"How to stop bleeding from a wound?",o:["Apply pressure with clean cloth","Pour water on it","Rub dirt in","Leave it alone"],a:0},
 {q:"When should you seek professional help for an injured animal?",o:["Always, even for minor injuries","Only if it's bleeding heavily","Never, handle it yourself","Only if it's a pet"],a:0},
 {q:"What is the first step for animal CPR?",o:["Check for breathing","Start compressions","Give mouth-to-mouth","Call vet immediately"],a:0},
 {q:"How to treat a burn on an animal?",o:["Apply butter or oil","Cool with water for 10-20 minutes","Cover with bandage tightly","Ignore it"],a:1},
 {q:"What to do if an animal has a broken bone?",o:["Move it to a safe place and immobilize","Pick it up and carry","Let it walk","Apply heat"],a:0},
 {q:"Signs that an animal is choking?",o:["Coughing and pawing at mouth","Sleeping peacefully","Eating normally","Running around"],a:0},
 {q:"What NOT to do when helping an injured wild animal?",o:["Feed it","Handle it gently","Keep distance if aggressive","Call wildlife experts"],a:0}
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
   div.innerHTML=`<i class="fa-solid fa-heart"></i> ${opt}`;
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
   score>=8 ? "🌟 Animal Hero!" :
   score>=5 ? "👍 Good Effort!" :
   "🐾 Keep Learning!";
}
