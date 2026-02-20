const teams = [
  { name: "Red Bull Racing", color: "#0600EF", history: 92, form: 90, engineering: 97, leadership: 95, experience: 88, pitcrew: 96 },
  { name: "Mercedes", color: "#00D2BE", history: 95, form: 93, engineering: 96, leadership: 94, experience: 93, pitcrew: 95 },
  { name: "Ferrari", color: "#DC0000", history: 99, form: 82, engineering: 87, leadership: 85, experience: 98, pitcrew: 90 },
  { name: "McLaren", color: "#FF8700", history: 94, form: 97, engineering: 95, leadership: 93, experience: 95, pitcrew: 95 },
  { name: "Aston Martin", color: "#006C3F", history: 78, form: 75, engineering: 88, leadership: 86, experience: 80, pitcrew: 85 },
  { name: "Alpine", color: "#0090FF", history: 85, form: 71, engineering: 82, leadership: 79, experience: 87, pitcrew: 80 },
  { name: "Williams", color: "#005AFF", history: 96, form: 62, engineering: 78, leadership: 81, experience: 94, pitcrew: 83 },
  { name: "RB (AlphaTauri)", color: "#2B4562", history: 68, form: 65, engineering: 79, leadership: 77, experience: 75, pitcrew: 81 },
  { name: "Kick Sauber", color: "#00E000", history: 82, form: 55, engineering: 76, leadership: 74, experience: 86, pitcrew: 78 },
  { name: "Haas", color: "#B6BABD", history: 65, form: 68, engineering: 74, leadership: 72, experience: 70, pitcrew: 76 }
];

function calculateTeamOVR(team) {
  return Math.round(
    team.history * 0.15 +
    team.form * 0.25 +
    team.engineering * 0.25 +
    team.leadership * 0.15 +
    team.experience * 0.10 +
    team.pitcrew * 0.10
  );
}

let allTeams = teams.map(t => ({ ...t, ovr: calculateTeamOVR(t) }));

function loadTeams() {
  const container = document.getElementById("team-container");

  allTeams.forEach(team => {
    const card = document.createElement("div");
    card.className = "card team-card";

    card.innerHTML = `
      <div class="card-pattern"></div>
      <div class="card-triangle"></div>
      <div class="ovr team-ovr">${team.ovr}</div>
      <div class="team-badge">🏎️</div>
      <div class="card-image" style="background: linear-gradient(135deg, ${team.color}40, ${team.color}20);">
        <div style="font-size: 80px; color: ${team.color}; filter: drop-shadow(0 8px 15px rgba(0,0,0,0.9));">🏎️</div>
      </div>
      <div class="card-content">
        <h2>${team.name}</h2>
        <div class="card-stats">
          <div class="card-stats-col">
            <div class="stat-item"><span class="stat-label">HIS</span><span class="stat-value">${team.history}</span></div>
            <div class="stat-item"><span class="stat-label">FOR</span><span class="stat-value">${team.form}</span></div>
            <div class="stat-item"><span class="stat-label">ENG</span><span class="stat-value">${team.engineering}</span></div>
          </div>
          <div class="card-stats-col">
            <div class="stat-item"><span class="stat-label">LEA</span><span class="stat-value">${team.leadership}</span></div>
            <div class="stat-item"><span class="stat-label">EXP</span><span class="stat-value">${team.experience}</span></div>
            <div class="stat-item"><span class="stat-label">PIT</span><span class="stat-value">${team.pitcrew}</span></div>
          </div>
        </div>
        <p class="team">CONSTRUCTOR</p>
      </div>
    `;
    
    card.addEventListener("click", () => showTeamDetail(team));
    
    container.appendChild(card);
  });
}

function showTeamDetail(team) {
  const detail = document.getElementById("driver-detail");
  const content = document.getElementById("detail-content");
  
  const stats = [
    { label: "History", value: team.history },
    { label: "Form", value: team.form },
    { label: "Engineering", value: team.engineering },
    { label: "Leadership", value: team.leadership },
    { label: "Experience", value: team.experience },
    { label: "Pitcrew", value: team.pitcrew }
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
      <div style="font-size: 100px; margin: 20px 0; color: ${team.color};">🏎️</div>
      <h1 style="color: ${team.color}; margin: 0;">${team.name}</h1>
      <div class="ovr" style="font-size: 60px;">${team.ovr}</div>
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

const drivers = [
  { name: "Max Verstappen", team: "Red Bull", emoji: "🐂", color: "#0600EF", image: "images/max-verstappen.jpg", pace: 97, racecraft: 95, consistency: 95, tyre: 92, wet: 93, mental: 96 },
  { name: "Sergio Perez", team: "Red Bull", emoji: "🇲🇽", color: "#0600EF", image: "images/sergio-perez.jpg", pace: 88, racecraft: 89, consistency: 85, tyre: 90, wet: 87, mental: 84 },
  { name: "Lewis Hamilton", team: "Mercedes", emoji: "🐐", color: "#00D2BE", image: "images/lewis-hamilton.jpg", pace: 92, racecraft: 96, consistency: 93, tyre: 95, wet: 97, mental: 94 },
  { name: "George Russell", team: "Mercedes", emoji: "🇬🇧", color: "#00D2BE", image: "images/george-russell.jpg", pace: 90, racecraft: 88, consistency: 87, tyre: 86, wet: 85, mental: 88 },
  { name: "Charles Leclerc", team: "Ferrari", emoji: "🐴", color: "#DC0000", image: "images/charles-leclerc.jpg", pace: 94, racecraft: 88, consistency: 85, tyre: 84, wet: 82, mental: 87 },
  { name: "Carlos Sainz", team: "Ferrari", emoji: "🇪🇸", color: "#DC0000", image: "images/carlos-sainz.jpg", pace: 89, racecraft: 90, consistency: 88, tyre: 87, wet: 86, mental: 89 },
  { name: "Lando Norris", team: "McLaren", emoji: "🧡", color: "#FF8700", image: "images/lando-norris.jpg", pace: 91, racecraft: 89, consistency: 88, tyre: 86, wet: 85, mental: 90 },
  { name: "Oscar Piastri", team: "McLaren", emoji: "🇦🇺", color: "#FF8700", image: "images/oscar-piastri.jpg", pace: 88, racecraft: 85, consistency: 84, tyre: 83, wet: 88, mental: 86 },
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

    // populate fantasy selects
    const f1 = document.getElementById("fantasy1");
    const f2 = document.getElementById("fantasy2");
    if (f1 && f2) {
      f1.add(new Option(driver.name, driver.name));
      f2.add(new Option(driver.name, driver.name));
    }

    // Special positioning for certain drivers
    let imgStyle = "width: 100%; height: 100%; object-fit: cover;";
    if (driver.name === "Carlos Sainz") {
      imgStyle = "width: 100%; height: 100%; object-fit: cover; object-position: center 15%;";
    }

    const emojiBackup = driver.emoji;
    
    card.innerHTML = `
      <div class="card-pattern"></div>
      <div class="card-triangle"></div>
      <div class="ovr">${driver.ovr}</div>
      <div class="team-badge">${driver.emoji}</div>
      <div class="card-image">
        <img src="${driver.image}" alt="${driver.name}" style="${imgStyle}">
        <div class="emoji-fallback" style="display:none; font-size:120px; padding-bottom:20px;">${driver.emoji}</div>
      </div>
      <div class="card-content">
        <h2>${driver.name}</h2>
        <div class="card-stats">
          <div class="card-stats-col">
            <div class="stat-item"><span class="stat-label">PAC</span><span class="stat-value">${driver.pace}</span></div>
            <div class="stat-item"><span class="stat-label">RAC</span><span class="stat-value">${driver.racecraft}</span></div>
            <div class="stat-item"><span class="stat-label">CON</span><span class="stat-value">${driver.consistency}</span></div>
          </div>
          <div class="card-stats-col">
            <div class="stat-item"><span class="stat-label">TYR</span><span class="stat-value">${driver.tyre}</span></div>
            <div class="stat-item"><span class="stat-label">WET</span><span class="stat-value">${driver.wet}</span></div>
            <div class="stat-item"><span class="stat-label">MEN</span><span class="stat-value">${driver.mental}</span></div>
          </div>
        </div>
        <p class="team">${driver.team}</p>
      </div>
    `;
    
    // Handle image loading error
    const img = card.querySelector('img');
    const fallback = card.querySelector('.emoji-fallback');
    img.onerror = () => {
      img.style.display = 'none';
      fallback.style.display = 'block';
    };
    
    card.addEventListener("click", () => showDriverDetail(driver));
    
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

  document.getElementById("comparison").innerHTML = `
    <div class="compare-images">
      <img id="img1" class="compare-img" src="${d1.image || ''}" alt="${d1.name}" onerror="this.style.display='none'">
      <img id="img2" class="compare-img" src="${d2.image || ''}" alt="${d2.name}" onerror="this.style.display='none'">
    </div>
    <canvas id="radarChart"></canvas>
  `;
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

function buildTeam() {
  const name1 = document.getElementById("fantasy1").value;
  const name2 = document.getElementById("fantasy2").value;
  if (!name1 || !name2) return;
  const d1 = allDrivers.find(d => d.name === name1);
  const d2 = allDrivers.find(d => d.name === name2);
  const total = d1.ovr + d2.ovr;
  document.getElementById("team-result").textContent = `Team rating: ${total}`;
}

loadDrivers();
loadTeams();
