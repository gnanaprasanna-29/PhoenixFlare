const role = localStorage.getItem("bizboost_role");
const title = document.getElementById("loginTitle");

if (role) {
    title.innerText = role === "business" ? "Business Login" : "Freelancer Login";
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("bizboost_users")) || [];

    const validUser = users.find(
        u => u.email === email && u.password === password && u.role === role
    );

    if (!validUser) {
        alert("Account not found. Please register first.");
        return;
    }

    localStorage.setItem("bizboost_user", role);

    if (role === "business") {
        window.location.href = "business-dashboard.html";
    } else {
        window.location.href = "freelancer-dashboard.html";
    }
});

function goToRegister() {
    window.location.href = "register.html";
}

function goBack() {
    localStorage.removeItem("bizboost_role");
    window.location.href = "index.html";
}