[Setup]
AppName=AmixMusic
AppVersion=1.0.0
DefaultDirName={pf}\AmixMusic
DefaultGroupName=AmixMusic
OutputDir=build
OutputBaseFilename=AmixMusic_Installer
Compression=lzma
SolidCompression=yes

[Files]
Source: "build\AmixMusic.exe"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\AmixMusic"; Filename: "{app}\AmixMusic.exe"
Name: "{commondesktop}\AmixMusic"; Filename: "{app}\AmixMusic.exe"

[Run]
Filename: "{app}\AmixMusic.exe"; Description: "{cm:LaunchProgram,AmixMusic}"; Flags: nowait postinstall skipifsilent
