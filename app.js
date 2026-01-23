// Screens
const login = document.getElementById("login");
const goal = document.getElementById("goal");
const routine = document.getElementById("routine");
const plan = document.getElementById("plan");
const dashboard = document.getElementById("dashboard");

// Inputs (🔥 FIX HERE)
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");

// Data
let user = {};
let selectedGoal = "";
let selectedRoutine = "";
let poses = [];

// Utils
function show(screen){
  [login,goal,routine,plan,dashboard].forEach(s=>s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

// STEP 1 — LOGIN
function saveUser(){
  if(nameInput.value.trim()===""){
    alert("Enter name");
    return;
  }

  user = {
    name: nameInput.value,
    age: ageInput.value,
    weight: weightInput.value,
    height: heightInput.value
  };

  localStorage.setItem("user", JSON.stringify(user));
  show(goal);
}

// STEP 2 — GOAL
function selectGoal(g){
  selectedGoal = g;
  show(routine);
}

// STEP 3 — MORNING / EVENING
function selectRoutine(r){
  selectedRoutine = r;
  buildPlan();
  show(plan);
}

// STEP 4 — PLAN
function buildPlan(){
  poses = [];

  if(selectedRoutine === "Morning"){
    poses = ["Surya Namaskar","Bhujangasana","Vrikshasana"];
  } else {
    poses = ["Padmasana","Pranayama","Shavasana"];
  }

  planList.innerHTML="";
  poses.forEach(p=>{
    const li=document.createElement("li");
    li.textContent=p;
    planList.appendChild(li);
  });
}

// STEP 5 — DASHBOARD
function openDashboard(){
  welcome.textContent = "Welcome " + user.name;
  poseList.innerHTML="";
  poses.forEach(p=>{
    const li=document.createElement("li");
    li.textContent=p;
    poseList.appendChild(li);
  });
  show(dashboard);
}

// TIMER
function startTimer(){
  let sec = minutes.value * 60;
  const t = setInterval(()=>{
    sec--;
    timer.textContent = sec + " sec";
    if(sec<=0){
      clearInterval(t);
      alert("Yoga Complete");
    }
  },1000);
}

// BMI
function showBMI(){
  const bmiVal = (user.weight / ((user.height/100)**2)).toFixed(2);
  bmi.textContent = "BMI: " + bmiVal;
}

// ALARM
function setAlarm(h){
  if(Notification.permission !== "granted"){
    Notification.requestPermission();
  }
  const now = new Date();
  const alarm = new Date();
  alarm.setHours(h,0,0,0);
  if(alarm < now) alarm.setDate(alarm.getDate()+1);

  setTimeout(()=>{
    new Notification("Yoga Reminder",{body:"Time for Yoga"});
  }, alarm-now);

  alert("Alarm set");
}

// LOGOUT
function logout(){
  localStorage.clear();
  location.reload();
}
