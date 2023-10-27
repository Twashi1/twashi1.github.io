function hamburgerToggle(event) {
    let navbarLinks = document.getElementById("navbarLinksDiv");

    navbarLinks.style.display = navbarLinks.style.display === "block" ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
    let hamburgerIcon = document.getElementById("hamburgerToggleLink");

    hamburgerIcon.addEventListener("click", hamburgerToggle);
});