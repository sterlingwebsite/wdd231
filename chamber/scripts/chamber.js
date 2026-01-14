// menu button
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

// Toggle the show class off and on
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

// current year
const yearSpan = document.querySelector("#current-year");
yearSpan.textContent = new Date().getFullYear();

// last modified date
const lastModifiedSpan = document.querySelector("#last-modified");
lastModifiedSpan.textContent = document.lastModified;