# Family Travel Tracker - Setup Instructions

## Getting Started with GitHub

### Prerequisites
- Git installed on your computer
- A GitHub account
- Node.js and PostgreSQL installed

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "family-travel-tracker")
5. Add a description: "A web application for families to track visited countries"
6. Choose "Public" or "Private"
7. **DO NOT** initialize with README, .gitignore, or license (we already have these)
8. Click "Create repository"

### Step 2: Initialize Git and Connect to GitHub

Open terminal/command prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Make your first commit
git commit -m "Initial commit: Family Travel Tracker application"

# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 3: Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your actual database credentials:
   ```
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_NAME=world
   DB_PORT=5432
   PORT=6969
   ```

### Step 4: Database Setup

1. Make sure PostgreSQL is running
2. Create the `world` database if it doesn't exist
3. Run the SQL commands from `queries.sql` to create the required tables
4. Import countries data into the `countries` table

### Step 5: Install Dependencies and Run

```bash
# Install dependencies
npm install

# Start the application
npm start

# Or for development with auto-restart
npm run dev
```

### Step 6: Update Repository Information

Before pushing, update the following in `package.json`:
- Replace `"author": "Your Name"` with your actual name
- Replace the repository URL with your actual GitHub repository URL

### Git Commands Reference

```bash
# Check status of files
git status

# Add specific files
git add filename.js

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes to GitHub
git push origin main

# Pull latest changes
git pull origin main

# Create a new branch
git checkout -b feature-name

# Switch back to main branch
git checkout main
```

### Important Notes

- The `.env` file is already in `.gitignore` so your database credentials won't be uploaded to GitHub
- Remember to update the database configuration in your code to use environment variables
- Consider using a service like Heroku, Railway, or Vercel for deployment

### Security Recommendations

1. Never commit sensitive information like passwords
2. Use environment variables for all configuration
3. Keep your `.env` file local and never push it to GitHub
4. Use strong, unique passwords for your database

### Next Steps

1. Set up continuous integration with GitHub Actions
2. Deploy to a cloud platform
3. Add more features from the TODO list in README.md
4. Invite collaborators to your repository
