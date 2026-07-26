# HTTP Debugger Pro Keygen — Electron GUI
## How to use
- click on **Write to registry & generate key**
- is will auto activate it

##
##
A beautiful, animated Electron application with Three.js 3D background and Tailwind CSS.

## Features
- 🔑 Full keygen algorithm ported from the decompiled C + Python source
- 🌌 Three.js animated 3D particle/wireframe background (torus, icosahedron, grid)
- 💎 Glassmorphism UI with neon glow effects
- 🖥️ **Windows**: reads real volume serial + AppVer from registry automatically
- 🐧 **Linux/macOS**: simulates serial from machine fingerprint; manual version override
- ✏️ Version override input — enter the parsed version manually if app isn't installed
- 📋 Copy individual name/value, or full `.reg`-format registry entry
- 💾 Write to registry button (Windows only, uses `reg add`)
- 🕐 Generation history (last 25 keys)
- 🖱️ Frameless window with custom titlebar

## How to Run

```bash
npm install   # downloads Electron (~100 MB, one-time)
npm start     # launches the app
```

## How It Works

### Key Value — `XXXX·XX·7C·XX·XX·XX·XX`
Ported from `KeyGenerator.cs` / `sub_4011C1`:
```
v1 = rand() % 255
v2 = rand() % 255
v3 = rand()
format: %02X %02X %02X 7C %02X %02X %02X %02X
        v1, v2^0x7C, ~v1, v2, v3%255, (v3%255)^7, v1^~(v3%255)
```

### Key Name — `SN{number}`
Ported from `NameGenerator.cs` / `sub_40123E`:
```
SN{parsedVer ^ ((~VolumeSerial >> 1) + 736) ^ 0x590D4}
```

### Version Parsing — `parse_version_string`
Reads `AppVer` from `HKCU\Software\MadeForNet\HTTPDebuggerPro`.
Walks the version string backwards, collects non-dot chars until a space — this is the `dword_40347E` value from the original C source.

## Notes
- On Windows with HTTP Debugger installed, all values are computed exactly as the original keygen
- On other platforms, volume serial is simulated and version defaults to `1`
- Use the Version Override field to test with specific version values
