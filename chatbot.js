const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");

function addMessage(sender, text) {
    const msg = document.createElement("div");
    msg.style.marginBottom = "10px";
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const message = input.value.trim().toLowerCase();
    if (!message) return;

    addMessage("You", message);
    input.value = "";

    let reply = "I’m here to help! Try asking about jobs or hiring.";

    if (message.includes("job")) {
        reply = "You can post or apply for jobs directly from your dashboard.";
    } 
    else if (message.includes("hire")) {
        reply = "Businesses can post jobs and review applications easily.";
    }
    else if (message.includes("apply")) {
        reply = "Freelancers can apply to available jobs from the freelancer dashboard.";
    }
    else if (message.includes("contact")) {
        reply = "You can communicate after applying to a job.";
    }
    else if (message.includes("hello") || message.includes("hi")) {
        reply = "Hello 👋 How can I assist you today?";
    }

    setTimeout(() => addMessage("Bot", reply), 500);
}

function goBack() {
    const from = localStorage.getItem("chatbot_from");

    if (from === "business") {
        window.location.href = "business-dashboard.html";
    } else if (from === "freelancer") {
        window.location.href = "freelancer-dashboard.html";
    } else {
        window.history.back();
    }
}