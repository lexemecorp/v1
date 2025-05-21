function openContactForm() {
    const popup = document.getElementById("contact-popup");
    popup.classList.remove("hidden");
    popup.classList.add("show");
}

function closeContactForm() {
    const popup = document.getElementById("contact-popup");
    popup.classList.remove("show");
    setTimeout(() => {
        popup.classList.add("hidden");
    }, 1000); // Wait for the fade-out animation to complete
}

// Close the form when clicking outside the form content
document.getElementById("contact-popup").addEventListener("click", function (e) {
    if (e.target === this) {
        closeContactForm();
    }
});

// Handle form submission
document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const messageElement = document.getElementById("form-message");

    // Use Web3Forms' fetch API to submit the form
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                messageElement.textContent = "Message sent successfully!";
                messageElement.style.color = "green";
                form.reset();
            } else {
                messageElement.textContent = "Failed to send message. Please try again later.";
                messageElement.style.color = "red";
            }
        })
        .catch(() => {
            messageElement.textContent = "Failed to send message. Please try again later.";
            messageElement.style.color = "red";
        });
});