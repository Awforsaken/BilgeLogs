document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const entry = params.get("entry") || "1"; // Default to entry 1 if not specified
  
    // Fetch character sheets for the specified entry/version
    fetch(`data-entry${entry}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((characterData) => {
        renderCharacterSheets(characterData, entry);
      })
      .catch((error) => {
        console.error("Error fetching character data:", error);
        const container = document.getElementById("character-sheets-container");
        container.innerHTML = `<p style="color: red;">Failed to load character data for entry ${entry}. Please check the URL or try again later.</p>`;
      });
  });
  
  // Function to render character sheets
  function renderCharacterSheets(characterData, entry) {
    const container = document.getElementById("character-sheets-container");
    container.innerHTML = `<h1>Entry #${entry}</h1>`; // Display the current entry
  
    characterData.forEach((character) => {
      const sheet = document.createElement("div");
      sheet.classList.add("character-sheet");
  
      sheet.innerHTML = `
        <div class="character-details cell">
          <label for="name" ">${character.name}</label>
          
        </div>
        <div class="stats">
          <label for="flesh" class="cell">Flesh<br> ${character.flesh}</label>
          <label for="spike" class="cell">Spike<br>${character.spike}</label>
          <label for="crunch" class="cell">Crunch<br>${character.crunch}</label>
        </div>
        <div class=vitals>
          <label for="vigour" class="cell">Vigour<br>${character.vigour}</label>
          <label for="fatigue" class="cell">Fatigue<br>${character.fatigue}</label>
        </div>
        <div class="parasites cell">
          <h3>Parasites Infected</h3>
          ${character.parasites}
        </div>
        <div class="purity cell">
          <h3>Parasitic Purity</h3>
          <div class="purity-bar">
            ${generatePurityBar(character.purity)}
          </div>
        </div>
        <div class="discomfort cell">
          <h3>Leviathan Discomfort</h3>
          ${character.discomfort}
        </div>
      `;
  
      container.appendChild(sheet);
    });
  }
  
  // Function to generate purity bar
  function generatePurityBar(purity) {
    const steps = 10; // Divide into 10 steps
    let barHTML = "";
    for (let i = 1; i <= steps; i++) {
      const active = i <= purity / 10 ? "active" : "";
      barHTML += `<div class="${active}"></div>`;
    }
    return barHTML;
  }
  