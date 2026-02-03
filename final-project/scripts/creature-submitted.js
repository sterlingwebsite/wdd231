document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("name").textContent = params.get("creatureName");
    document.getElementById("species").textContent = params.get("species");
    document.getElementById("habitat").textContent = params.get("habitat");
    document.getElementById("danger").textContent = params.get("danger");
});