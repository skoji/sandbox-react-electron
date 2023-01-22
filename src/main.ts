import path from 'node:path';
import { BrowserWindow, app } from 'electron';

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('dist/index.html');
});

app.once('window-all-closed', () => app.quit());
