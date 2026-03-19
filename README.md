# Heart Rate Detector

A web-based heart rate and HRV (Heart Rate Variability) monitor that uses your device's camera to detect pulse via **Photoplethysmography (PPG)**. Built with Next.js (frontend) and Flask (backend), deployable on both PCs and smartphones.

Developed as part of BIOF3003 – Digital Health Technologies, HKU.

---

## How it works

The app accesses your camera and samples the average pixel colour from a small region at the centre of the frame. When a fingertip is placed over the camera lens, blood flow causes subtle changes in the red channel intensity with each heartbeat — this is the PPG signal. The app processes this signal to estimate heart rate (BPM) and HRV (SDNN).

---

## Features

- Live camera PPG signal capture and real-time chart
- Heart rate (BPM) and HRV (SDNN) with confidence scores
- Five signal combination modes: Default (2R−G−B), Red Only, Green Only, Blue Only, Green Dominant (2G−R−B)
- Save heart rate records to the backend
- Collect and label PPG segments (good/bad) for ML training
- Download labeled records as JSON
- Upload trained ML model and scaler for live signal quality inference

---

## Project structure

```
.
├── app/                    # Next.js frontend
│   ├── api/                # Next.js API routes (proxy to Flask)
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/ppg.ts          # PPG signal processing logic
│   └── page.tsx            # Main page
├── backend/                # Flask backend
│   ├── app.py              # Flask app and API endpoints
│   ├── ppg_features.py     # PPG feature extraction for ML
│   ├── train_quality_model.py  # Script to train quality classifier
│   └── requirements.txt
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- Python 3.9+
- A device with a camera

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/MentallyDeficientPotato/heart-rate-detector-official.git
cd heart-rate-detector-official
```

### 2. Start the Flask backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend runs on `http://127.0.0.1:5000` by default.

### 3. Start the Next.js frontend

Open a new terminal tab:

```bash
cd heart-rate-detector-official   # back to project root
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Using the app

1. Click **Start recording** — your browser will ask for camera permission
2. Place your **fingertip firmly over the camera lens**
3. Hold still for ~10 seconds while the PPG signal stabilises
4. Heart rate and HRV readings will appear once enough samples are collected
5. Use the **Signal combination** dropdown to switch between channel modes
6. Click **Save record** to store a reading to the backend

### Collecting labeled data for ML

1. Start recording and wait for a stable signal
2. Select **Good** or **Bad** label
3. Click **Send labeled segment** to save the segment
4. Once enough segments are collected, run the training script:

```bash
cd backend
python train_quality_model.py
```

5. Upload the generated `quality_model.joblib` and `quality_scaler.joblib` via the **Upload ML model & scaler** section in the app

---

## Signal combination modes

| Mode | Formula | Notes |
|------|---------|-------|
| Default | 2R − G − B | Best for fingertip camera PPG |
| Red Only | R | Strongest raw signal at fingertip |
| Green Only | G | Used in wrist-based PPG (e.g. smartwatches) |
| Blue Only | B | Weakest signal, useful for comparison |
| Green Dominant | 2G − R − B | Suppresses red/blue ambient noise |

---

## Acknowledgements

Scaffold provided by Dr. Chun Hang Eden Ti and the BIOF3003 teaching team, HKU LKS Faculty of Medicine.

