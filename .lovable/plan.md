Bahut sara kaam hai — poori site rework hogi. Yahaan clear plan hai jo main step-by-step build karunga:

## 1. Theme — Dark se Full White
- `src/styles.css` ko premium light theme mein convert: white background, soft gray surfaces, purple (#7C3AED) primary accent, yellow secondary accent
- Sab glass cards ko light glass mein (white/70 backdrop blur, subtle purple shadow)
- Text tokens, borders, hero gradient sab update

## 2. Home Page — Full Hospital Images
- Hero section ko full-width image banner banayenge (edge-to-edge)
- Ek "gallery strip" section add hoga full-bleed hospital photos ke saath
- 2 aur high-quality hospital images generate karunga (exterior + interior wards)

## 3. Appointment Form Fix
- Department select karne par sirf us department ke doctors filter honge
- Har doctor ka `department` field add karunga `data.ts` mein
- Doctor dropdown properly render hoga (name visible)

## 4. Naye Pages
- `/about` — About Us (mission, vision, history, achievements)
- `/services` — Detailed services listing

## 5. Lovable Cloud + Secure Authentication
- Cloud enable karunga (database + auth)
- Roles table: `admin`, `doctor`, `patient` (proper `user_roles` table with `has_role` function)
- Tables:
  - `profiles` (id, full_name, phone, avatar)
  - `appointments` (patient_id, doctor_id, department, date, time, status, notes)
  - `medical_records` (patient_id, doctor_id, diagnosis, prescription, notes, file_url, created_at)
- RLS policies: admin sees all, doctor sees apne patients, patient sees apna data
- `/auth` — signup/login page (email+password + Google)

## 6. Role-based Portals (protected `_authenticated` routes)
- **Admin Panel** (`/admin`) — dashboard stats, sab appointments, sab users manage, doctors add/remove
- **Doctor Panel** (`/doctor`) — apne appointments, patients list, medical record likhna
- **Patient Panel** (`/patient`) — apni appointments, apne medical records dekhna
- Booking form logged-in patient ke liye direct database mein save hogi

## 7. Navigation Update
- Nav mein "Sign In" button add hoga
- Logged-in user apne role ke portal ka link dekhega
- Sign out button

## Scope note
Ye kaafi bara kaam hai (2-3 turns lag sakte hain). Main pehle theme + missing pages + appointment fix + home images ek shot mein karunga, phir Cloud auth + portals next turn mein. Aap chahein to koi part skip karne ko bol dein, warna main pura build karta hun.

**Confirm karein ya changes batayein — phir main shuru karta hun.**