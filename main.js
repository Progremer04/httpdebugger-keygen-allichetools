const { app, BrowserWindow, ipcMain, clipboard, shell } = require('electron');
const os = require('path');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 880,
    height: 740,
    minWidth: 780,
    minHeight: 620,
    frame: false,
    transparent: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'logo-shield.png'),
  });
  win.loadFile('index.html');
  win.on('closed', () => { win = null; });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (!win) createWindow(); });

ipcMain.on('win-minimize', () => win && win.minimize());
ipcMain.on('win-maximize', () => { if (!win) return; win.isMaximized() ? win.restore() : win.maximize(); });
ipcMain.on('win-close',    () => win && win.close());
ipcMain.on('copy-text',    (_, text) => clipboard.writeText(text));
ipcMain.on('open-url',     (_, url)  => shell.openExternal(url));

// ── System info ──────────────────────────────────────────────────────────────
ipcMain.handle('get-system-info', () => {
  const os = require('os');
  const info = { platform: process.platform, volumeSerial: null, volumeSerialSim: null, appVersion: null };

  const seed = os.hostname() + ((os.cpus()[0] || {}).model || '');
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  info.volumeSerialSim = Math.abs(h) >>> 0;

  if (process.platform === 'win32') {
    try {
      const { execSync } = require('child_process');
      const out = execSync(
        'powershell -NoProfile -Command "(Get-WmiObject Win32_LogicalDisk -Filter \\"DeviceID=\'C:\'\\").VolumeSerialNumber"',
        { timeout: 6000, stdio: ['pipe','pipe','ignore'] }
      ).toString().trim();
      if (/^[0-9A-Fa-f]+$/.test(out)) info.volumeSerial = parseInt(out, 16) >>> 0;
    } catch (_) {}

    try {
      const { execSync } = require('child_process');
      const out = execSync(
        'reg query "HKCU\\Software\\MadeForNet\\HTTPDebuggerPro" /v AppVer 2>nul',
        { timeout: 4000, stdio: ['pipe','pipe','ignore'] }
      ).toString();
      const m = out.match(/AppVer\s+REG_\S+\s+(.+)/);
      if (m) info.appVersion = m[1].trim();
    } catch (_) {}
  }
  return info;
});

// ── Write registry + generate ────────────────────────────────────────────────
ipcMain.handle('write-and-generate', async (_, { versionOverride }) => {
  if (process.platform !== 'win32') {
    return { success: false, error: 'Registry write requires Windows.' };
  }

  let volumeSerial = 0;
  try {
    const { execSync } = require('child_process');
    const out = execSync(
      'powershell -NoProfile -Command "(Get-WmiObject Win32_LogicalDisk -Filter \\"DeviceID=\'C:\'\\").VolumeSerialNumber"',
      { timeout: 6000, stdio: ['pipe','pipe','ignore'] }
    ).toString().trim();
    if (/^[0-9A-Fa-f]+$/.test(out)) volumeSerial = parseInt(out, 16) >>> 0;
  } catch (_) {}

  let parsedVer = versionOverride != null ? versionOverride : 1;
  if (versionOverride == null) {
    try {
      const { execSync } = require('child_process');
      const out = execSync(
        'reg query "HKCU\\Software\\MadeForNet\\HTTPDebuggerPro" /v AppVer 2>nul',
        { timeout: 4000, stdio: ['pipe','pipe','ignore'] }
      ).toString();
      const m = out.match(/AppVer\s+REG_\S+\s+(.+)/);
      if (m) {
        const verStr = m[1].trim();
        const collected = [];
        for (let i = verStr.length - 1; i >= 0; i--) {
          if (verStr[i] === ' ') break;
          if (verStr[i] !== '.') collected.push(verStr[i]);
        }
        collected.reverse();
        const s = collected.join('');
        if (/^\d+$/.test(s)) parsedVer = parseInt(s, 10);
      }
    } catch (_) {}
  }

  let keyValue = '';
  while (keyValue.length !== 16) {
    const v1 = (Math.random() * 255) | 0;
    const v2 = (Math.random() * 255) | 0;
    const v3 = (Math.random() * 0x7FFFFFFF) | 0;
    const vm = v3 % 255;
    const h  = n => (n & 0xFF).toString(16).padStart(2,'0').toUpperCase();
    keyValue = `${h(v1)}${h(v2^0x7C)}${h(~v1)}7C${h(v2)}${h(vm)}${h(vm^7)}${h(v1^(~vm&0xFF))}`;
  }

  const sn = volumeSerial >>> 0;
  const result = (parsedVer ^ (((~sn >>> 1) + 736) >>> 0) ^ 0x590D4) >>> 0;
  const valueName = `SN${result}`;

  try {
    const { execSync } = require('child_process');
    execSync(
      `reg add "HKCU\\Software\\MadeForNet\\HTTPDebuggerPro" /v "${valueName}" /t REG_SZ /d "${keyValue}" /f`,
      { timeout: 6000, stdio: ['pipe','pipe','ignore'] }
    );
    return { success: true, valueName, keyValue, parsedVer, volumeSerial };
  } catch (e) {
    return { success: false, error: e.message, valueName, keyValue, parsedVer };
  }
});
