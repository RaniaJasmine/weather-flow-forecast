from flask import Flask, request, jsonify
from flask_cors import CORS
from forecast_model import run_forecast

app = Flask(__name__)
CORS(app)  # allow frontend to call this API

@app.route("/forecast", methods=["POST"])
def forecast():
    data = request.get_json()
    city = data.get("city", "New York")
    periods = data.get("periods", 30)
    try:
        result = run_forecast(city, periods)
        return jsonify({"status": "ok", "forecast": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "alive"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
