let poses = [
  { name: "Surya Namaskar", benefits: "Full body workout" },
  { name: "Vrikshasana", benefits: "Balance & focus" },
  { name: "Bhujangasana", benefits: "Spine strength" },
  { name: "Padmasana", benefits: "Meditation posture" }
];

let poseList = document.getElementById("poseList");

poses.forEach(pose => {
  let li = document.createElement("li");
  li.innerText = pose.name + " - " + pose.benefits;
  poseList.appendChild(li);
});

function login() {
  let name = document.getElementById("username").value;
  document.getElementById("welcome").innerText = "Welcome " + name + " 🙏";
}

function calcBMI() {
  let w = document.getElementById("weight").value;
  let h = document.getElementById("height").value / 100;
  let bmi = (w / (h * h)).toFixed(2);
  document.getElementById("bmiResult").innerText = "Your BMI: " + bmi;
}

function startTimer() {
  let min = document.getElementById("minutes").value;
  let sec = min * 60;
  let timer = setInterval(() => {
    sec--;
    document.getElementById("timer").innerText = "Time left: " + sec + " sec";
    if (sec <= 0) {
      clearInterval(timer);
      alert("Yoga Session Complete!");
    }
  }, 1000);
}
