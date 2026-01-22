let poses = [
  "Surya Namaskar – Full body workout",
  "Vrikshasana – Balance & focus",
  "Bhujangasana – Spine strength",
  "Padmasana – Meditation posture"
];

const loginBox = document.getElementById("loginBox");
const appBox = document.getElementById("appBox");

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const bmiBtn = document.getElementById("bmiBtn");
const timerBtn = document.getElementById("timerBtn");

const welcome = document.getElementById("welcome");
const poseList = document.getElementById("poseList");

loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
bmiBtn.addEventListener("click", calculateBMI);
timerBtn.addEventListener("click", startTimer);

function login() {
  let name = document.getElementById("username").value;
  if(name === "") return alert("Enter name");

  localStorage.setItem("user", name);
  loadApp();
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function loadApp() {
  let user = localStorage.getItem("user");
  if(user){
    loginBox.classList.add("hidden");
    appBox.classList.remove("hidden");
    welcome.innerText = "Welcome " + user;

    poseList.innerHTML = "";
    poses.forEach(p=>{
      let li = document.createElement("li");
      li.innerText = p;
      poseList.appendChild(li);
    });
  }
}

function calculateBMI() {
  let w = document.getElementById("weight").value;
  let h = document.getElementById("height").value / 100;
  let bmi = (w / (h*h)).toFixed(2);

  document.getElementById("bmiResult").innerText = "Your BMI: " + bmi;
}

function startTimer() {
  let min = document.getElementById("minutes").value;
  let sec = min * 60;

  let timer = setInterval(()=>{
    sec--;
    document.getElementById("timerDisplay").innerText = "Time left: " + sec + " sec";

    if(sec <= 0){
      clearInterval(timer);
      alert("Yoga Session Completed!");
    }
  },1000);
}

window.onload = loadApp;
