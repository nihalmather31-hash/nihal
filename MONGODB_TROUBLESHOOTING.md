# MongoDB Atlas Connection Troubleshooting

## Error: querySrv ECONNREFUSED

You're seeing this error:
```
Error: querySrv ECONNREFUSED _mongodb._tcp.cluster0.r5jcjhl.mongodb.net
```

This means the connection to MongoDB Atlas is being refused. Here are the solutions:

---

## Solution 1: Check Network Access (Most Common Issue)

### Steps:
1. Go to your MongoDB Atlas dashboard: https://cloud.mongodb.com
2. Click on **"Network Access"** in the left sidebar
3. Check if you have IP addresses whitelisted
4. Click **"Add IP Address"**
5. Choose **"Allow Access from Anywhere"**
   - IP Address: `0.0.0.0/0`
   - Description: `Allow all (development)`
6. Click **"Confirm"**
7. **Wait 1-2 minutes** for the change to take effect

---

## Solution 2: Verify Cluster is Running

1. Go to **"Database"** in MongoDB Atlas
2. Check if your cluster shows **"Active"** status
3. If it says "Creating" or "Paused", wait for it to become active
4. **First-time cluster creation can take 5-10 minutes**

---

## Solution 3: Check Internet Connection

1. Make sure you're connected to the internet
2. Try opening https://www.google.com in your browser
3. If you're behind a firewall or VPN, it might block MongoDB Atlas
4. Try disabling VPN temporarily

---

## Solution 4: Verify Connection String

Your current connection string:
```
mongodb+srv://nihalmather31:nihal123@cluster0.r5jcjhl.mongodb.net/tourism_db?retryWrites=true&w=majority&appName=Cluster0
```

Make sure:
- ✅ Username is correct: `nihalmather31`
- ✅ Password is correct: `nihal123` (no `<` `>` brackets)
- ✅ Cluster name matches: `cluster0.r5jcjhl`

---

## Solution 5: Wait and Retry

Sometimes the cluster needs a few minutes to be fully ready:

1. **Wait 5 minutes** after creating the cluster
2. Try running the seed command again:
   ```bash
   cd c:\Users\INSPIRE TVM\OneDrive\Desktop\nihal\backend
   node seed.js
   ```

---

## Quick Test Commands

### Test 1: Ping the cluster
```bash
ping cluster0.r5jcjhl.mongodb.net
```

### Test 2: Check if DNS resolves
```bash
nslookup cluster0.r5jcjhl.mongodb.net
```

---

## After Fixing Network Access

Once you've added `0.0.0.0/0` to Network Access and waited 1-2 minutes:

```bash
# Navigate to backend
cd c:\Users\INSPIRE TVM\OneDrive\Desktop\nihal\backend

# Try seeding again
node seed.js

# If successful, start the server
npm run dev
```

---

## Expected Success Output

When it works, you should see:
```
MongoDB Connected
Cleared existing users
Created user: localadmin (local)
Created user: mookanoor (local)
Created user: rohit (local)
Created user: sooraj (local)
Created user: mainadmin (main)
Created user: superadmin (main)

✅ Database seeded successfully!
```

---

## Still Not Working?

If none of the above works:

1. **Screenshot your MongoDB Atlas dashboard** showing:
   - Network Access page
   - Database Deployments page (showing cluster status)
   
2. **Try using MongoDB Compass** (GUI tool):
   - Download from: https://www.mongodb.com/try/download/compass
   - Use the same connection string
   - This will help diagnose if it's a code issue or Atlas issue

3. **Alternative**: Use a different cluster
   - Create a new cluster in MongoDB Atlas
   - Get a fresh connection string
   - Update `.env` file

---

## Most Likely Solution

**90% of the time, this error is fixed by:**
1. Adding `0.0.0.0/0` to Network Access in MongoDB Atlas
2. Waiting 2-3 minutes
3. Running `node seed.js` again

Try that first! 🚀
