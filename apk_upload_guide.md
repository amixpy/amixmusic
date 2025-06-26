# APKPure Upload Guide

## Requirements
1. APK file (build using Buildozer)
2. App icon (PNG format, recommended size: 512x512)
3. App screenshots (PNG format, recommended size: 1920x1080)
4. App description
5. App permissions

## Step-by-Step Guide

1. **Build Your APK**
   ```bash
   buildozer android debug
   ```
   The APK will be generated in the `bin` directory.

2. **Prepare Your App Information**
   - App Name: AmixMusic
   - Package Name: com.amixmusic
   - Version: 1.0.0
   - Description: A lightweight, customizable music player with playlist support and offline capabilities.
   - Category: Music & Audio
   - Permissions:
     - READ_EXTERNAL_STORAGE
     - WRITE_EXTERNAL_STORAGE
     - INTERNET

3. **Create Screenshots**
   Take screenshots of your app showing:
   - Main player interface
   - Playlist view
   - Settings screen
   - Any unique features

4. **Upload to APKPure**
   1. Go to [APKPure Developer Portal](https://www.apkpure.com/developer)
   2. Click "Register" to create an account
   3. After registration, click "Upload APK"
   4. Fill out the required information:
      - App Name: AmixMusic
      - Package Name: com.amixmusic
      - Version Code: 1
      - Version Name: 1.0.0
      - Minimum SDK: 21 (Android 5.0)
      - Target SDK: 33 (Android 13)
   5. Upload your APK file
   6. Upload app icon and screenshots
   7. Write a detailed description
   8. Submit for review

## App Description Template

```
AmixMusic - Your Lightweight Music Player

Features:
• Lightweight and fast performance
• Customizable playlists
• Offline music playback
• Support for MP3 files
• Modern and intuitive interface
• Song recognition from device storage
• Cover art support
• Multiple playback controls

Requirements:
• Android 5.0 and up
• Minimum 20MB storage space

Permissions:
• Storage access for music files
• Internet access for updates
```

## Tips for Successful Upload
1. Make sure your APK is properly signed
2. Include high-quality screenshots
3. Write a clear and detailed description
4. Follow APKPure's content guidelines
5. Provide accurate app permissions
6. Include a changelog for updates
7. Test your APK thoroughly before upload

## After Upload
1. Wait for APKPure review (usually takes 1-2 business days)
2. Monitor download statistics
3. Respond to user feedback
4. Prepare for updates
5. Keep your app up-to-date with new features

## Important Notes
- APKPure is free for developers
- They offer both free and paid hosting options
- Free hosting is sufficient for most apps
- They have strict content guidelines - make sure to follow them
- Keep your app updated regularly
- Respond to user feedback promptly
