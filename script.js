const drivers = [
  { name: "Max Verstappen", team: "Red Bull", emoji: "🐂", color: "#0600EF", image: "images/max-verstappen.jpg", pace: 97, racecraft: 95, consistency: 95, tyre: 92, wet: 93, mental: 96 },
  { name: "Sergio Perez", team: "Red Bull", emoji: "🇲🇽", color: "#0600EF", image: "images/sergio-perez.jpg", pace: 88, racecraft: 89, consistency: 85, tyre: 90, wet: 87, mental: 84 },
  { name: "Lewis Hamilton", team: "Mercedes", emoji: "🐐", color: "#00D2BE", image: "images/lewis-hamilton.jpg", pace: 92, racecraft: 96, consistency: 93, tyre: 95, wet: 97, mental: 94 },
  { name: "George Russell", team: "Mercedes", emoji: "🇬🇧", color: "#00D2BE", image: "images/george-russell.jpg", pace: 90, racecraft: 88, consistency: 87, tyre: 86, wet: 85, mental: 88 },
  { name: "Charles Leclerc", team: "Ferrari", emoji: "🐴", color: "#DC0000", image: "images/charles-leclerc.jpg", pace: 94, racecraft: 88, consistency: 85, tyre: 84, wet: 82, mental: 87 },
  { name: "Carlos Sainz", team: "Ferrari", emoji: "🇪🇸", color: "#DC0000", image: "images/carlos-sainz.jpg", pace: 89, racecraft: 90, consistency: 88, tyre: 87, wet: 86, mental: 89 },
  { name: "Lando Norris", team: "McLaren", emoji: "🧡", color: "#FF8700", image: "images/lando-norris.jpg", pace: 91, racecraft: 89, consistency: 88, tyre: 86, wet: 85, mental: 90 },
  { name: "Oscar Piastri", team: "McLaren", emoji: "🇦🇺", color: "#FF8700", image: "images/oscar-piastri.jpg", pace: 88, racecraft: 85, consistency: 84, tyre: 83, wet: 82, mental: 86 },
  { name: "Fernando Alonso", team: "Aston Martin", emoji: "🇪🇸", color: "#006C3F", image: "images/fernando-alonso.jpg", pace: 89, racecraft: 94, consistency: 91, tyre: 92, wet: 90, mental: 95 },
  { name: "Lance Stroll", team: "Aston Martin", emoji: "🇨🇦", color: "#006C3F", image: "images/lance-stroll.jpg", pace: 82, racecraft: 80, consistency: 78, tyre: 79, wet: 77, mental: 80 }
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
    card.style.borderLeftColor = driver.color;
    card.style.borderLeftWidth = "6px";

    // Special positioning for certain drivers
    let imgStyle = "width: 100%; height: 100%; object-fit: cover;";
    if (driver.name === "Carlos Sainz") {
      imgStyle = "width: 100%; height: 100%; object-fit: cover; object-position: center 30%;";
    }

    card.innerHTML = `
      <div class="card-image" style="background: linear-gradient(135deg, ${driver.color}40, ${driver.color}20);">
        <img src="${driver.image}" alt="${driver.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="${imgStyle}">
        <div class="emoji-fallback" style="display: none; font-size: 80px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">${driver.emoji}</div>
      </div>
      <div class="card-content">
        <div class="team-badge" style="background: ${driver.color};">${driver.team}</div>
        <h2>${driver.name}</h2>
        <div class="ovr">${driver.ovr}</div>
        <p class="team">⭐ Click for details</p>
      </div>
    `;
    
    card.addEventListener("click", () => showDriverDetail(driver));
    card.addEventListener("mouseenter", () => card.style.boxShadow = `0 0 40px ${driver.color}80`);
    card.addEventListener("mouseleave", () => card.style.boxShadow = "0 0 25px rgba(255,0,0,0.6)");
    
    container.appendChild(card);

    select1.add(new Option(driver.name, driver.name));
    select2.add(new Option(driver.name, driver.name));
  });
}

function showDriverDetail(driver) {
  const detail = document.getElementById("driver-detail");
  const content = document.getElementById("detail-content");
  
  const stats = [
    { label: "Pace", value: driver.pace },
    { label: "Racecraft", value: driver.racecraft },
    { label: "Consistency", value: driver.consistency },
    { label: "Tyre Mgmt", value: driver.tyre },
    { label: "Wet Skill", value: driver.wet },
    { label: "Mental", value: driver.mental }
  ];
  
  let statsHTML = stats.map(s => `
    <div style="margin: 15px 0;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
        <span>${s.label}</span>
        <span style="color: gold; font-weight: bold;">${s.value}</span>
      </div>
      <div class="stat-bar">
        <div class="stat-fill" style="width: ${(s.value / 100) * 100}%"></div>
      </div>
    </div>
  `).join("");
  
  content.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 100px; margin: 20px 0;">${driver.emoji}</div>
      <h1 style="color: ${driver.color}; margin: 0;">${driver.name}</h1>
      <h2 style="color: white; margin: 5px 0; font-size: 24px;">${driver.team}</h2>
      <div class="ovr" style="font-size: 60px;">${driver.ovr}</div>
      <p style="color: #999; font-size: 12px; margin-top: 10px;">Overall Rating</p>
    </div>
    <div style="margin-top: 30px; border-top: 2px solid #ff1e1e; padding-top: 20px;">
      <h3 style="color: #ff1e1e; text-align: left;">Stats Breakdown</h3>
      ${statsHTML}
    </div>
  `;
  
  detail.classList.remove("hidden");
  detail.style.animation = "fadeIn 0.3s ease";
}

function closeDetail() {
  document.getElementById("driver-detail").classList.add("hidden");
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
