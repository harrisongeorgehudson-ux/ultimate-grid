const drivers = [
  { name: "Max Verstappen", team: "Red Bull", pace: 97, racecraft: 95, consistency: 95, tyre: 92, wet: 93, mental: 96 },
  { name: "Sergio Perez", team: "Red Bull", pace: 88, racecraft: 89, consistency: 85, tyre: 90, wet: 87, mental: 84 },
  { name: "Lewis Hamilton", team: "Mercedes", pace: 92, racecraft: 96, consistency: 93, tyre: 95, wet: 97, mental: 94 },
  { name: "George Russell", team: "Mercedes", pace: 90, racecraft: 88, consistency: 87, tyre: 86, wet: 85, mental: 88 },
  { name: "Charles Leclerc", team: "Ferrari", pace: 94, racecraft: 88, consistency: 85, tyre: 84, wet: 82, mental: 87 },
  { name: "Carlos Sainz", team: "Ferrari", pace: 89, racecraft: 90, consistency: 88, tyre: 87, wet: 86, mental: 89 },
  { name: "Lando Norris", team: "McLaren", pace: 91, racecraft: 89, consistency: 88, tyre: 86, wet: 85, mental: 90 },
  { name: "Oscar Piastri", team: "McLaren", pace: 88, racecraft: 85, consistency: 84, tyre: 83, wet: 82, mental: 86 },
  { name: "Fernando Alonso", team: "Aston Martin", pace: 89, racecraft: 94, consistency: 91, tyre: 92, wet: 90, mental: 95 },
  { name: "Lance Stroll", team: "Aston Martin", pace: 82, racecraft: 80, consistency: 78, tyre: 79, wet: 77, mental: 80 }
];

function calculateOVR(driver) {
  return Math.round(
    driver.pace * 0.25 +
    driver.racecraft * 0.20 +
    driver.consistency * 0.15 +
    driver.tyre * 0.15 +
    driver.wet * 0.10 +
    driver.mental * 0.15
  );
}

let allDrivers = drivers.map(d => ({ ...d, ovr: calculateOVR(d) }));

function loadDrivers() {
  const container = document.getElementById("driver-container");
  const select1 = document.getElementById("driver1");
  const select2 = document.getElementById("driver2");

  allDrivers.forEach(driver => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${driver.name}</h2>
      <div class="ovr">${driver.ovr}</div>
      <p class="team">${driver.team}</p>
    `;
    container.appendChild(card);

    select1.add(new Option(driver.name, driver.name));
    select2.add(new Option(driver.name, driver.name));
  });
}

function compareDrivers() {
  const name1 = document.getElementById("driver1").value;
  const name2 = document.getElementById("driver2").value;

  const d1 = allDrivers.find(d => d.name === name1);
  const d2 = allDrivers.find(d => d.name === name2);

  document.getElementById("comparison").innerHTML = `<canvas id="radarChart"></canvas>`;
  const ctx = document.getElementById("radarChart");

  new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Pace","Racecraft","Consistency","Tyre","Wet","Mental"],
      datasets: [
        { label: d1.name, data: [d1.pace,d1.racecraft,d1.consistency,d1.tyre,d1.wet,d1.mental], borderColor: "red", backgroundColor: "rgba(255,0,0,0.3)" },
        { label: d2.name, data: [d2.pace,d2.racecraft,d2.consistency,d2.tyre,d2.wet,d2.mental], borderColor: "white", backgroundColor: "rgba(255,255,255,0.2)" }
      ]
    },
    options: {
      scales: { r: { min:70, max:100, ticks:{color:"white"}, grid:{color:"rgba(255,0,0,0.3)"}, pointLabels:{color:"white"} } },
      plugins: { legend: { labels: { color: "white" } } }
    }
  });
}

loadDrivers();
