# MongoDB Backend Setup Guide

## Prerequisites
✅ MongoDB installed locally
✅ Node.js installed
✅ Backend dependencies installed

## Step-by-Step Setup

### 1. Start MongoDB Service

Make sure MongoDB is running on your system. You can start it with:

```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# Or if you installed MongoDB manually
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe" --dbpath="C:\data\db"
```

### 2. Seed the Database with Initial Users

Open a terminal in the backend directory and run:

```bash
cd c:\Users\INSPIRE TVM\OneDrive\Desktop\nihal\backend
node seed.js
```

This will create the following users:
- **Local Admins**: localadmin, mookanoor, rohit, sooraj (all with password: admin123 or their username123)
- **Main Admins**: mainadmin, superadmin (both with password: admin123)

### 3. Start the Backend Server

```bash
# In the backend directory
npm run dev
```

You should see:
```
MongoDB Connected: localhost
Server running on port 5000
API available at http://localhost:5000
```

### 4. Test the Frontend

1. Open `index.html` in your browser
2. Try logging in with:
   - Username: `localadmin`
   - Password: `admin123`
   - Role: Local Admin

## Troubleshooting

### MongoDB Connection Error
- **Error**: `MongoServerError: connect ECONNREFUSED`
- **Solution**: Make sure MongoDB service is running

### CORS Error
- **Error**: `Access to fetch at 'http://localhost:5000' has been blocked by CORS policy`
- **Solution**: The backend already has CORS enabled. Make sure the backend server is running.

### Port Already in Use
- **Error**: `Error: listen EADDRINUSE: address already in use :::5000`
- **Solution**: Change the PORT in `.env` file or stop the process using port 5000

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/verify` - Verify token

### Places
- `GET /api/places` - Get all places
- `GET /api/places/:district/:city/:village` - Get specific place
- `POST /api/places` - Create/update place
- `POST /api/places/:id/items` - Add item to category
- `DELETE /api/places/:id/items/:itemId` - Remove item
- `PUT /api/places/:id/emergency` - Update emergency contacts

## Next Steps

Once everything is working:
1. All your data will now be stored in MongoDB instead of localStorage
2. Data persists across browser sessions and computers
3. You can view your data using MongoDB Compass or the mongo shell
4. The frontend code remains mostly the same - it just uses the API now

## Important Notes

⚠️ **Security**: The current setup is for development only. For production:
- Add proper authentication middleware
- Use environment variables for sensitive data
- Enable HTTPS
- Add rate limiting
- Validate all inputs

⚠️ **Data Migration**: If you have existing data in localStorage, you'll need to manually migrate it or create a migration script.
