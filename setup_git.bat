@echo off
git init
git remote remove origin 2>nul
git remote add origin https://github.com/Project-CMPN-VESIT/2025-26-SE31.git
git rm -r --cached . 2>nul
git add .
git commit -m "Final Commit of project"
git branch -M main
echo Git setup complete. You can now run 'git push -u origin main'
