#!/bin/sh
set -e

echo "🚀 [INIT] app-start.sh is running..."
echo "🔍 [INIT] Checking environment..."
echo "Running as user: $(whoami)"
echo "Current directory: $(pwd)"

# Ensure we have a consistent HOME
export HOME=/root

if [ "$PORTFOLIO_MODE" = "DEV" ]; then
  echo "🚀 [DEV] Starting Portfolio in DEVELOPMENT mode..."
  
  export NODE_ENV=development

  # Clear node_modules contents if React is broken (not the directory itself - it's a mount point!)
  if [ ! -f "node_modules/react/cjs/react.development.js" ]; then
    echo "⚠️ [WARN] React development build is missing!"
    echo "🗑️ [ACTION] Clearing node_modules contents..."
    rm -rf node_modules/* node_modules/.* 2>/dev/null || true
  else
    echo "✅ [OK] React development build found."
  fi
  
  # Install dependencies
  echo "📦 [INSTALL] Installing dependencies..."
  npm install --include=dev --no-audit --no-fund --loglevel=info
  
  # Push database schema (ensures tables exist)
  echo "🗄️ [DB] Pushing database schema..."
  npx prisma db push --accept-data-loss
  
  # Create admin user if script exists
  if [ -f "scripts/create-admin.ts" ]; then
    echo "👤 [ADMIN] Creating admin user..."
    npx -y tsx scripts/create-admin.ts || echo "⚠️ Admin creation failed (may already exist)"
  fi
  
  # Ensure Prisma client is up to date
  echo "💎 [PRISMA] Generating client..."
  npx prisma generate
  
  # Start Next.js dev server with hot reloading
  echo "📖 [NEXT] Starting Turbopack dev server..."
  exec npm run dev
else
  echo "🏗️ [PROD] Starting Portfolio in PRODUCTION mode..."
  export NODE_ENV=production
  
  # Check if build exists
  if [ ! -f ".next/standalone/server.js" ]; then
    echo "📦 [BUILD] Production build not found. Building..."
    
    # Force clean node_modules (volume may have stale/incomplete deps)
    echo "🗑️ [CLEAN] Clearing node_modules for fresh install..."
    rm -rf node_modules/* node_modules/.* 2>/dev/null || true
    rm -rf .next/* .next/.* 2>/dev/null || true
    
    # Install ALL dependencies (including dev) because build needs tailwindcss, postcss, etc.
    npm install --include=dev --no-audit --no-fund
    npx prisma generate
    npm run build
    
    # After build, prune devDependencies to reduce image size (optional)
    echo "🧹 [PRUNE] Removing devDependencies after build..."
    npm prune --omit=dev
  else
    echo "✅ [BUILD] Production build found, skipping build step."
  fi
  
  # ALWAYS push database schema on startup (idempotent operation)
  echo "🗄️ [DB] Ensuring database schema is up to date..."
  # Need prisma for db push, install if not present
  if [ ! -d "node_modules/prisma" ]; then
    npm install prisma @prisma/client --no-audit --no-fund
  fi
  npx prisma db push --accept-data-loss
  
  # Create admin user if script exists and tsx is available
  if [ -f "scripts/create-admin.ts" ]; then
    echo "👤 [ADMIN] Creating admin user..."
    npx -y tsx scripts/create-admin.ts 2>/dev/null || echo "⚠️ Admin creation skipped (may already exist or tsx unavailable)"
  fi
  
  # Copy static assets to standalone directory (required for standalone mode)
  if [ -d ".next/standalone" ]; then
    echo "📁 [STATIC] Copying static assets to standalone..."
    cp -r public .next/standalone/ 2>/dev/null || true
    cp -r .next/static .next/standalone/.next/ 2>/dev/null || true
  fi
  
  # Start the server
  echo "🚀 [START] Starting production server..."
  if [ -f ".next/standalone/server.js" ]; then
    cd .next/standalone
    exec node server.js
  else
    exec npm run start
  fi
fi
