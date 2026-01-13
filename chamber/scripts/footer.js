// current year
const yearSpan = document.querySelector("#current-year");
yearSpan.textContent = new Date().getFullYear();

// last modified date
const lastModifiedSpan = document.querySelector("#last-modified");
lastModifiedSpan.textContent = document.lastModified;