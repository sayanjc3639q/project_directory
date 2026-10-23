# Setup Guide

## Prerequisites
- Node.js >= 20.0.0
- Firebase Project with Firestore, Authentication, and Storage enabled

## Steps
1. Copy `.env.example` to `.env.local` and fill in credentials.
2. Install dependencies: `npm install`
3. Generate admin credentials and deploy rules:
   ```bash
   firebase deploy --only firestore:rules,storage
   ```
4. Assign admin claim to your user:
   ```bash
   node scripts/set-admin-claim.mjs user@example.com
   ```
5. Seed sample data:
   ```bash
   node scripts/seed-sample-data.mjs
   ```
6. Start dev server: `npm run dev`
