@echo off
echo GitHub Pages Deployment Helper
echo ===============================
echo.

echo Please follow these steps:
echo.
echo 1. Create a new repository on GitHub
echo 2. Copy the repository URL (e.g., https://github.com/USERNAME/REPO_NAME.git)
echo 3. Update vite.config.js base path to '/REPO_NAME/'
echo.

set /p repo_url="Enter your GitHub repository URL: "
set /p repo_name="Enter your repository name: "

echo.
echo Adding remote origin...
git remote add origin %repo_url%

echo.
echo Updating vite.config.js...
powershell -Command "(Get-Content vite.config.js) -replace 'base: ''\./''', 'base: ''/%repo_name%/''' | Set-Content vite.config.js"

echo.
echo Building project...
npm run build

echo.
echo Pushing to GitHub...
git add .
git commit -m "Update base path for GitHub Pages"
git push -u origin master

echo.
echo ===============================
echo Deployment complete!
echo.
echo Your site will be available at:
echo https://YOUR_USERNAME.github.io/%repo_name%/
echo.
echo Don't forget to enable GitHub Pages in your repository settings!
echo Go to Settings > Pages > Source: Deploy from a branch > gh-pages
echo.
pause
