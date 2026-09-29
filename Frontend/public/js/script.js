// Pop up Section

const messages = [
    "Electronic waste, or e-waste, refers to discarded electronic devices and equipment, including smartphones, laptops, tablets, televisions, and more. The generation of e-waste has been steadily increasing due to the rapid pace of technological advancement and consumer electronics turnover.",

    "E-waste contains hazardous materials such as lead, mercury, cadmium, and various toxic chemicals. If not properly managed, these substances can leach into the environment, contaminating soil, water, and air. This poses significant risks to human health and the ecosystem.",

    "Recycling e-waste helps recover valuable resources like precious metals (gold, silver, and palladium), copper, and rare earth elements. This reduces the need for mining and extraction of these materials, which can be both environmentally destructive and resource-intensive.",

    "E-waste has become a global issue, with millions of tons generated each year. Many developed countries export their e-waste to developing nations, where it is often processed informally under unsafe conditions, leading to environmental and health concerns.",

    "Formal e-waste recycling involves regulated processes in specialized facilities that ensure safe handling and disposal of hazardous materials. Informal recycling, often practiced in developing countries, involves unregulated, makeshift operations that can be harmful to both workers and the environment."
  ];

const popup = document.getElementById('popup');
const popupc = document.getElementById('popupc');
const close = document.getElementById('close');

// let currentMessageIndex = 0;

//   function showPopup() {
//     const message = messages[currentMessageIndex % messages.length];
//     popupc.textContent = message;

//     popup.style.display = 'inline-flex';
//     currentMessageIndex++
//   };

function hidePopup() {
    popup.style.display = 'none';
    setTimeout(showPopup, 5000);
};

setTimeout(showPopup, 3000);

;

// Pop up Section

// About Section Counter
document.addEventListener("DOMContentLoaded", function () {
  let valueDisplays = document.querySelectorAll(".num");
  let interval = 1000;
  valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val"));
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(function () {
          startValue += 1;
          valueDisplay.textContent = startValue;
          if (startValue == endValue) {
          clearInterval(counter);
      }
      }, duration);
  });
  });
// About Section Counter

const register_form = document.getElementById('Register');
const login_form = document.getElementById('login');
const signup_form = document.getElementById('signup');
const login_btn = document.getElementById('login-btn');
const logout_btn = document.getElementById('logout-btn');
const register_btn = document.getElementById('register-btn');

function register(){
  register_form.style.display = 'block';
  login_form.style.display = 'none';
  signup_form.style.display = 'none';
  login_btn.style.display = 'block';
  register_btn.style.display = 'none';
}

function login(){
  register_form.style.display = 'none';
  login_form.style.display = 'block';
  signup_form.style.display = 'none';
  login_btn.style.display = 'none';
  register_btn.style.display = 'block';
}

function signup(){
  register_form.style.display = 'none';
  login_form.style.display = 'none';
  signup_form.style.display = 'block';
}


function Logout() {
  localStorage.removeItem('token')
  window.location.replace('./login.html')
}



function toggleChat() {
  var chatWindow = document.getElementById("chatWindow");
  if (chatWindow.style.display === "block") {
      chatWindow.style.display = "none";
  } else {
      chatWindow.style.display = "block";
  }
}

async function sendMessage() {
  console.log("yess");
  const userInput = document.getElementById("userInput").value;
  if (!userInput) return;

  // Display user's message in the chat window
  const chatBody = document.getElementById("chatBody");
  const userMessage = document.createElement("p");
  userMessage.textContent = "You: " + userInput;
  chatBody.appendChild(userMessage);

  // Clear the input field
  document.getElementById("userInput").value = '';
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent?key=AIzaSyBdvrNz7o_ZQb9vVJD5nrAJ58p4apHXJ58";
    console.log(userMessage)

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: `{\"contents\":[{\"parts\":[{\"text\":\" if questions aked about team member then reply professional answer. if any questions asked about our website then give compliments and all the activites performed by it. if user want to recycle to any insturment tell then that this website has a page in which you can sell your product for recycling and also provide link of that page and you also get some many acording to product. answer in one maximum five line try to answer in as short as possible you are an chatbot helper for an e waste focused on recycling website if relevant question is asked reply accordingly else ask to ask a relevent questions reply in english the user says ${userInput}\"}]}]}`
        });
      console.log("waiting");
      console.log(response);
      data = await response.json();
      console.log(data.candidates[0].content.parts[0].text);
      data = data.candidates[0].content.parts[0].text
      if (data) {
          // Display chatbot's response in the chat window
          const botMessage = document.createElement("p");
          botMessage.textContent =data;
          botMessage.innerHTML = `Bot: ${marked.parse(data)}`;
          chatBody.appendChild(botMessage);
          speak(data);
      } else if (data.error) {
          console.error(data.error);
      }

      // Auto-scroll to the bottom of the chat
      chatBody.scrollTop = chatBody.scrollHeight;
  } catch (error) {
      console.error('Error sending message:', error);
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en';
recognition.interimResults = false;

// Function to start speech recognition
function startRecognition() {
  recognition.start();
  console.log("Voice recognition started. Speak into the microphone...");
}

// Handle recognition result (user's voice converted to text)
recognition.onresult = function(event) {
  const voiceInput = event.results[0][0].transcript;
  document.getElementById('userInput').value = voiceInput;  // Fill the input field with recognized text
  sendMessage(); // Trigger the chatbot's response based on the recognized text
};

// Error handling
recognition.onerror = function(event) {
  console.error("Speech recognition error: ", event.error);
};


function speak(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text; // The text to speak
  speech.lang = 'en'; // Set language
  speech.rate = 1; // Speed of speech
  window.speechSynthesis.speak(speech);
}
