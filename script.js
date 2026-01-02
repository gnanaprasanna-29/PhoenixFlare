function showLoginOptions() {
    document.getElementById("roleModal").style.display = "block";
    document.getElementById("modalTitle").innerText = "Login as";

    document.getElementById("businessBtn").innerText = "Business Login";
    document.getElementById("freelancerBtn").innerText = "Freelancer Login";

    document.getElementById("businessBtn").onclick = () => goToLogin("business");
    document.getElementById("freelancerBtn").onclick = () => goToLogin("freelancer");
}

function showRegisterOptions() {
    document.getElementById("roleModal").style.display = "block";
    document.getElementById("modalTitle").innerText = "Register as";

    document.getElementById("businessBtn").innerText = "Business Register";
    document.getElementById("freelancerBtn").innerText = "Freelancer Register";

    document.getElementById("businessBtn").onclick = () => goToRegister("business");
    document.getElementById("freelancerBtn").onclick = () => goToRegister("freelancer");
}

function closeModal() {
    document.getElementById("roleModal").style.display = "none";
}

function goToLogin(role) {
    localStorage.setItem("bizboost_role", role);
    window.location.href = "login.html";
}

function goToRegister(role) {
    localStorage.setItem("bizboost_role", role);
    window.location.href = "register.html";
}