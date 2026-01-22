// Login
function loginUser() {
  const name = document.getElementById("loginName").value;
  localStorage.setItem("user", name);
  showApp();
}

function showApp() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("appBox").style.display = "block";
  document.getElementById("profileName").innerText = "Welcome " + localStorage.getItem("user");
  loadYoga();
}

function logoutUser() {
  localStorage.removeItem("user");
  location.reload();
}

// Yoga List
function loadYoga() {
  const list = document.getElementById("yogaList");
  list.innerHTML = "";
  yogaData.forEach(pose => {
    const li = document.createElement("li");
    li.innerText = pose;
    list.appendChild(li);
  });
}

// Admin Add Pose
function addPose() {
  const pose = document.getElementById("newPose").value;
  yogaData.push(pose);
  localStorage.setItem("yogaData", JSON.stringify(yogaData));
  loadYoga();
}

// Timer
function startTimer() {
  document.getElementById("timerResult").innerText = "Timer started!";
}

// BMI
function calculateBMI() {
  const w = weight.value;
  const h = height.value / 100;
  document.getElementById("bmiResult").innerText =
    "BMI: " + (w / (h*h)).toFixed(2);
}

// Progress
function markDone() {
  document.getElementById("progressResult").innerText = "Completed ✔";
}

// Language
function setLang(lang) {
  document.getElementById("poseTitle").innerText =
    lang === "hi" ? "योग आसन" : "Yoga Poses";
}

// Auto login
if(localStorage.getItem("user")) showApp();
