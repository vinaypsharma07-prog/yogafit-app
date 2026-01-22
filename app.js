// Yoga Session Start
function startYoga() {
  alert("🧘 Morning Yoga Session Started!\n\nTake a deep breath and begin your practice.");
}

// Meditation Session Start
function startMeditation() {
  alert("🧘‍♂️ Meditation Session Started!\n\nRelax your mind and focus on your breathing.");
}

// PWA Service Worker Registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("sw.js")
      .then(function () {
        console.log("Service Worker Registered Successfully");
      })
      .catch(function (error) {
        console.log("Service Worker Registration Failed:", error);
      });
  });
}
