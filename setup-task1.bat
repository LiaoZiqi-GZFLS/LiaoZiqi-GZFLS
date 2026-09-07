@echo off
echo === Step 7: Install dependencies and verify configuration ===

echo.
echo --- Running npm install ---
call npm install
if errorlevel 1 (
    echo [ERROR] npm install failed!
    exit /b 1
)
echo [OK] npm install completed successfully

echo.
echo --- Running npm run build ---
call npm run build
if errorlevel 1 (
    echo [ERROR] npm run build failed!
    exit /b 1
)
echo [OK] npm run build completed successfully

echo.
echo --- Verifying node_modules ---
if exist "node_modules" (
    echo [OK] node_modules directory exists
) else (
    echo [ERROR] node_modules directory not found!
    exit /b 1
)

echo.
echo --- Verifying out directory ---
if exist "out" (
    echo [OK] out directory exists
) else (
    echo [ERROR] out directory not found!
    exit /b 1
)

echo.
echo === Step 8: Commit initial configuration ===

echo.
echo --- Initializing git repository ---
if not exist ".git" (
    call git init
    if errorlevel 1 (
        echo [ERROR] git init failed!
        exit /b 1
    )
    echo [OK] git init completed
) else (
    echo [OK] git already initialized
)

echo.
echo --- Adding all files ---
call git add .
echo [OK] git add completed

echo.
echo --- Creating commit ---
call git commit -m "feat: initialize Next.js project with Tailwind CSS"
if errorlevel 1 (
    echo [ERROR] git commit failed!
    exit /b 1
)
echo [OK] git commit completed

echo.
echo === Verification ===
if exist "node_modules" (echo [OK] node_modules exists) else (echo [FAIL] node_modules missing)
if exist "out" (echo [OK] out exists) else (echo [FAIL] out missing)
if exist ".git" (echo [OK] .git exists) else (echo [FAIL] .git missing)

echo.
echo --- Git log ---
call git log --oneline

echo.
echo === ALL STEPS COMPLETED SUCCESSFULLY ===
pause
