import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve
import google.generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini API
gem_api = os.getenv("gem_api")
if not gem_api:
    raise ValueError("❌ Missing environment variable: gem_api. Please add it to your .env file.")

genai.configure(api_key=gem_api)

# Initialize model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=(
        "You are a chatbot helper for an e-waste recycling website. "
        "If the question is relevant, reply accordingly. "
        "Otherwise, ask the user to ask a relevant question. "
        "Always reply in English."
    ),
)

@app.route("/")
def home():
    return "✅ E-Waste Chatbot API is running!"

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json(force=True)
        user_message = data.get("message")
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        print(f"User: {user_message}")

        # Generate response
        response = model.generate_content(user_message)
        reply = response.candidates[0].content.parts[0].text.strip()

        print(f"Bot: {reply}")
        return jsonify({"message": reply})

    except Exception as e:
        print("❌ Error generating response:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("🚀 Server running at: http://localhost:8080")
    serve(app, host="0.0.0.0", port=8080)
