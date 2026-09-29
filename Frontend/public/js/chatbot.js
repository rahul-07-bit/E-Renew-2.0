const toggleBtn = document.getElementById("chatbot-toggle");
const chatBox = document.getElementById("chatbot-box");
const sendBtn = document.getElementById("chatbot-send");
const inputField = document.getElementById("chatbot-input");
const messagesDiv = document.getElementById("chatbot-messages");

// Toggle open/close
toggleBtn.addEventListener("click", () => {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
});

// Simple FAQ responses
const responses = {
  "hi": "Hello! 👋 How can I help you with E-Renew today?",
  "what is e-renew": "E-Renew is a project for recycling semiconductors responsibly and rewarding users for eco-friendly disposal.",
  "how to recycle": "You can recycle by submitting your old semiconductors to your nearest power plant through our delivery system.",
  "rewards": "You earn rewards based on the amount and quality of recyclable semiconductor waste you provide!",
  "contact": "You can reach our team through the Contact section of the website.",
  "what is semiconductor": "A semiconductor is a type of material that has electrical conductivity between that of a conductor (like copper) and an insulator (like rubber)",
  "how delivery agent work" : "The delivery agent acts as the link between-The user (who has semiconductor waste), and the nearest power plant or recycling center (where it’s processed).Their job is to collect, transport, and update the recycling status in the E-Renew system.",
  "how does your system find the nearest power plant":"Using a geolocation API (like Google Maps API) to calculate the shortest distance between the user and registered plants.",
  "default": "I'm sorry, I didn't understand that. Please try asking about 'recycle', 'rewards', or 'contact'."
};

// Send message
sendBtn.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const userMsg = inputField.value.trim().toLowerCase();
  if (!userMsg) return;

  addMessage(userMsg, "user-msg");
  inputField.value = "";

  setTimeout(() => {
    const botResponse = responses[userMsg] || responses["default"];
    addMessage(botResponse, "bot-msg");
  }, 500);
}

function addMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.className = className;
  msgDiv.textContent = text;
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
} 