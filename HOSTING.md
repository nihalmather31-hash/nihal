# 🚀 Hosting Your Project

This guide explains how to host your tourism project online for free using **MongoDB Atlas** and **Render**.

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

Since you've already "setup MongoDB", make sure it is a **MongoDB Atlas** (cloud) cluster so it's accessible from the internet.

1.  **Register/Login** at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2.  **Create a New Cluster** (Choose the Free Tier/Shared cluster).
3.  **Security Setup**:
    *   **Database Access**: Create a user with a username and password (e.g., `admin` / `yourpassword`).
    *   **Network Access**: Click "Add IP Address" and select **"Allow Access from Anywhere" (0.0.0.0/0)**. This is required for Render to connect.
4.  **Get Connection String**:
    *   Click "Connect" on your cluster.
    *   Choose "Drivers" (Node.js).
    *   Copy the URI (it looks like `mongodb+srv://admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`).
    *   **Replace `<password>`** with the password you created.

---

## Step 2: Push to GitHub (Using GitHub Desktop)

1.  **Open GitHub Desktop** and log in.
2.  Click **"File" -> "Add Local Repository"**.
3.  Select your project folder (`nihal`).
4.  If it says "This directory does not appear to be a Git repository", click the link to **"Create a repository here"**.
    *   **Name**: `my-tourism-project`
    *   **Description**: (Optional)
    *   **Initialize with README**: (Uncheck)
    *   **Git Ignore**: Select "Node" (optional)
    *   Click **Create Repository**.
5.  In the "Summary" box at the bottom left, type "**First commit**".
6.  Click the blue **"Commit to main"** button.
7.  Click the big button at the top that says **"Publish repository"**.
8.  Ensure "Keep this code private" is **Unchecked** (it's easier to link to Render if public, but private also works).
9.  Click **Publish Repository**.

---

## Step 3: Deploy to Render.com

1.  **Login to Render**: [render.com](https://render.com) (use your GitHub account).
2.  Click the blue **"New +"** button -> **"Web Service"**.
3.  Choose **"Connect a repository"**.
4.  Select your new repository (`my-tourism-project`).
5.  **Settings**:
    *   **Name**: `my-tourism-app`
    *   **Build Command**: `cd backend && npm install`
    *   **Start Command**: `cd backend && npm start`
6.  **Add Database Connection**:
    *   Scroll down to **"Advanced"**.
    *   Click **"Add Environment Variable"**.
    *   Key: `MONGODB_URI`
    *   Value: `(Paste your MongoDB Atlas Connection string here)`
7.  Click **"Create Web Service"**.

---

## Done! 
Render will build your app. Once it says "Live", click the URL at the top to see your website!

