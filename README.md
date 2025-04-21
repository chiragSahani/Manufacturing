# 🏭 AI-Enhanced Hourly Sheet Tracking System

[Live Deployment ➜](https://neuralnomads.vercel.app/)

An intelligent manufacturing dashboard that automates and enhances production tracking using Conversational AI, Downtime Prediction, and Anomaly Detection. This system redefines real-time monitoring and decision-making on the shop floor using AI-powered insights.

---

## 🚀 Features

### 🔹 Conversational AI Assistant
Interact with a smart assistant to get instant answers on:
- Production performance by machine/operator
- Shift-wise output and defect count
- Downtime predictions and efficiency stats

**Example Queries:**
- _“Show today’s total defects by machine X.”_
- _“How many units did Operator Y produce last shift?”_
- _“Predict downtime risk for Machine Z.”_

### 🔹 Downtime Prediction
Predict potential machine breakdowns based on:
- Historical downtime logs
- Machine usage patterns
- Operator activity and shift data

**Sample Output:**  
> _“Machine A has a 78% risk of downtime in the next 2 hours.”_

### 🔹 Anomaly Detection
Detect unusual behavior in production such as:
- Sudden drop in output
- Unexpected spike in defect rate
- Underperforming machines/operators

**AI Techniques Used:**
- Isolation Forests
- Autoencoders

**Sample Output:**  
> _“Machine B’s output dropped by 30% in the last hour. Possible issue detected!”_

---

## 📊 Hourly Sheet - Data Structure

| Field Name                  | Description |
|----------------------------|-------------|
| **Date & Shift Details**   | Date and shift (Morning/Afternoon/Night) |
| **Machine/Workstation ID** | Unique machine/workstation ID |
| **Operator Name**          | Name of the assigned operator |
| **Product Name / Part #**  | Product or part being manufactured |
| **Target Output**          | Planned units per hour |
| **Actual Output**          | Actual units produced per hour |
| **Cumulative Output**      | Total output from shift start to current hour |
| **Defects/Rework Units**   | Defective or reworked units in that hour |
| **Downtime (Minutes)**     | Machine idle time during the hour |
| **Reason for Downtime**    | Downtime cause (if any) |
| **Operator Remarks**       | Optional notes/comments |

---

## 👥 Team & Timeline

- **Team Size:** X  
- **Time Limit:** 120 Minutes  

---

## ⚙️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express
- **AI Models:** Scikit-learn, TensorFlow (Autoencoders), OpenAI (for Chat Assistant)
- **Database:** MongoDB (Production Logs)
- **Deployment:** [Vercel](https://neuralnomads.vercel.app/)
- **AI Libraries:** `transformers`, `sklearn`, `tensorflow`, `pandas`, `nltk`

---

## 🔍 Use Cases

- 📉 Predict machine failures and reduce downtime.
- 🧠 Smart queries on production data using conversational AI.
- 🚨 Early warning for performance anomalies to take proactive measures.

---

## 🧠 AI Models in Action

| Feature | Model | Input | Output |
|--------|-------|-------|--------|
| **Downtime Prediction** | Random Forest / LSTM | Past downtimes, usage patterns | Downtime probability |
| **Anomaly Detection** | Isolation Forest, Autoencoder | Production metrics | Anomaly alert |
| **Conversational Assistant** | GPT-4 (via API) | Natural language query | Insightful response |

---

## 📂 Project Structure

