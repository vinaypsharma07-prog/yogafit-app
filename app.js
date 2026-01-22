window.onload = function () {
  const list = document.getElementById("yogaList");

  yogaData.forEach(yoga => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${yoga.name}</strong><br>
                      Duration: ${yoga.duration}<br>
                      Benefits: ${yoga.benefits}<br><br>`;
    list.appendChild(item);
  });
};

function startYoga() {
  alert("Morning Yoga Session Started!");
}

function startMeditation() {
  alert("Meditation Session Started. Relax and breathe.");
}
