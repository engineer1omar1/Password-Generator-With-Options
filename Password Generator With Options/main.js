const lengthInput = document.getElementById("length");
const generateBtn = document.getElementById("generate");
const passwordDiv = document.getElementById("password");
const savedPasswords = document.querySelector(".saved-passwords");
const deleteAll = document.querySelector(".delete-all");
// const deleteElement = document.querySelector(".delete");

lengthInput.addEventListener("input", () => {

    let value = lengthInput.value;

    value = value.replace(/\D/ig, "");

    if (value !== "") {
        value = Math.max(1, Math.min(32, parseInt(value)));
    }

    lengthInput.value = value
})

lengthInput.addEventListener("blur", () => {
    if (lengthInput.value === "") lengthInput.value = 10;
})

function generatePassword(length, includeNumbers, includeSpeicals) {
    let small = "abcdefghijklmnopqrstuvwxyz";
    let capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let special = "!@#$%^&*()-_=+[]{}|;:',.<>?/~`\\\"";
    
    let characersPoll = small + capital;
    if (includeNumbers) characersPoll += numbers;
    if (includeSpeicals) characersPoll += special;

    let password = "";

    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characersPoll.length);

        password += characersPoll[randomIndex];
    }
    
    return password
    
}

generateBtn.addEventListener("click", function () {
    let length = lengthInput.value;
    const includeNumbers = document.getElementById("include-numbers").checked;
    const includeSpecial = document.getElementById("include-special").checked;

    let password = generatePassword(length, includeNumbers, includeSpecial);

    passwordDiv.textContent = password;

    savePassword(password);
    displayPassword()
})

function savePassword(password) {

    let savePassToLocal = JSON.parse(localStorage.getItem("passwords")) || [];

    savePassToLocal.unshift(password);

    if (savePassToLocal.length > 10) savePassToLocal.pop();

    localStorage.setItem("passwords", JSON.stringify(savePassToLocal));

    console.log(savePassToLocal)
}

function displayPassword() {
    let savePassToLocal = JSON.parse(localStorage.getItem("passwords")) || [];
    const listPass = savePassToLocal.map((p, i) => `
        <div>
        <div><span>${i + 1}</span>${escapeHTML(p)}</div>
        <div class="delete" onclick="deleteElement(${i})">Delete</div>
        </div>
        `).join("");
    savedPasswords.innerHTML = listPass || "Password Will Show Here";
    if (savePassToLocal.length > 0) {
        deleteAll.style.display = "block"
        savedPasswords.style.padding = "10px"
    } else {
        deleteAll.style.display = "none"
        savedPasswords.style.padding = "15px"
    }
    
}
displayPassword()
document.addEventListener("DOMContentLoaded", displayPassword)

// Escape HTML 
function escapeHTML(str) {
    return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

deleteAll.addEventListener("click", () => {
    localStorage.setItem("passwords", JSON.stringify([]))
    savedPasswords.innerHTML = "";
    savedPasswords.innerHTML = "Password Will Show Here";
    passwordDiv.innerHTML = "Password Will Apper Here"
    displayPassword()
})
function deleteElement(i) {
    

    let savePassToLocal = JSON.parse(localStorage.getItem("passwords")) || [];

    savePassToLocal.splice(i, 1);
    
        localStorage.setItem("passwords", JSON.stringify(savePassToLocal));
        displayPassword()
}