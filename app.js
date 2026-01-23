// State
let user = JSON.parse(localStorage.getItem("yogafit_user")) || {};
let selectedGoal = "";
let selectedRoutine = "";
let currentPlan = [];

// Screens
const sLogin = id("screenLogin");
const sGoal = id("screenGoal");
const sRoutine = id("screenRoutine");
const sPlan = id("screenPlan");
const sDash = id("screenDashboard");

function id(x){ return document.getElementById(x); }

// Start
window.onload = () => {
  if(user.name){
    selectedGoal = user.goal;
    selectedRoutine = user.routine;
    currentPlan = user.plan || [];
    showDashboard();
  }
};

// Step 1: Save user
function saveUser(){
  user = {
    name: id("name").value,
    age: id("age").value,
    weight: id("weight").value,
    height: id("height").value
  };
  if(!user.name) return alert("Enter name");
  localStorage.setItem("yogafit_user", JSON.stringify(user));
  show(sGoal);
}

// Step 2: Goal
function selectGoal(goal){
  selectedGoal = goal;
  show(sRoutine);
}

// Step 3: Routine
function selectRoutine(r){
  selectedRoutine = r;
  buildPlan();
  show(sPlan);
}

// Step 4: Build plan
function buildPlan(){
  const key = `${selectedRoutine}_${selectedGoal}`;
  currentPlan = plans[key] || [];
  user.goal = selectedGoal;
  user.routine = selectedRoutine;
  user.plan = currentPlan;
  localStorage.setItem("yogafit_user", JSON.stringify(user));

  const ul = id("planList"); ul.innerHTML="";
  currentPlan.forEach(p=>{
    const li=document.createElement("li");
    li.innerHTML = `<b>${p.name}</b> – ${p.benefit}`;
    ul.appendChild(li);
  });
}

// Step 5: Dashboard
function goDashboard(){ showDashboard(); }

function showDashboard(){
  show(sDash);
  id("welcome").innerText = `Welcome ${user.name}`;
  renderPoses();
}

function renderPoses(){
  const ul = id("poseList"); ul.innerHTML="";
  currentPlan.forEach(p=>{
    const li=document.createElement("li");
    li.innerHTML = `
      <div>
        <img src="${p.img}" style="width:100%;border-radius:8px">
        <b>${p.name}</b><br>${p.benefit}
      </div>`;
    ul.appendChild(li);
  });
}

// Utilities
function show(el){
  [sLogin,sGoal,sRoutine,sPlan,sDash].forEach(x=>x.classList.add("hidden"));
  el.classList.remove("hidden");
}

// Timer
function startTimer(){
  let sec = (id("minutes").value||0)*60;
  const t = setInterval(()=>{
    sec--;
    id("timerDisplay").innerText = `Time left: ${sec}s`;
    if(sec<=0){ clearInterval(t); alert("Session completed"); }
  },1000);
}

// BMI
function showBMI(){
  const w = user.weight, h = user.height/100;
  const bmi = (w/(h*h)).toFixed(2);
  id("bmiResult").innerText = `BMI: ${bmi}`;
}

// Progress
function markDone(){
  id("progress").innerText = "Completed today";
}

// Reset
function resetApp(){
  localStorage.removeItem("yogafit_user");
  location.reload();
}

/* ---------------- ALARM (Timezone based) ---------------- */

function requestNotify(){
  if(Notification.permission!=="granted"){
    Notification.requestPermission();
  }
}

function setDailyAlarm(hour, minute, title, body){
  requestNotify();
  const now = new Date();
  const t = new Date();
  t.setHours(hour,minute,0,0);
  if(t<now) t.setDate(t.getDate()+1);
  const delay = t-now;

  setTimeout(()=>{
    notify(title,body);
    setInterval(()=>notify(title,body), 24*60*60*1000);
  }, delay);
}

function notify(title, body){
  new Notification(title,{ body, icon:"icon.png" });
  const a = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  a.play();
}

function setMorningAlarm(){ setDailyAlarm(6,0,"Morning Yoga","Time for morning yoga"); alert("Morning alarm set 06:00"); }
function setEveningAlarm(){ setDailyAlarm(18,0,"Evening Yoga","Time for evening yoga"); alert("Evening alarm set 18:00"); }
function setOnePMAlarm(){ setDailyAlarm(13,0,"Yoga Reminder","Daily yoga reminder"); alert("Reminder set 13:00"); }
