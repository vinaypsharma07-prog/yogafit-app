// Screens
const login = document.getElementById("login");
const goal = document.getElementById("goal");
const routine = document.getElementById("routine");
const plan = document.getElementById("plan");
const dashboard = document.getElementById("dashboard");

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

// Step 1
function saveUser(){
  user = {
    name: name.value,
    age: age.value,
    weight: weight.value,
    height: height.value
  };
  if(!user.name) return alert("Enter name");
  localStorage.setItem("user",JSON.stringify(user));
  show(goal);
}

// Step 2
function selectGoal(g){
  selectedGoal = g;
  show(routine); // ✅ FIX
}

// Step 3
function selectRoutine(r){
  selectedRoutine = r;
  buildPlan();
  show(plan); // ✅ FIX
}

// Step 4
function buildPlan(){
  poses = [];
  if(selectedRoutine==="Morning"){
    poses = ["Surya Namaskar","Bhujangasana","Vrikshasana"];
  }else{
    poses = ["Padmasana","Pranayama","Shavasana"];
  }

  planList.innerHTML="";
  poses.forEach(p=>{
    let li=document.createElement("li");
    li.innerText=p;
    planList.appendChild(li);
  });
}

// Step 5
function openDashboard(){
  welcome.innerText="Welcome "+user.name;
  poseList.innerHTML="";
  poses.forEach(p=>{
    let li=document.createElement("li");
    li.innerText=p;
    poseList.appendChild(li);
  });
  show(dashboard);
}

// Timer
function startTimer(){
  let sec=minutes.value*60;
  let t=setInterval(()=>{
    sec--;
    timer.innerText=sec+" sec";
    if(sec<=0){
      clearInterval(t);
      alert("Yoga Complete");
    }
  },1000);
}

// BMI
function showBMI(){
  let bmi=(user.weight/((user.height/100)**2)).toFixed(2);
  bmiEl=bmi;
  bmi.innerText="BMI: "+bmiEl;
}

// Alarm
function setAlarm(h){
  if(Notification.permission!=="granted"){
    Notification.requestPermission();
  }
  let now=new Date();
  let alarm=new Date();
  alarm.setHours(h,0,0,0);
  if(alarm<now) alarm.setDate(alarm.getDate()+1);
  setTimeout(()=>{
    new Notification("Yoga Reminder",{body:"Time for Yoga"});
  },alarm-now);
  alert("Alarm set");
}

// Logout
function logout(){
  localStorage.clear();
  location.reload();
}
