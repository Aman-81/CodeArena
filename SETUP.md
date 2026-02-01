# Setup Guide

This guide will help you set up CodeArena on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Redis** - [Redis Cloud](https://redis.com/try-free/) or local installation
- **Git** - [Download](https://git-scm.com/)

## Required API Keys

You'll need to obtain the following API keys:

1. **Judge0 API Key** - For code execution
   - Sign up at [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)
   
2. **Google Gemini API Key** - For AI features
   - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)
   
3. **Cloudinary Account** - For media storage
   - Sign up at [Cloudinary](https://cloudinary.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Aman-81/CodeArena.git
cd CodeArena
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create environment file:
```bash
cp src/.env.example src/.env
```

Edit `backend/src/.env` with your credentials:
```env
PORT=3000
DB_CONNECT_STRING=mongodb+srv://username:password@cluster.mongodb.net/CodeArena
JWT_KEY=your_secure_random_string_here
REDIS_PASS=your_redis_password
JUDGE0_KEY=your_judge0_api_key
GEMINI_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm start
```

The backend should now be running on `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:
```bash
npm run dev
```

The frontend should now be running on `http://localhost:5173`

## Verification

1. Open your browser and navigate to `http://localhost:5173`
2. You should see the landing page
3. Try signing up for a new account
4. Test the AI chat feature on a problem page

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure the database user has proper permissions

### Redis Connection Issues
- Verify Redis password is correct
- Check if Redis instance is running
- Ensure no trailing spaces in the password

### Port Already in Use
If port 3000 or 5173 is already in use:
- Change `PORT` in backend `.env`
- Update `VITE_API_URL` in frontend `.env` accordingly

### API Key Issues
- Verify all API keys are valid
- Check for any usage limits on free tiers
- Ensure no extra spaces in the `.env` file

## Next Steps

- Read [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to contribute
- Check out the [README.md](README.md) for project features
- Explore the codebase and start coding!

## Need Help?

If you encounter any issues:
1. Check existing [GitHub Issues](https://github.com/Aman-81/CodeArena/issues)
2. Create a new issue with detailed information
3. Join our community discussions

Happy coding! 🚀
