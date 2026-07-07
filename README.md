# 🏥 HealthFlow AI: Operations Copilot
live demo - https://healthflow-ai-rho.vercel.app/

**HealthFlow AI** is a predictive operational sync platform for hospital coordinators. It continuously analyzes appointment behavior, identifies high-risk patients, and automatically recommends waitlist optimizations before revenue is lost.

---

## 🚀 The Problem & Solution

**The Problem:** Hospitals lose millions of dollars annually to no-shows, and front-desk staff waste countless hours manually calling down static waitlists to fill sudden gaps.
**The Solution:** We don't just log appointments; we predict behavior. Using the Gemini AI engine, HealthFlow profiles upcoming appointments for cancellation risk based on travel distance, past history, and confirmation status. When a high risk is detected, it intelligently matches the slot with the highest-priority waitlist candidate.

## ✨ Key Features

* **Live AI Scanning:** Gemini continually monitors the daily schedule, flagging appointments with a high probability of being a no-show.
* **Closed-Loop Waitlist Swap:** A 1-click approval system that safely removes the high-risk patient from the premium slot, secures the new waitlist patient, and automatically drops the high-risk patient into a rescheduling queue.
* **Intelligent Queueing:** Waitlist candidates are prioritized based on clinical urgency, geographic proximity, and department affinity.
* **Revenue Protection:** Real-time dashboard KPI tracking for "Revenue at Risk" vs. "Revenue Saved".

## 🛠️ Tech Stack

**Frontend (Client)**
* Framework: Next.js 15 (App Router)
* Styling: Tailwind CSS & Shadcn UI (Custom bypass for isolated components)
* State Management: React Hooks
* Deployment: Vercel

**Backend (API & AI)**
* Framework: FastAPI (Python)
* AI Engine: Google Gemini 
* Deployment: Render

---

## 💻 Running Locally

To run this project on your local machine:

### 1. Clone the repository
```Bash
git clone [https://github.com/YOUR_USERNAME/healthflow-ai.git](https://github.com/YOUR_USERNAME/healthflow-ai.git)
cd healthflow-ai
```
2. Start the FastAPI Backend
```Bash
cd healthflow-backend
pip install -r requirements.txt
# Create a .env file and add your GEMINI_API_KEY
uvicorn main:app --reload
```
3. Start the Next.js Frontend
Open a new terminal tab:
```Bash
cd healthflow-frontend
npm install
# Create a .env.local file and add NEXT_PUBLIC_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
npm run dev
```

