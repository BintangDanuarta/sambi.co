# Sambi.co Startup Script for Windows PowerShell
# This script starts both backend and frontend servers

Write-Host "🚀 Starting Sambi.co..." -ForegroundColor Green
Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "⚠️  Frontend dependencies not found. Installing..." -ForegroundColor Yellow
    npm install
}

if (-Not (Test-Path "backend/node_modules")) {
    Write-Host "⚠️  Backend dependencies not found. Installing..." -ForegroundColor Yellow
    cd backend
    npm install
    cd ..
}

# Check if .env files exist
if (-Not (Test-Path "backend/.env")) {
    Write-Host "⚠️  backend/.env not found!" -ForegroundColor Red
    Write-Host "   Please create backend/.env file. See START_HERE.md for instructions." -ForegroundColor Yellow
    Write-Host ""
}

if (-Not (Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local not found!" -ForegroundColor Red
    Write-Host "   Please create .env.local file. See START_HERE.md for instructions." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "🔧 Starting Backend Server (Port 5000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 BACKEND SERVER' -ForegroundColor Cyan; npm run dev"

Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "🌐 Starting Frontend Server (Port 3000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🌐 FRONTEND SERVER' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "✅ Sambi.co is starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📡 Backend:  http://localhost:5000/api" -ForegroundColor White
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop the servers" -ForegroundColor Gray

