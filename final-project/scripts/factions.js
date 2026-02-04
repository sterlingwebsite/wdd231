const factionContainer = document.querySelector("#faction-container");
const modal = document.querySelector("#factionModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");

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
            card.classList.add("faction-card");

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
        <img src="${faction.image}" alt="${faction.name}">

        <h2>${faction.name}</h2>
        <p><strong>Symbol:</strong> ${faction.symbol}</p>
        <p><strong>Colors:</strong> ${faction.colors.join(", ")}</p>
        <p><strong>Territory:</strong> ${faction.territory}</p>
        ${loreHTML}

        <p><strong>Leader:</strong> ${faction.leader}</p>
        <p><strong>Alignment:</strong> ${faction.alignment}</p>

        <h3>Dominant Species</h3>
        <p><strong>${dominant.name}</strong> — ${dominant.species}</p>
        <img src="${dominant.image}" alt="${dominant.name}">
    `;

    modal.showModal();
}

closeModal.addEventListener("click", () => modal.close());

loadFactions();