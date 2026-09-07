@echo off
echo === Checking project status ===

if exist "node_modules" (
    echo [OK] node_modules directory exists
) else (
    echo [MISSING] node_modules directory not found
)

if exist "out" (
    echo [OK] out directory exists
) else (
    echo [MISSING] out directory not found
)

if exist ".git" (
    echo [OK] .git directory exists
) else (
    echo [MISSING] .git directory not found
)

echo === npm install ===
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed
    exit /b 1
)
echo [OK] npm install completed

echo === npm run build ===
call npm run build
if errorlevel 1 (
    echo [ERROR] npm run build failed
    exit /b 1
)
echo [OK] npm run build completed

echo === git init ===
if not exist ".git" (
    call git init
    echo [OK] git init completed
) else (
    echo [OK] git already initialized
)

echo === git add ===
call git add .
echo [OK] git add completed

echo === git commit ===
call git commit -m "feat: initialize Next.js project with Tailwind CSS"
echo [OK] git commit completed

echo === Final verification ===
if exist "node_modules" (echo [OK] node_modules exists) else (echo [MISSING] node_modules)
if exist "out" (echo [OK] out exists) else (echo [MISSING] out)
if exist ".git" (echo [OK] .git exists) else (echo [MISSING] .git)

echo === ALL DONE ===
