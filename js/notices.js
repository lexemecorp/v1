function openNotices() {
    const popup = document.getElementById("notices-popup");
    popup.classList.remove("hidden");
    popup.classList.add("show");
}

function closeNotices() {
    const popup = document.getElementById("notices-popup");
    popup.classList.remove("show");
    setTimeout(() => {
        popup.classList.add("hidden");
    }, 1000); // Wait for the fade-out animation to complete
}

// Close the form when clicking outside the form content
document.getElementById("notices-popup").addEventListener("click", function (e) {
    if (e.target === this) {
        closeNotices();
    }
});