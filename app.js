let poses = [
  "Surya Namaskar – Full body workout",
  "Vrikshasana – Balance & focus",
  "Bhujangasana – Spine strength",
  "Padmasana – Meditation posture"
];

function login() {
  let name = document.getElementById("username").value;
  if(name=="") return alert("Enter name");

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
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("appBox").classList.remove("hidden");
    document.getElementById("welcome").innerText = "Welcome " + user;

    let list = document.getElementById("poseList");
    poses.forEach(p=>{
      let li = document.createElement("li");
      li.innerText = p;
      list.appendChild(li);
    });
  }
}

function calculateBMI() {
  let w = weight.value;
  let h = height.value / 100;
  let bmi = (w / (h*h)).toFixed(2);

  let result = "BMI: " + bmi;
  if(bmi < 18) result += " (Underweight)";
  else if(bmi < 25) result += " (Normal)";
  else result += " (Overweight)";

  bmiResult.innerText = result;
}

function startTimer() {
  let min = minutes.value;
  let sec = min * 60;

  let timer = setInterval(()=>{
    sec--;
    timerDisplay.innerText = "Time left: " + sec + " sec";

    if(sec <= 0){
      clearInterval(timer);
      alert("Yoga Session Completed!");
    }
  },1000);
}

window.onload = loadApp;
