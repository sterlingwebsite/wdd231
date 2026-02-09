const factionContainer = document.querySelector("#faction-container");
const modal = document.querySelector("#factionModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelectorAll(".closeModal");

async function loadFactions() {
    try {
        const response = await fetch("data/factions.json");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const factions = data.factions;

        const creatureResponse = await fetch("data/creatures.json");
        if (!response.ok) {
            throw new Error("Failed to load creatures.json");
        }

        const creatureData = await creatureResponse.json();
        const creatures = creatureData.creatures;

        const creaturesById = {};
        creatures.forEach(c => {
            creaturesById[c.id] = c;
        });

        factionContainer.innerHTML = "";

        factions.forEach(faction => {
            const card = document.createElement("article");
            card.classList.add("card", "card-clickable");

            card.innerHTML = `
                <img src="${faction.image}" alt="${faction.name}" loading="lazy">
                <h3>${faction.name}</h3>
                <p class="description">${faction.description}</p>
            `;

            card.addEventListener("click", () => openFactionModal(faction, creaturesById));

            factionContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading factions:", error);
        factionContainer.innerHTML = `<p class="error">Failed to load factions. Please try again later.</p>`;
    }
}

function openFactionModal(faction, creaturesById) {
    const dominant = creaturesById[faction.dominantSpeciesId];
    const loreHTML = faction.lore
        .map(paragraph => `<p class="lore-paragraph">${paragraph}</p>`)
        .join("");

    modalContent.innerHTML = `
        <img src="${faction.image}" alt="${faction.name}" loading="lazy" class="faction-image">

        <h2 class="faction-name">${faction.name}</h2>

        <p class="faction-symbol"><strong>Symbol:</strong> ${faction.symbol}</p>

        <p class="faction-colors"><strong>Colors:</strong> ${faction.colors.join(", ")}</p>

        <p class="faction-territory"><strong>Territory:</strong> ${faction.territory}</p>

        <div class="faction-lore">${loreHTML}</div>

        <p class="faction-leader"><strong>Leader:</strong> ${faction.leader}</p>

        <p class="faction-alignment"><strong>Alignment:</strong> ${faction.alignment}</p>

        <h3 class="dominant-species">Dominant Species</h3>

        <p class="species"><strong>${dominant.name}</strong> — ${dominant.species}</p>
        
        <img src="${dominant.image}" alt="${dominant.name}" loading="lazy" class="species-image">
    `;

    modal.showModal();
    modal.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

closeModal.forEach(btn => {
    btn.addEventListener("click", () => modal.close());
});

loadFactions();