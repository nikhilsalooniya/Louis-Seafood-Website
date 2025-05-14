# 🐟 Louis Seafood Website

A modern seafood business web application built using **Next.js**, integrated with **PostgreSQL**, **NextAuth.js** for authentication, and support for contact form email notifications.

----FIRST STEP----
# Clone website 
git clone https://github.com/your-username/seafood-website.git
cd seafood-website
npm install
---


----SECOND STEP------
## 🔧 Environment Variables Setup

Before running the project, create a `.env.local` file in the root directory and add the following:

```env
# PostgreSQL Database Configuration
DB_USER=postgres
DB_PASSWORD=yourdb_pass
DB_HOST=localhost
DB_PORT=5432
DB_NAME=seafood-website

# Email Configuration (Gmail SMTP)
EMAIL_USER=maazfaridi22@gmail.com
EMAIL_PASS=your_gmail_app_password  # Use App Password if 2FA is enabled

# NextAuth Configuration
NEXTAUTH_SECRET=your_next-auth-api-key
NEXTAUTH_URL=http://localhost:3000




-------THIRD_STEP--------
# Run website
npm run dev


Login Page Credentials
username-admin
passowrd-admin123