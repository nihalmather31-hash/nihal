# Quick Start Guide - Backend Server

## Option 1: Using MongoDB Atlas (Recommended - No Local MongoDB Needed)

### Step 1: Create Free MongoDB Atlas Account
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create a **FREE M0 Cluster**
4. Create database user (remember username/password)
5. Add IP Address: `0.0.0.0/0` (allows all IPs - for development only)
6. Get connection string from "Connect" button

### Step 2: Update .env File
1. Open `backend\.env`
2. Replace `MONGODB_URI` with your Atlas connection string
3. Example: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tourism_db`
4. Save the file

### Step 3: Seed Database
```bash
cd c:\Users\INSPIRE TVM\OneDrive\Desktop\nihal\backend
node seed.js
```

### Step 4: Start Server
```bash
npm run dev
```

---

## Option 2: Install MongoDB Locally

### Download MongoDB
1. Visit: https://www.mongodb.com/try/download/community
2. Download MongoDB Community Server
3. Install with default settings
4. MongoDB Compass (GUI) will also be installed

### Start MongoDB
After installation, MongoDB should start automatically. If not:
```bash
net start MongoDB
```

### Then Run Backend
```bash
cd c:\Users\INSPIRE TVM\OneDrive\Desktop\nihal\backend
node seed.js
npm run dev
```

---

## Verify Backend is Running

You should see:
```
Server running on port 5000
API available at http://localhost:5000
MongoDB Connected: <your-connection>
```

## Test the Application

Open `index.html` in your browser and try logging in!

---

## Troubleshooting

**Can't find MongoDB?**
→ Use MongoDB Atlas (Option 1) - it's easier!

**Connection refused?**
→ Check your MongoDB Atlas IP whitelist
→ Verify connection string in `.env`

**Module not found?**
→ Run `npm install` in backend directory

---

## Quick Commands Reference

```bash
# Navigate to backend
cd c:\Users\INSPIRE TVM\OneDrive\Desktop\nihal\backend

# Install dependencies (if needed)
npm install

# Seed database (first time)
node seed.js

# Start server
npm run dev

# Stop server
Ctrl + C
```
