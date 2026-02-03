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

        factionContainer.innerHTML = "";

        factions.forEach(faction => {
            const card = document.createElement("article");
            card.classList.add("faction-card");

            card.innerHTML = `
                <img src="${faction.image}" alt="${faction.name}" loading="lazy">
                <h3>${faction.name}</h3>
                <p><strong>Alignment:</strong> ${faction.alignment}</p>
                <p><strong>Territory:</strong> ${faction.territory}</p>
                <p><strong>Leader:</strong> ${faction.leader}</p>
            `;

            card.addEventListener("click", () => openFactionModal(faction));

            factionContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading factions:", error);
        factionContainer.innerHTML = `<p class="error">Failed to load factions. Please try again later.</p>`;
    }
}

function openFactionModal(faction) {
    modalContent.innerHTML = `
         <h2>${faction.name}</h2>
        <img src="${faction.image}" alt="${faction.name}">
        <p><strong>Alignment:</strong> ${faction.alignment}</p>
        <p><strong>Territory:</strong> ${faction.territory}</p>
        <p><strong>Leader:</strong> ${faction.leader}</p>
        <p><strong>Symbol:</strong> ${faction.symbol}</p>
        <p><strong>Colors:</strong> ${faction.colors.join(", ")}</p>
        <p class="description">${faction.description}</p>
    `;

    modal.showModal();
}

closeModal.addEventListener("click", () => modal.closest());

loadFactions();