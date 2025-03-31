# NBA Live Scoring Web Application - Deployment Instructions

This document provides instructions for deploying the NBA Live Scoring web application, which was converted from an Excel-based model to a full-featured web application with authentication and subscription functionality.

## Application Overview

The NBA Live Scoring web application allows users to:
- Track quarter-by-quarter NBA scoring
- Calculate fantasy points for players
- Compare team performance
- Access the tool via subscription-based model

## Technology Stack

- **Frontend**: Next.js with React
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth (mock implementation, ready for integration)
- **Database**: SQL database (via Cloudflare D1 or can be adapted to other SQL databases)
- **Payment Processing**: Stripe (mock implementation, ready for integration)

## Deployment Options

### Option 1: Cloudflare Pages (Recommended)

1. **Prerequisites**:
   - Cloudflare account
   - Node.js (v18+) and npm/pnpm installed
   - Wrangler CLI installed (`npm install -g wrangler`)

2. **Setup Database**:
   ```bash
   # Initialize the D1 database
   wrangler d1 create nba-live-scoring-db
   
   # Update wrangler.toml with your database ID
   # Replace the database_id in the [[d1_databases]] section
   
   # Execute the initial migration
   wrangler d1 execute nba-live-scoring-db --file=migrations/0001_initial.sql
   ```

3. **Configure Authentication**:
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication with Email/Password provider
   - Add your Firebase config to `src/lib/firebase.ts`

4. **Configure Stripe**:
   - Create a Stripe account at https://stripe.com
   - Set up products for Monthly and Annual subscriptions
   - Add your Stripe API keys to environment variables

5. **Deploy to Cloudflare Pages**:
   ```bash
   # Build the application
   npm run build
   
   # Deploy to Cloudflare Pages
   wrangler pages deploy .next
   ```

### Option 2: Vercel Deployment

1. **Prerequisites**:
   - Vercel account
   - GitHub, GitLab, or Bitbucket repository with your code

2. **Database Setup**:
   - Create a PostgreSQL database (Vercel Postgres or external)
   - Execute the SQL in migrations/0001_initial.sql to set up tables

3. **Configure Environment Variables**:
   - Set up Firebase and Stripe credentials in Vercel project settings

4. **Deploy**:
   - Connect your repository to Vercel
   - Follow the deployment steps in Vercel dashboard

### Option 3: Manual Deployment

1. **Build the application**:
   ```bash
   npm install
   npm run build
   ```

2. **Set up a database**:
   - Use any SQL database (PostgreSQL, MySQL, etc.)
   - Execute the SQL in migrations/0001_initial.sql

3. **Configure environment variables**:
   - Set up Firebase and Stripe credentials

4. **Deploy the built application**:
   - Host the built application on any hosting service that supports Next.js

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up local database**:
   ```bash
   wrangler d1 execute DB --local --file=migrations/0001_initial.sql
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Open http://localhost:3000 in your browser

## Integration Points

### Firebase Authentication

The application includes mock authentication that can be replaced with Firebase Auth:
1. Update `src/components/auth/AuthProvider.tsx` with Firebase Auth methods
2. Configure Firebase in your environment

### Stripe Integration

The application includes mock payment processing that can be replaced with Stripe:
1. Update `src/components/subscription/CheckoutForm.tsx` with Stripe Elements
2. Create API routes for handling Stripe webhooks
3. Configure Stripe in your environment

## Application Structure

- `src/components/scoring/` - Core scoring functionality components
- `src/components/auth/` - Authentication components
- `src/components/subscription/` - Subscription and payment components
- `src/components/ui/` - UI components and design system
- `migrations/` - Database schema and migrations

## Support and Troubleshooting

If you encounter any issues during deployment:
1. Ensure all environment variables are correctly set
2. Check database connection and schema
3. Verify Firebase and Stripe configurations

For additional support, please contact the development team.
