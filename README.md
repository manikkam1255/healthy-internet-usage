# ZenFlow — Healthy Internet Usage Tracker

ZenFlow is an intentional, calm digital wellbeing and internet usage tracker. It pairs real-time network and screentime awareness with behavioural psychology nudges (10-second mindful intercept before opening addictive apps, dopamine loop breaker, scheduled grayscale & evening focus locks, and personalized AI coaching).

---

## 🚀 Quick Start Guide (Running Locally)

### 1. Prerequisites
- **Node.js** v18+ or v20+ installed on your computer ([Download Node.js](https://nodejs.org/))
- **npm** (comes with Node.js) or **pnpm** / **yarn** / **bun**

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Optional)
If you wish to use the Gemini AI insights features locally:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Insert your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```
*(Note: If no API key is provided, ZenFlow runs completely offline using its built-in rule-based wellbeing engine).*

### 4. Start the Development Server
```bash
npm run dev
```

Visit **http://localhost:3000** in your web browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🛠 Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 6, TSX, esbuild
- **Styling**: Tailwind CSS v4 (Warm Organic / Editorial aesthetic)
- **Icons**: Lucide React
- **Animations**: Motion
- **Backend API**: Express server with proxy middleware & Gemini AI integration
- **Archive Export**: Archiver for 1-click source ZIP downloads

---

## ✨ Key Features
- **Live Internet Tracker**: Real-time bandwidth, continuous scroll warnings, and active app monitoring.
- **Mindful 10-Second Intercept**: Diaphragmatic breathing ritual before launching high-friction apps.
- **Weekly Executive Scorecard**: Health score breakdown, digital curfew adherence, and habit streak tracking.
- **Focus & Sleep Routines**: Automated scheduled black/white grayscale mode and bedtime curfews.
- **1-Click Source Code Export**: Direct ZIP download with clean package structure ready for local development.
