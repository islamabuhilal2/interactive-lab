@echo off
cd /d "%~dp0"
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  start "" "http://localhost:8000"
  python -m http.server 8000
) else (
  where py >nul 2>nul
  if %ERRORLEVEL% EQU 0 (
    start "" "http://localhost:8000"
    py -3 -m http.server 8000
  ) else (
    echo Python 3 is needed to start the local server.
    echo See README.md for hosting instructions.
    pause
  )
)
