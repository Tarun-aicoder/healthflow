import os
import copy
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
client = genai.Client()

app = FastAPI(title="HealthFlow AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIRecommendation(BaseModel):
    risk_explanation: str
    recommended_action: str
    revenue_impact: int
    new_patient_name: str

# --- INITIAL STATE (For the Reset Button) ---
INITIAL_METRICS = { "total_appointments": 142, "predicted_no_shows": 12, "revenue_at_risk": 3200, "waitlist_size": 2 }
INITIAL_WAITLIST = [
    {"id": "wl-1", "patient_name": "Priya Singh", "urgency": "High", "distance_miles": 2.5, "department": "Cardiology"},
    {"id": "wl-2", "patient_name": "Amit Patel", "urgency": "Medium", "distance_miles": 6.0, "department": "Radiology"}
]
INITIAL_APPOINTMENTS = [
    {
        "id": "apt-1",
        "patient_name": "Rahul Sharma",
        "appointment_time": "10:00 AM",
        "department": "Cardiology",
        "confirmed": False,
        "distance_miles": 25,
        "missed_past_appointments": 3,
        "status": "pending",
        "recommendation": None
    },
    {
        "id": "apt-2",
        "patient_name": "Ananya Iyer",
        "appointment_time": "11:30 AM",
        "department": "Radiology",
        "confirmed": True,
        "distance_miles": 4,
        "missed_past_appointments": 0,
        "status": "pending",
        "recommendation": None
    }
]

# --- LIVE STATE ---
dashboard_metrics = copy.deepcopy(INITIAL_METRICS)
waitlist_db = copy.deepcopy(INITIAL_WAITLIST)
appointments_db = copy.deepcopy(INITIAL_APPOINTMENTS)
recent_actions = [] # New: Tracks the activity feed

def generate_insight_for_patient(patient):
    waitlist_context = ", ".join([f"{w['patient_name']} ({w['urgency']} priority)" for w in waitlist_db])
    prompt = f"""
    You are an expert hospital operations AI. Analyze this patient appointment:
    Name: {patient['patient_name']}
    Department: {patient['department']}
    Past missed appointments: {patient['missed_past_appointments']}
    Distance to hospital: {patient['distance_miles']} miles
    Confirmed via SMS: {patient['confirmed']}
    
    Available Waitlist Candidates: {waitlist_context}
    
    Calculate the risk of a no-show. If high, recommend a replacement from the waitlist and estimate a revenue recovery between $500 and $3500. Keep the action concise.
    """
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=AIRecommendation,
            temperature=0.2
        ),
    )
    return json.loads(response.text)

@app.get("/dashboard")
def get_dashboard():
    return {
        **dashboard_metrics,
        "insights": [
            { "id": "ins-1", "title": "Live AI Scanning Active", "description": "Gemini 2.5 is currently monitoring the schedule.", "type": "opportunity" }
        ],
        "utilization": [
            { "department": "Cardiology", "current": 85, "capacity": 100 },
            { "department": "Radiology", "current": 95, "capacity": 100 }
        ],
        "recent_actions": recent_actions # Push the log to the frontend
    }

@app.get("/appointments")
def get_appointments():
    for apt in appointments_db:
        if apt["status"] == "pending" and apt["missed_past_appointments"] > 0 and not apt["recommendation"]:
            try:
                print(f"🧠 Asking Gemini to analyze {apt['patient_name']}...")
                apt["recommendation"] = generate_insight_for_patient(apt)
            except Exception as e:
                print(f"AI Error: {e}")
    return [apt for apt in appointments_db if apt["status"] == "pending"]

@app.get("/waitlist")
def get_waitlist():
    return waitlist_db

@app.post("/approve/{appointment_id}")
def approve_recommendation(appointment_id: str):
    global dashboard_metrics, waitlist_db, recent_actions
    for apt in appointments_db:
        if apt["id"] == appointment_id and apt["status"] == "pending":
            if apt["recommendation"]:
                rev_impact = apt["recommendation"]["revenue_impact"]
                target_replacement = apt["recommendation"]["new_patient_name"]
                
                dashboard_metrics["predicted_no_shows"] = max(0, dashboard_metrics["predicted_no_shows"] - 1)
                dashboard_metrics["revenue_at_risk"] = max(0, dashboard_metrics["revenue_at_risk"] - rev_impact)
                
                waitlist_db = [w for w in waitlist_db if w["patient_name"] != target_replacement]
                dashboard_metrics["waitlist_size"] = len(waitlist_db)
                
                # Log the action!
                recent_actions.insert(0, {
                    "id": len(recent_actions) + 1,
                    "action": f"Reallocated {apt['patient_name']}'s slot to {target_replacement}",
                    "revenue": rev_impact
                })
                
            apt["status"] = "approved"
            return {"success": True}
    raise HTTPException(status_code=404, detail="Not found")

@app.post("/reset")
def reset_demo():
    """Hidden endpoint to reset the demo state instantly."""
    global dashboard_metrics, waitlist_db, appointments_db, recent_actions
    dashboard_metrics = copy.deepcopy(INITIAL_METRICS)
    waitlist_db = copy.deepcopy(INITIAL_WAITLIST)
    appointments_db = copy.deepcopy(INITIAL_APPOINTMENTS)
    recent_actions = []
    return {"success": True}