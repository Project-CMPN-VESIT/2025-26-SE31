@echo off
git init
git remote remove origin 2>nul
git remote add origin https://github.com/shubhada-desh07/All_Is_Well.git
git rm -r --cached . 2>nul
git add .
git commit -m "Initial commit - excluding environment files"
git branch -M main
echo Git setup complete. You can now run 'git push -u origin main'
