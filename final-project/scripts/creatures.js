const creatureContainer = document.querySelector("#creature-list");

async function loadCreatures() {
    try {
        const response = await fetch("data/creatures.json");

        if (!response.ok) {
            throw new Error(`HTTP error! status: $response.status`);
        }

        const data = await response.json();
        const creatures = data.creatures;

        creatureContainer.innerHTML = "";

        creatures.forEach(creature => {
            const card = document.createElement("article");
            card.classList.add("creature-card");

            card.innerHTML = `
                <img src="${creature.image}" alt="${creature.name}" loading="lazy">
                <h3>${creature.name}</h3>
                <p><strong>Species:</strong> ${creature.species}</p>
                <p><strong>Size:</strong> ${creature.size}</p>
                <p><strong>Habitat:</strong> ${creature.habitat}</p>
                <p><strong>Diet:</strong> ${creature.diet}</p>
                <p><strong>Danger Level:</strong> ${creature.dangerLevel}</p>
                <p class="description">${creature.description}</p>
            `;

            creatureContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading creatures:", error);
        creatureContainer.innerHTML = `<p class="error">Failed to load creatures. Please try again later.</p>`;
    }
}

loadCreatures();