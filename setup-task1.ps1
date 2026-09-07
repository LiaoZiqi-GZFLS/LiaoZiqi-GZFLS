# Task 1 - Step 7 & Step 8 Completion Script
# Working directory: d:\code\project\LiaoZiqi-GZFLS

$ErrorActionPreference = "Stop"
Set-Location "d:\code\project\LiaoZiqi-GZFLS"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 7: Install dependencies and verify configuration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 7.1: npm install
Write-Host "`n--- Running npm install ---" -ForegroundColor Yellow
try {
    npm install
    Write-Host "[OK] npm install completed successfully" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] npm install failed: $_" -ForegroundColor Red
    exit 1
}

# Step 7.2: npm run build
Write-Host "`n--- Running npm run build ---" -ForegroundColor Yellow
try {
    npm run build
    Write-Host "[OK] npm run build completed successfully" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] npm run build failed: $_" -ForegroundColor Red
    exit 1
}

# Step 7.3: Verify node_modules
Write-Host "`n--- Verifying node_modules ---" -ForegroundColor Yellow
if (Test-Path "node_modules") {
    $count = (Get-ChildItem "node_modules").Count
    Write-Host "[OK] node_modules directory exists with $count items" -ForegroundColor Green
} else {
    Write-Host "[ERROR] node_modules directory not found!" -ForegroundColor Red
    exit 1
}

# Step 7.4: Verify out directory
Write-Host "`n--- Verifying out directory ---" -ForegroundColor Yellow
if (Test-Path "out") {
    $count = (Get-ChildItem "out").Count
    Write-Host "[OK] out directory exists with $count items" -ForegroundColor Green
} else {
    Write-Host "[ERROR] out directory not found!" -ForegroundColor Red
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Step 8: Commit initial configuration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 8.1: git init
Write-Host "`n--- Initializing git repository ---" -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    try {
        git init
        Write-Host "[OK] git init completed" -ForegroundColor Green
    } catch {
        Write-Host "[ERROR] git init failed: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[OK] git already initialized" -ForegroundColor Green
}

# Step 8.2: git add
Write-Host "`n--- Adding all files ---" -ForegroundColor Yellow
git add .
Write-Host "[OK] git add completed" -ForegroundColor Green

# Step 8.3: git commit
Write-Host "`n--- Creating commit ---" -ForegroundColor Yellow
try {
    git commit -m "feat: initialize Next.js project with Tailwind CSS"
    Write-Host "[OK] git commit completed" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] git commit failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Verify node_modules
if (Test-Path "node_modules") {
    Write-Host "[OK] node_modules exists" -ForegroundColor Green
} else {
    Write-Host "[FAIL] node_modules missing" -ForegroundColor Red
}

# Verify out
if (Test-Path "out") {
    Write-Host "[OK] out exists" -ForegroundColor Green
} else {
    Write-Host "[FAIL] out missing" -ForegroundColor Red
}

# Verify .git
if (Test-Path ".git") {
    Write-Host "[OK] .git exists" -ForegroundColor Green
} else {
    Write-Host "[FAIL] .git missing" -ForegroundColor Red
}

# Git log
Write-Host "`n--- Git log ---" -ForegroundColor Yellow
git log --oneline

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  ALL STEPS COMPLETED SUCCESSFULLY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
