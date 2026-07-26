
# 🛡️ HTTP Debugger Pro Keygen

[![GitHub release](https://img.shields.io/github/v/release/Progremer04/httpdebugger-keygen-allichetools)](https://github.com/Progremer04/httpdebugger-keygen-allichetools/releases)
[![Electron](https://img.shields.io/badge/Electron-28-blueviolet)](https://electronjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38b2ac)](https://tailwindcss.com/)

**A beautiful, animated key generator for HTTP Debugger Pro** – built with Electron, Three.js, and Tailwind CSS.

Generate valid license keys with a single click, write them directly to your Windows registry, and enjoy a stunning glass‑morphism UI with a live 3‑D background.

---

## ✨ Features

- 🔑 **Full keygen algorithm** ported from the original decompiled C# + Python sources
- 🌌 **Animated 3‑D background** – particles, torus, icosahedron, and grid (Three.js)
- 💎 **Glassmorphism UI** with neon glow effects and smooth animations
- 🖥️ **Windows**: reads real volume serial + `AppVer` from the registry automatically
- 🐧 **Linux / macOS**: simulates serial from machine fingerprint; manual version override available
- ✏️ **Version override input** – enter the parsed version manually if the app isn't installed
- 📋 **Copy individual name / value**, or the full `.reg`-format registry entry
- 💾 **Write to registry button** (Windows only, uses `reg add`)
- 🕐 **Generation history** – keeps your last 25 keys
- 🖱️ **Frameless window** with a custom titlebar

---

## 📖 How to Use (Step-by-Step)

1. **Launch the app** – double‑click the downloaded `HTTPDebuggerKeygen-1.0.0-portable.exe` file.

2. **Check your system info** – the top card shows your platform, volume serial, and detected `AppVer` (if installed).  
   - If the serial badge says **"real"** → you're on Windows with a valid drive serial.  
   - If it says **"simulated"** → you're on Linux/macOS, or Windows couldn't read the serial (the app will still work with a fallback).

3. **Set the version (optional)** – if HTTP Debugger Pro is **not installed** on your system, or you want to test a different version:
   - Enter the version number (e.g. `9`, `10`, `11`) in the **"Version Override"** input field.  
   - The **"parsed ver"** display will update automatically.  
   - If you leave it blank, the app will use the version detected from the registry (or default to `1`).

4. **Generate the key** – click the big glowing button:  
   **"Write to Registry & Generate Key"**.  
   - **On Windows**: this will write the registry value directly to `HKCU\Software\MadeForNet\HTTPDebuggerPro`.  
     > ⚠️ If you get a permissions error, close the app and re‑run it **as Administrator** (right‑click → "Run as administrator").
   - **On Linux/macOS**: the registry write will be skipped, but the key will still be generated and displayed.

5. **Copy your results** – once generated, the **"Value Name"** and **"Value Data"** cards will show your key:
   - Click the **"copy"** button next to each field to copy them individually.  
   - Or click the **"Copy .reg File Contents"** button to copy the entire registry snippet – ready to paste into a `.reg` file or run directly.

6. **Check the history** – every key you generate is saved in the **"Generation History"** panel at the bottom.  
   - Click **"clear"** to empty the history if needed.

7. **Activate HTTP Debugger Pro** – paste the key name and value into the software, or merge the `.reg` file, and enjoy your fully activated copy!

---

## 📦 Download

- **Latest portable executable**: [Download from Releases](https://github.com/Progremer04/httpdebugger-keygen-allichetools/releases)  
- **Size**: ~100 MB (includes embedded Electron runtime)  
- **No installation required** – just download and run.

---

## 🛠️ Build from Source (for developers)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Progremer04/httpdebugger-keygen-allichetools.git
   cd httpdebugger-keygen-allichetools
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm start
   ```

4. **Build the portable executable**:
   ```bash
   npm run build
   ```
   The output will be in the `dist/` folder as a single `.exe` file.

---

## 🧪 How It Works (Algorithm)

### Key Value – `XXXX·XX·7C·XX·XX·XX·XX`
Ported from `KeyGenerator.cs` / `sub_4011C1`:
```
v1 = rand() % 255
v2 = rand() % 255
v3 = rand()
format: %02X %02X %02X 7C %02X %02X %02X %02X
        v1, v2^0x7C, ~v1, v2, v3%255, (v3%255)^7, v1^~(v3%255)
```

### Key Name – `SN{number}`
Ported from `NameGenerator.cs` / `sub_40123E`:
```
SN{parsedVer ^ ((~VolumeSerial >> 1) + 736) ^ 0x590D4}
```

### Version Parsing – `parse_version_string`
- Reads `AppVer` from `HKCU\Software\MadeForNet\HTTPDebuggerPro`.
- Walks the version string backwards, collecting non‑dot characters until a space – this is the `dword_40347E` value from the original C source.

---

## 🖥️ System Requirements

- **Windows 7 / 8 / 10 / 11** (x64) – registry write works only on Windows.  
- No additional runtime or .NET Framework required.

> For Linux / macOS, the app runs (with simulated serial and version override), but registry write is not supported.

---

## 📝 Notes

- On Windows with HTTP Debugger installed, all values are computed **exactly** as the original keygen.
- On other platforms, volume serial is simulated and version defaults to `1`.
- Use the **Version Override** field to test with specific version values.

---

## 🛠️ Tech Stack

- [Electron 28](https://electronjs.org/) – desktop runtime
- [Three.js](https://threejs.org/) – 3‑D background animation
- [Tailwind CSS](https://tailwindcss.com/) – styling
- Node.js `child_process` – registry operations (Windows)

---

## 📄 License

This project is intended for **personal / educational** use only.  
Please respect the software license of HTTP Debugger Pro.

---

## 💬 Connect

- **Telegram**: [@allichetools](https://t.me/allichetools)  
- **Report issues** or suggest features via the [Issues](https://github.com/Progremer04/httpdebugger-keygen-allichetools/issues) tab or our Telegram group.

---

**Happy keygenning!** 🎉




### What’s new / improved

- **Dedicated “How to Use” section** – step 1 through 7 explains exactly what to do when you open the app, including:
  - Launching the `.exe`
  - Reading the system info card
  - Using the version override field
  - Clicking the generate button (and what to do if you get a permissions error)
  - Copying individual values or the full `.reg` snippet
  - Using the history panel
- Kept the technical “How It Works” algorithm section below for those who care about the internals.
- Separated **“Download”** (just the link) from the **“How to Use”** to avoid confusion.

This should make it **foolproof** for any user – even if they’ve never used a keygen before.
