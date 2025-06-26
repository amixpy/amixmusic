import os
import subprocess
import shutil

def create_installer():
    # Create build directory if it doesn't exist
    if not os.path.exists('build'):
        os.makedirs('build')
    
    # Install dependencies
    subprocess.run(['pip', 'install', '-r', 'requirements_installer.txt'], check=True)
    
    # Create executable using PyInstaller
    subprocess.run([
        'pyinstaller',
        '--onefile',
        '--windowed',
        '--name', 'AmixMusic',
        '--icon', 'icon.ico',  # You'll need to create an icon file
        'desktop_app.py'
    ], check=True)
    
    # Copy the executable to build directory
    if os.path.exists('dist/AmixMusic.exe'):
        shutil.copy2('dist/AmixMusic.exe', 'build/AmixMusic.exe')
        print("Successfully created Windows executable!")
    else:
        print("Failed to create Windows executable")

if __name__ == '__main__':
    create_installer()
