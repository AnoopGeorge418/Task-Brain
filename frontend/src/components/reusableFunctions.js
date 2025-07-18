 // === showAlert utility function ===
export function showAlert(message, type = "error") {
    const alertBox = document.getElementsByClassName("alertMsg")[0];
    alertBox.textContent = message;
    alertBox.style.display = "block";
    alertBox.style.color = type === "error" ? "red" : "darkgreen";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000); // number not string
}

// Dummy credentials loading
export function getDummyCreds() {
    return JSON.parse(localStorage.getItem("dummyCreds")) || [];
}

// Dummy credentials saving
export function saveDummyCreds(usersArray) {
    localStorage.setItem("dummyCreds", JSON.stringify(usersArray));
}


