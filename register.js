const role = localStorage.getItem("bizboost_role");
const title = document.getElementById("registerTitle");

if (role) {
    title.innerText = role === "business" ? "Business Register" : "Freelancer Register";
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    const users = JSON.parse(localStorage.getItem("bizboost_users")) || [];

    const userExists = users.find(u => u.email === email && u.role === role);
    if (userExists) {
        alert("Account already exists. Please login.");
        window.location.href = "login.html";
        return;
    }

    users.push({
        name,
        email,
        password,
        role
    });

    localStorage.setItem("bizboost_users", JSON.stringify(users));

    alert("Registration successful. Please login.");
    window.location.href = "login.html";
});

function goToLogin() {
    window.location.href = "login.html";
}

function goBack() {
    localStorage.removeItem("bizboost_role");
    window.location.href = "index.html";
}