
const allQuestions = [
 {q:"What is climate change?",o:["Daily weather","Long-term temperature change","Rain only","Wind only"],a:1},
 {q:"Main cause of global warming?",o:["Trees","Greenhouse gases","Oxygen","Clouds"],a:1},
 {q:"Which gas traps heat?",o:["Oxygen","Carbon dioxide","Nitrogen","Helium"],a:1},
 {q:"Which activity harms climate?",o:["Planting trees","Burning fossil fuels","Recycling","Saving water"],a:1},
 {q:"How can kids help climate?",o:["Waste energy","Plant trees","Burn trash","Use plastic"],a:1},
 {q:"Effect of global warming?",o:["Ice melts","More forests","No change","Less sunlight"],a:0},
 {q:"Eco-friendly transport?",o:["Car","Plane","Cycle","Bike with fuel"],a:2},
 {q:"Saving electricity helps?",o:["More heat","Less pollution","More waste","Nothing"],a:1},
 {q:"Which is renewable energy?",o:["Coal","Solar","Oil","Gas"],a:1},
 {q:"Plastic waste causes?",o:["Clean ocean","Pollution","More fish","Cold water"],a:1},
 {q:"Planting trees helps because?",o:["Decoration","Absorb CO₂","Make noise","Waste land"],a:1},
 {q:"Climate change affects?",o:["Only animals","Only humans","Everyone","Nobody"],a:2},
 {q:"Which saves water?",o:["Fix leaks","Leave taps open","Waste water","Ignore"],a:0},
 {q:"Best habit?",o:["Reuse items","Throw trash","Burn waste","Ignore pollution"],a:0},
 {q:"Earth is getting?",o:["Colder","Warmer","Same","Frozen"],a:1}
];

let quiz=[],index=0,score=0,seconds=0,timer;
let userAnswers=[];

function startQuiz(){
  quiz=[...allQuestions].sort(()=>0.5-Math.random()).slice(0,10);
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
    if(seconds<=0){clearInterval(timer);showResult()}
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
  userAnswers[index]=i;
}

function nextQuestion(){
  if(userAnswers[index]==null) return alert("Please select an option 😊");
  if(userAnswers[index]===quiz[index].a) score++;
  index++;
  index<quiz.length ? loadQuestion() : showResult();
}

function showResult(){
  clearInterval(timer);
  quizScreen.style.display="none";
  resultScreen.style.display="block";
  score.textContent=`${score} / ${quiz.length}`;
  remark.textContent = score>=8 ? "🌟 Climate Hero!" : score>=5 ? "👍 Well Done!" : "🌱 Keep Learning!";
}

function showReview(){
  resultScreen.style.display="none";
  reviewScreen.style.display="block";
  reviewList.innerHTML="";
  quiz.forEach((q,i)=>{
    reviewList.innerHTML+=`
      <div class="review-card">
        <p><strong>Q${i+1}:</strong> ${q.q}</p>
        <p>Your Answer: <span class="${userAnswers[i]===q.a?'correct':'wrong'}">
          ${q.o[userAnswers[i]]}
        </span></p>
        <p>Correct Answer: <span class="correct">${q.o[q.a]}</span></p>
      </div>`;
  });
}
