// Description: JavaScript file for the main body of the website.
document.addEventListener("DOMContentLoaded", () => {
    // Year increment animation
    const yearElement = document.createElement("span");
    yearElement.id = "year";
    yearElement.textContent = "2000";
    const mainBodyText = document.querySelector(".mainbody p");
    mainBodyText.innerHTML = mainBodyText.innerHTML.replace("2025", yearElement.outerHTML);

    let year = 2000;
    const yearInterval = setInterval(() => {
        if (year < 2025) {
            year++;
            document.getElementById("year").textContent = year;
        } else {
            clearInterval(yearInterval);
        }
    }, 25);

    // Typewriter effect
    const professions = [
        "mathematicians",
        "engineers", 
        "computer scientists", 
        "data analysts", 
        "AI researchers"];
    const typewriterElement = document.querySelector(".typewriter");

    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delayBeforeDeleting = false;

    function typeEffect() {
        const currentProfession = professions[professionIndex];
        const displayText = currentProfession.substring(0, charIndex);

        typewriterElement.textContent = displayText;

        if (!isDeleting && charIndex < currentProfession.length) {
            charIndex++;
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
        } else if (!isDeleting && charIndex === currentProfession.length && !delayBeforeDeleting) {
            delayBeforeDeleting = true;
            setTimeout(() => {
                isDeleting = true;
                delayBeforeDeleting = false;
            }, 4000); // 2-second delay before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
});