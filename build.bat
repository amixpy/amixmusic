@echo off
echo Building AmixMusic...

:: Install dependencies
echo Installing dependencies...
pip install -r requirements_installer.txt

:: Create build directory
if not exist build mkdir build

:: Build the executable
echo Building executable...
pyinstaller --onefile --windowed --name "AmixMusic" desktop_app.py

:: Copy executable to build directory
if exist dist\AmixMusic.exe (
    copy dist\AmixMusic.exe build\
    echo Build completed successfully!
) else (
    echo Failed to build executable
    exit /b 1
)

:: Create installer
echo Creating installer...
"C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer.iss

:: Clean up
echo Cleaning up...
del /q /s /f build\*.spec
del /q /s /f build\*.log
rmdir /s /q build\__pycache__
rmdir /s /q build\dist
rmdir /s /q build\build

pause
