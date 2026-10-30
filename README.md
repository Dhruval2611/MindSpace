# MINDSPACE 2026 — College Mental Health Fest
> **Tagline:** *“Your Mind Matters. Your Story Matters.”*

An elegant, modern, accessible, and fully functional web application built for **MINDSPACE 2026**, a college mental health and emotional well-being festival.

---

## 🌿 Brand Identity & Design System

The application features a calming, Gen-Z-friendly aesthetic designed to balance editorial warmth with modern responsiveness:

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Sage Green** | `#A8BDA5` | Primary accent, natural balance, grounded elements |
| **Deep Forest Green** | `#25483B` | Brand identity, primary typography, headers, main CTAs |
| **Warm Cream** | `#F8F5EF` | Background canvas, soft warmth, reducing screen glare |
| **Lavender** | `#DCD4F2` | Emotional reflection, youth wellness, calming badges |
| **Soft Peach** | `#F1D5C8` | Organic highlights, subtle illustrations, creative energy |
| **White** | `#FFFFFF` | Elevated card surfaces, accessible contrast |

- **Typography:** Editorial serif headings (*Playfair Display*) paired with clean, readable modern sans-serif (*Plus Jakarta Sans*).
- **Aesthetic:** Soft shadows, 24px–32px rounded corners, organic botanical illustrations, floating abstract shapes, and subtle animations.

---

## ✨ Features & Architecture

### 1. Home / Hero Section
- **Editorial Headline:** *“Make Space for Your Mind.”*
- **Supporting Narrative:** *“A festival of feelings, creativity, connection, and conversations that matter.”*
- **Action Buttons:**
  - *Register Now* (triggers student registration dialog)
  - *Explore Activities* (smooth scroll to activity explorer)
  - *Discover the Fest* (smooth scroll to about section)
- **Calming Animated Visual:** Floating organic clouds, blooming mental growth flower, sparkle stars, and floating mood badges.
- **Event Information Board:**
  - **Expected Dates:** First week of November 2026
  - **Venue:** Verified editable placeholder (*To be announced*)
  - **Entry:** Verified editable placeholder (*Free for college students*)
  - **Live Registration Status Badge:** Dynamic indicator reflecting committee status (*Open / Paused / Closed*).

### 2. About the Fest — “A Little Space to Breathe.”
- Deep-dive into MINDSPACE philosophy: breaking stigmas, exploring emotions, developing coping mechanisms, and finding peer solidarity.
- **Three Core Pillars:**
  1. *Awareness* (psychoeducation, recognizing burnout, busting stigmas)
  2. *Expression* (creative art, open stage, writing without filters)
  3. *Connection* (active listening, human library, campus warmth)
- **Interactive 60-Second Mindful Breathing Widget:** A guided 4-4-4 Box Breathing visualizer right on the page.
- **Ethical Disclaimer:** Prominently clarifies that activities are educational and not a substitute for clinical psychiatric or psychological therapy.

### 3. Curated Event Explorer (10 Proposed Activities)
- Search filter and category selector (*Expression, Creativity, Wellness, Awareness, Connection, Learning, Games*).
- Clearly labeled with **“Proposed Activity — Subject to Organizer Confirmation”**.
- **10 Activities Implemented:**
  1. *Open Mic — Voices Unfiltered* (Expression, 60m)
  2. *Art Therapy-Inspired Creative Corner* (Creativity, 45m)
  3. *Mindfulness & Meditation* (Wellness, 30m)
  4. *Mental Health Myths vs Facts* (Awareness, 30m)
  5. *Emotion Wall* (Expression, Open throughout event)
  6. *Kindness Notes* (Connection, 20m)
  7. *Stress Management Workshop* (Learning, 45m)
  8. *Human Library — Listen Without Judgment* (Connection, 45m)
  9. *Wellness Treasure Hunt* (Games, 30m)
  10. *Self-Care Station* (Wellness, Open throughout event)
- Each card features duration, dynamic capacity progress bar, spots remaining, detailed modal view, and 1-click registration.

### 4. Interactive Community Emotion Wall (Activity #5)
- Live realization of Activity #5!
- Allows students to anonymously post feelings, affirmations, or study reflections.
- Custom mood tags (*Grateful, Hopeful, Exhausted, Reflective, Healing, Curious*) and pastel color selection.
- Community peer-moderation and encouraging heart interactions.

### 5. Professional Student Registration System
- **Fields:**
  - Full Name (required)
  - College Email Address (required, validated format)
  - College / Institution (required, placeholder editable)
  - Course / Department (required)
  - Semester / Year (required dropdown)
  - Contact Number (optional)
  - Select Activity (multi-select pill checkboxes with live seat counts)
  - Preferred Time Slot (Morning / Afternoon / Evening / Full Day)
  - Consent Checkbox (required)
- **Validation & Protections:**
  - Strict client-side validation with inline error messaging.
  - **Duplicate submission prevention** (rejects if email already enrolled in that activity).
  - Capacity cap enforcement.
  - Generates unique Registration ID (e.g., `MS26-4821`).
  - **Digital Festival Pass Modal:** Instant printable / downloadable ticket pass with student details, activity list, and scannable QR graphic.
  - **Privacy Guarantee:** Does NOT collect sensitive medical records, diagnoses, or therapy notes.

### 6. Protected Organizer Dashboard
- **Security:** Protected by committee passcode (Default: `mindspace2026`).
- **Live Metrics:** Total registrations, seat capacity fill rate, activity breakdown.
- **Registrations Table:** Searchable by student name, email, department, or activity.
- **CSV Export:** 1-click export with UTF-8 BOM encoding for Microsoft Excel & Google Sheets.
- **Activity Manager:** Edit activity titles, change capacity limits, toggle open/closed registration.
- **Master Registration Switch:** Enable, pause, or disable fest registrations.
- **Placeholders Editor:** Live editing of campus name, venue, email, and social handles without code changes.

### 7. Tentative Schedule Timeline
- Step-by-step program flow from morning welcome circle to closing open mic.
- Clear banner: *“Tentative Schedule — Subject to Organizer Confirmation.”*

### 8. Mental Health Awareness Corner — “Let’s Talk About Mental Health”
- Student-friendly explanations of mental health as a fluctuating continuum.
- 4 Foundations of Academic Well-being (*Sleep, Social Connection, Micro-breaks, Realistic Self-care*).
- **Interactive Myths vs. Facts Cards** (reveal psychology facts on tap).
- **Peer Empathy Playbook:** 3 actionable steps to support a friend having a difficult time.
- **Verified Helplines Directory:**
  - Tele-MANAS (14416 / 1800-891-4416)
  - Vandrevala Foundation (+91 9999 666 555)
  - iCall Psychosocial Helpline (TISS) (+91 9152 987 821)
  - KIRAN National Helpline (1800-599-0019)
  - College Counseling Center Placeholder
- Clear medical disclaimer and emergency protocol guidance.

### 9. FAQs & Footer
- All 7 questions with smooth accordion transitions and organizer pending tags.
- Verified editable placeholders for organizer, host campus, email, and Instagram.
- Interactive **Privacy Policy** and **Registration Terms** modals.

---

## 💾 Backend & Database Integration

### 1. Out-of-the-Box Local Persistence
The application immediately stores all registrations, activity updates, mood wall notes, and festival settings in `localStorage` under namespaced keys (`mindspace_registrations_v2`, `mindspace_activities_v2`, `mindspace_config_v2`).
- Data persists across browser refreshes and tab closures.
- Supports complete CRUD operations, capacity tracking, and CSV exports.

### 2. Live Cloud Google Sheets Backend (Free Tier)
To sync student registrations into a live, collaborative Google Sheet:

1. Create a new Google Sheet at [sheets.new](https://sheets.new) named **MINDSPACE 2026 Registrations**.
2. Go to **Extensions > Apps Script**.
3. Copy the script provided in `src/services/googleSheetsGuide.ts` (or from the **Google Sheets Sync** tab in the Organizer Dashboard) and paste it into `Code.gs`.
4. Click **Deploy > New deployment**.
5. Select **Web app**:
   - *Description:* MINDSPACE Webhook
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
6. Copy the generated Web App URL (`https://script.google.com/macros/s/.../exec`).
7. Open the **MINDSPACE Organizer Dashboard > Google Sheets Sync** tab, paste the URL, and click **Save**.
8. Every new student registration will now automatically append as a new row in your private Google Sheet in real-time!

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

The application will be accessible at `http://localhost:5173/`.

---

## 🌐 Free Hosting & Deployment Options

### Option 1: Vercel (Recommended)
1. Push the code to a GitHub repository.
2. Visit [vercel.com](https://vercel.com) and click **Add New Project**.
3. Select your repository. Framework preset will automatically detect **Vite**.
4. Click **Deploy**.

### Option 2: Netlify
1. Run `npm run build` to generate the `dist` folder.
2. Drag and drop the `dist` folder into [app.netlify.com/drop](https://app.netlify.com/drop), or link via Git repository.

### Option 3: GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. Add `"base": "./"` in `vite.config.ts`.
3. Add deploy script: `"deploy": "npm run build && gh-pages -d dist"`
4. Run `npm run deploy`.

---

## 🔐 Organizer Credentials

- **Access:** Click the **Organizer Portal** button in the navbar or the link in the footer.
- **Default Passcode:** `mindspace2026`
- **Passcode Reset:** Can be modified at any time inside the *Fest Settings* tab in the dashboard.
