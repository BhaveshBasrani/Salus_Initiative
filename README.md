# Salus Initiative — Enterprise Youth Mental Health Platform

> **Architecture Status**: v3.0 Production Ready (Software Architecture Document & PRD Complete)  
> **Tech Stack**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP, Zustand, Fuse.js, Google Apps Script Serverless Backend, Google Sheets DB, Google Drive File Storage, Gmail HTML Email Engine.

---

## 🌟 Overview

**Salus Initiative** is a peer-led mental health advocacy and emotional well-being platform designed for youth, students, parents, schools, and volunteers. It fuses deep human warmth, magazine editorial typography, and vintage anatomical aesthetics with enterprise-grade digital architecture.

---

## 🛠️ Tech Stack & Key Features

- **Frontend**: Next.js 14+ App Router, React 18, TypeScript, Tailwind CSS, Shadcn UI patterns.
- **Aesthetics & UI**: Dynamic Island morphing top bar navigation, glassmorphism design system (`backdrop-blur-xl`), vintage anatomical logo motif, film grain texture overlays, and warm peach highlight accents (`#FF7E67`).
- **Interactive Features**:
  - **Today's Whisper**: Daily micro-reflection flip card with shuffle and quote sharing.
  - **Community Story Hub**: User story submission modal with anonymous publishing toggle and image upload.
  - **Volunteer Application Wizard**: 4-step wizard with PDF/DOCX resume upload.
  - **Resource Hub & Events**: Filterable guide library with instant Fuse.js fuzzy search and virtual event RSVP.
  - **Admin Control Center**: Moderation queue for stories, applicant tracker, subscriber campaign broadcast composer, and real-time analytics widgets.
- **Backend & Database**:
  - **Google Apps Script** (`google-apps-script/Code.gs`): Serverless REST API with Controller-Service-Repository architecture.
  - **Google Sheets**: Relational database tables (`Stories`, `Applicants`, `Subscribers`, `Logs`, `CMS_Whispers`, `CMS_Resources`, `CMS_Events`, `CMS_FAQs`).
  - **Google Drive**: Automated file folder storage for uploaded resumes and assets.
  - **Gmail API**: 11 responsive HTML transactional and campaign email templates.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js `v18.0.0` or higher
- npm or pnpm

### 2. Installation
```bash
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Google Apps Script Backend Setup Guide

1. Go to [Google Apps Script](https://script.google.com/) and create a **New Project**.
2. Open the file [google-apps-script/Code.gs](file:///c:/Users/bhave/OneDrive/Desktop/Projects/Salus/google-apps-script/Code.gs) in this repository and copy its entire contents into your `Code.gs` script editor.
3. Open a new [Google Sheet](https://sheets.new) titled **Salus_DB** and copy its Sheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
4. In your Apps Script editor, navigate to **Project Settings ⚙️** $\rightarrow$ **Script Properties** and add:
   - `SHEET_ID`: Your Google Sheet ID
   - `ADMIN_PASSKEY`: `salus2026`
   - `RECAPTCHA_SECRET`: (Optional) Your Google reCAPTCHA v3 secret key
5. Run the function `initSalusSheets()` once in the script editor to automatically generate all 8 database tab schemas.
6. Click **Deploy** $\rightarrow$ **New deployment**:
   - **Select type**: Web app
   - **Execute as**: Me (your Google account)
   - **Who has access**: Anyone
7. Copy the resulting **Web App URL** and add it to your `.env.local` or Vercel environment variables as `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL`.

---

## 📐 Environment Variables (`.env.example`)

```bash
NEXT_PUBLIC_APP_URL=https://salusinitiative.org
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Ld_demo_site_key
NEXT_PUBLIC_GA_ID=G-SALUS12345
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

RECAPTCHA_SECRET_KEY=6Ld_demo_secret_key
ADMIN_SECRET_PASSKEY=salus2026
```

---

## 🚀 Deployment to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Deploy Salus Initiative v3.0"
git push origin main
```
Import the repository into Vercel, populate the environment variables, and click **Deploy**.

---

## 🛡️ Crisis & Emergency Contact
If you or someone you know is in acute distress, call or text **988** for the 24/7 Suicide & Crisis Lifeline.
