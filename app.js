// LOGIN
function loginUser() {
  let username = document.getElementById("username").value;
  if (username === "") {
    alert("Enter username");
    return;
  }
  localStorage.setItem("user", username);
  document.getElementById("welcomeUser").innerText = "Welcome " + username;
}

// LOAD USER
window.onload = function () {
  let user = localStorage.getItem("user");
  if (user) {
    document.getElementById("welcomeUser").innerText = "Welcome " + user;
  }
};

// YOGA POSES
let poses = [
  { name: "Surya Namaskar", benefit: "Full body workout" },
  { name: "Vrikshasana", benefit: "Balance & focus" },
  { name: "Bhujangasana", benefit: "Spine strength" },
  { name: "Padmasana", benefit: "Meditation posture" }
];

let poseList = document.getElementById("poseList");
poses.forEach(p => {
  let li = document.createElement("li");
  li.innerText = p.name + " - " + p.benefit;
  poseList.appendChild(li);
});

// BMI
function calculateBMI() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;

  let bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
  document.getElementById("bmiResult").innerText = "Your BMI: " + bmi;
}

// TIMER
function startTimer() {
  let minutes = document.getElementById("minutes").value;
  let seconds = minutes * 60;

  let timer = setInterval(() => {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;

    document.getElementById("timerDisplay").innerText =
      min + ":" + (sec < 10 ? "0" : "") + sec;

    if (seconds <= 0) {
      clearInterval(timer);
      alert("Yoga Session Complete!");
    }

    seconds--;
  }, 1000);
}
