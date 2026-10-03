@echo off
title CinemaWala - Cinema ka asli adda
echo ===================================================
echo Starting CinemaWala Web App...
echo ===================================================
cd /d "%~dp0"
echo Opening browser at http://localhost:5173/
start "" "http://localhost:5173/"
npm run dev
pause
